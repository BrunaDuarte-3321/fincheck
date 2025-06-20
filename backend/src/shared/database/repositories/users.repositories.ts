import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Prisma } from 'generated/prisma';

@Injectable()
export class UsersRepositories {
  constructor(private readonly prismaService: PrismaService) {}
  create(createDto: Prisma.UserCreateArgs) {
    return this.prismaService.user.create(createDto);
  }

  findUnique(findUnique: Prisma.UserFindUniqueArgs) {
    return this.prismaService.user.findUnique(findUnique);
  }
}
