import { Test, TestingModule } from '@nestjs/testing';
import { TransactionsRepositories } from 'src/shared/database/repositories/transactions.repositories';
import { ValidateBankAccountOwnershipService } from 'src/modules/bank-accounts/services/validate-bank-account-owenership.service';
import { ValidateCategoryOwnershipService } from 'src/modules/categories/services/validate-category-owenership.service';
import { ValidateTransactionOwnershipService } from 'src/modules/transactions/services/validate-transaction-ownership.service';
import { CreateTransactionDto } from 'src/modules/transactions/dto/create-transaction.dto';
import { UpdateTransactionDto } from 'src/modules/transactions/dto/update-transaction.dto';
import { TransactionsService } from './transactions.service';
import { TransactionType } from '../entities/Transaction';

describe('TransactionsService', () => {
  let transactionsService: TransactionsService;
  let transactionsRepo: Partial<TransactionsRepositories>;
  let validateBankAccountOwnership: Partial<ValidateBankAccountOwnershipService>;
  let validateCategoryOwnershipService: Partial<ValidateCategoryOwnershipService>;
  let validateTransactionOwnershipService: Partial<ValidateTransactionOwnershipService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TransactionsService,
        {
          provide: TransactionsRepositories,
          useValue: {
            create: jest.fn(),
            findMany: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
          },
        },
        {
          provide: ValidateBankAccountOwnershipService,
          useValue: { validate: jest.fn() },
        },
        {
          provide: ValidateCategoryOwnershipService,
          useValue: { validate: jest.fn() },
        },
        {
          provide: ValidateTransactionOwnershipService,
          useValue: { validate: jest.fn() },
        },
      ],
    }).compile();

    transactionsService = module.get<TransactionsService>(TransactionsService);
    transactionsRepo = module.get<Partial<TransactionsRepositories>>(
      TransactionsRepositories,
    );
    validateBankAccountOwnership = module.get<
      Partial<ValidateBankAccountOwnershipService>
    >(ValidateBankAccountOwnershipService);
    validateCategoryOwnershipService = module.get<
      Partial<ValidateCategoryOwnershipService>
    >(ValidateCategoryOwnershipService);
    validateTransactionOwnershipService = module.get<
      Partial<ValidateTransactionOwnershipService>
    >(ValidateTransactionOwnershipService);
  });

  describe('create', () => {
    it('should create a new transaction successfully', async () => {
      const userId = 'user-id';
      const createTransactionDto: CreateTransactionDto = {
        bankAccountId: 'bank-id',
        categoryId: 'category-id',
        date: new Date().toISOString(),
        name: 'Transaction Name',
        type: TransactionType.EXPENSE,
        value: 100,
      };

      jest
        .spyOn(validateBankAccountOwnership, 'validate')
        .mockResolvedValue(undefined);
      jest
        .spyOn(validateCategoryOwnershipService, 'validate')
        .mockResolvedValue(undefined);
      jest
        .spyOn(transactionsRepo, 'create')
        .mockResolvedValue(createTransactionDto);

      const transaction = await transactionsService.create(
        userId,
        createTransactionDto,
      );

      expect(transaction).toEqual(createTransactionDto);
      expect(transactionsRepo.create).toHaveBeenCalledWith({
        data: {
          userId,
          ...createTransactionDto,
        },
      });
    });

    it('should throw an error if validation fails', async () => {
      const userId = 'user-id';
      const createTransactionDto: CreateTransactionDto = {
        bankAccountId: 'bank-id',
        categoryId: 'category-id',
        date: new Date().toISOString(),
        name: 'Transaction Name',
        type: TransactionType.EXPENSE,
        value: 100,
      };

      jest
        .spyOn(validateBankAccountOwnership, 'validate')
        .mockRejectedValue(new Error('Bank account not owned by user'));

      await expect(
        transactionsService.create(userId, createTransactionDto),
      ).rejects.toThrow('Bank account not owned by user');
    });
  });

  describe('findAllByUserId', () => {
    it('should return a list of transactions for the user', async () => {
      const userId = 'user-id';
      const filters = { month: 1, year: 2023 };

      const transactions = [
        { id: '19999', name: 'Transaction 1', value: 50 },
        { id: '2', name: 'Transaction 2', value: 100 },
      ];
      jest.spyOn(transactionsRepo, 'findMany').mockResolvedValue(transactions);

      const result = await transactionsService.findAllByUserId(userId, filters);

      expect(result).toEqual(transactions);
      expect(transactionsRepo.findMany).toHaveBeenCalledWith({
        where: {
          userId,
          date: {
            gte: new Date(Date.UTC(filters.year, filters.month)),
            lt: new Date(Date.UTC(filters.year, filters.month + 1)),
          },
        },
      });
    });
  });

  describe('update', () => {
    it('should update a transaction successfully', async () => {
      const userId = 'user-id';
      const transactionId = 'transaction-id';
      const updateTransactionDto: UpdateTransactionDto = {
        bankAccountId: 'bank-id',
        categoryId: 'category-id',
        date: new Date().toISOString(),
        name: 'Updated Transaction Name',
        type: TransactionType.INCOME,
        value: 200,
      };

      jest
        .spyOn(validateBankAccountOwnership, 'validate')
        .mockResolvedValue(undefined);
      jest
        .spyOn(validateCategoryOwnershipService, 'validate')
        .mockResolvedValue(undefined);
      jest
        .spyOn(validateTransactionOwnershipService, 'validate')
        .mockResolvedValue(undefined);
      jest
        .spyOn(transactionsRepo, 'update')
        .mockResolvedValue(updateTransactionDto);

      const transaction = await transactionsService.update(
        userId,
        transactionId,
        updateTransactionDto,
      );

      expect(transaction).toEqual(updateTransactionDto);
      expect(transactionsRepo.update).toHaveBeenCalledWith({
        where: { id: transactionId },
        data: { userId, ...updateTransactionDto },
      });
    });
  });

  describe('remove', () => {
    it('should remove a transaction successfully', async () => {
      const userId = 'user-id';
      const transactionId = 'transaction-id';

      jest
        .spyOn(validateTransactionOwnershipService, 'validate')
        .mockResolvedValue(undefined);
      jest.spyOn(transactionsRepo, 'delete').mockResolvedValue(undefined);

      await transactionsService.remove(userId, transactionId);

      expect(transactionsRepo.delete).toHaveBeenCalledWith({
        where: { id: transactionId },
      });
    });
  });
});
