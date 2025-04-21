import { Injectable, NotFoundException } from '@nestjs/common';

import { TransactionsRepositories } from 'src/shared/database/repositories/transactions.repositories';

@Injectable()
export class ValidateTransactionOwnershipService {
  constructor(private readonly transactionsRepo: TransactionsRepositories) {}
  async validate(userId: string, transactionId: string) {
    const isOwner = await this.transactionsRepo.findFirst({
      where: {
        id: transactionId,
        userId,
      },
    });
    if (!isOwner) {
      throw new NotFoundException('Transaction not found');
    }
  }
}
