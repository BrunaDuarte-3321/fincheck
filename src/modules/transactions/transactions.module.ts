import { Module } from '@nestjs/common';
import { TransactionsService } from './services/transactions.service';
import { TransactionsController } from './transactions.controller';
import { ValidateCategoryOwnershipService } from '../categories/services/validate-category-owenership.service';
import { ValidateTransactionOwnershipService } from './services/validate-transaction-ownership.service';
import { ValidateBankAccountOwnershipService } from '../bank-accounts/services/validate-bank-account-owenership.service';

@Module({
  controllers: [TransactionsController],
  providers: [
    TransactionsService,
    ValidateCategoryOwnershipService,
    ValidateTransactionOwnershipService,
    ValidateBankAccountOwnershipService,
  ],
})
export class TransactionsModule {}
