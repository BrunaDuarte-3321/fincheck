import { Injectable } from '@nestjs/common';
import { CreateBankAccountDto } from '../dto/create-bank-account.dto';
import { UpdateBankAccountDto } from '../dto/update-bank-account.dto';
import { BankAccountsRepositories } from 'src/shared/database/repositories/bank-account.repositories';
import { ValidateBankAccountOwnershipService } from './validate-bank-account-owenership.service';

@Injectable()
export class BankAccountsService {
  constructor(
    private readonly bankAccountsRepo: BankAccountsRepositories,
    private readonly validateBankAccountOwnership: ValidateBankAccountOwnershipService,
  ) {}
  async create(userId: string, createBankAccountDto: CreateBankAccountDto) {
    const { color, initialBalance, name, type } = createBankAccountDto;
    const bankAccount = await this.bankAccountsRepo.create({
      data: {
        userId,
        name,
        initialBalance,
        color,
        type,
      },
    });
    return { bankAccount };
  }

  async findAllByUserId(userId: string) {
    const bankAccounts = await this.bankAccountsRepo.findMany({
      where: {
        userId,
      },
      include: {
        transactions: {
          select: {
            value: true,
            type: true,
          },
        },
      },
    });

    return bankAccounts.map(({ transactions, ...bankAccount }) => {
      const totalTransactions = transactions.reduce(
        (acc, transaction) =>
          acc +
          (transaction.type === 'INCOME'
            ? transaction.value
            : -transaction.value),
        0,
      );

      const currentBalance = bankAccount.initialBalance + totalTransactions;

      return {
        ...bankAccount,
        currentBalance,
        transactions,
      };
    });
  }

  async update(
    userId: string,
    bankAccountId: string,
    updateBankAccountDto: UpdateBankAccountDto,
  ) {
    const { color, initialBalance, name, type } = updateBankAccountDto;
    await this.validateBankAccountOwnership.validate(userId, bankAccountId);
    return await this.bankAccountsRepo.update({
      where: {
        id: bankAccountId,
      },
      data: {
        color,
        initialBalance,
        name,
        type,
      },
    });
  }

  async remove(userId: string, bankAccountId: string) {
    await this.validateBankAccountOwnership.validate(userId, bankAccountId);
    await this.bankAccountsRepo.delete({
      where: {
        id: bankAccountId,
      },
    });
    return null;
  }
}
