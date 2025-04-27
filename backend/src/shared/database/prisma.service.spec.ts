import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from './prisma.service';

describe('PrismaService', () => {
  let prismaService: PrismaService;

  const connectMock = jest.fn();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: PrismaService,
          useValue: {
            $connect: connectMock,
            onModuleInit: async function () {
              await this.$connect();
            },
          },
        },
      ],
    }).compile();
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(prismaService).toBeDefined();
  });

  it('should call $connect', async () => {
    await prismaService.onModuleInit();
    expect(connectMock).toHaveBeenCalled();
  });
});
