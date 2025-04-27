import { TransactionsRepositories } from 'src/shared/database/repositories/transactions.repositories';
import { ValidateTransactionOwnershipService } from './validate-transaction-ownership.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('ValidateTransactionOwnershipService', () => {
  let transactionsService: ValidateTransactionOwnershipService;
  let transactionsRepo: Partial<TransactionsRepositories>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ValidateTransactionOwnershipService,
        {
          provide: TransactionsRepositories,
          useValue: {
            findFirst: jest.fn(),
          },
        },
      ],
    }).compile();

    transactionsService = module.get<ValidateTransactionOwnershipService>(
      ValidateTransactionOwnershipService,
    );
    transactionsRepo = module.get<Partial<TransactionsRepositories>>(
      TransactionsRepositories,
    );
  });

  describe('validate', () => {
    it('should validate the ownership of a transaction', async () => {
      const userId = 'user-id';
      const transactionId = 'transaction-id';

      jest.spyOn(transactionsRepo, 'findFirst').mockResolvedValue({
        id: transactionId,
        userId,
      });

      await transactionsService.validate(userId, transactionId);

      expect(transactionsRepo.findFirst).toHaveBeenCalledWith({
        where: { id: transactionId, userId },
      });
    });
  });
});
