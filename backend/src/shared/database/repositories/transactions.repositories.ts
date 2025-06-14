import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Prisma } from 'generated/prisma';

@Injectable()
export class TransactionsRepositories {
  constructor(private readonly prismaService: PrismaService) {}

  create(createDto: Prisma.TransactionCreateArgs) {
    return this.prismaService.transaction.create(createDto);
  }
  update(updateDto: Prisma.TransactionUpdateArgs) {
    return this.prismaService.transaction.update(updateDto);
  }
  delete(deleteDto: Prisma.TransactionDeleteArgs) {
    return this.prismaService.transaction.delete(deleteDto);
  }
  findMany(findManyDto: Prisma.TransactionFindManyArgs) {
    return this.prismaService.transaction.findMany(findManyDto);
  }
  findFirst(findFirstDto: Prisma.TransactionFindFirstArgs) {
    return this.prismaService.transaction.findFirst(findFirstDto);
  }
}
