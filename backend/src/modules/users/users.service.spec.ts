import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from 'src/modules/users/users.service';
import { UsersRepositories } from 'src/shared/database/repositories/users.repositories';

describe('UsersService', () => {
  let usersService: UsersService;
  let usersRepository: Partial<UsersRepositories>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: UsersRepositories,
          useValue: {
            findUnique: jest.fn(),
          },
        },
      ],
    }).compile();

    usersService = module.get<UsersService>(UsersService);
    usersRepository = module.get<Partial<UsersRepositories>>(UsersRepositories);
  });

  describe('getUserById', () => {
    it('should return user data when a valid userId is provided', async () => {
      const userId = '1';

      // Mock para o método findUnique do repositório
      jest.spyOn(usersRepository, 'findUnique').mockResolvedValue({
        id: '1',
        name: 'John Doe',
        email: 'john@example.com',
      });

      // Chama o método getUserById do serviço
      const user = await usersService.getUserById(userId);

      // Verifica se o usuário retornado é o esperado
      expect(user).toEqual({
        id: '1',
        name: 'John Doe',
        email: 'john@example.com',
      });

      // Verifica se o método findUnique foi chamado com o ID correto
      expect(usersRepository.findUnique).toHaveBeenCalledWith({
        where: { id: userId },
        select: { name: true, email: true },
      });
    });

    it('should throw an error if user is not found', async () => {
      const userId = '2';

      // Mock para o método findUnique retornar null (usuário não encontrado)
      jest.spyOn(usersRepository, 'findUnique').mockResolvedValue(null);

      // Verifica se o método lança um erro quando o usuário não for encontrado
      try {
        await usersService.getUserById(userId);
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
        expect(error.message).toBe('User not found');
      }
    });
  });
});
