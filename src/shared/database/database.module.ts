import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { UsersRepositories } from './repositories/users.repositories';
import { CategoriesRepositories } from './repositories/categories.repositories';
import { BankAccountsRepositories } from './repositories/bank-account.repositories';

@Global()
@Module({
  providers: [
    PrismaService,
    UsersRepositories,
    CategoriesRepositories,
    BankAccountsRepositories,
  ],
  exports: [
    UsersRepositories,
    CategoriesRepositories,
    BankAccountsRepositories,
  ],
})
export class DatabaseModule {}
