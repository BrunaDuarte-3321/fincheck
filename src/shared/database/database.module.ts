import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { UsersRepositories } from './repositories/users.repositories';
import { CategoriesRepositories } from './repositories/categories.repositories';
import { BankAccountsRepositories } from './repositories/bank-account.repositories';
import { TransactionsRepositories } from './repositories/transactions.repositories';

@Global()
@Module({
  providers: [
    PrismaService,
    UsersRepositories,
    CategoriesRepositories,
    BankAccountsRepositories,
    TransactionsRepositories,
  ],
  exports: [
    UsersRepositories,
    CategoriesRepositories,
    BankAccountsRepositories,
    TransactionsRepositories,
  ],
})
export class DatabaseModule {}
