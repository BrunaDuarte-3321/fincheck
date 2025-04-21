import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Prisma } from 'generated/prisma';

@Injectable()
export class CategoriesRepositories {
  constructor(private readonly prismaService: PrismaService) {}

  findMany(findManyDto: Prisma.CategoryFindManyArgs) {
    return this.prismaService.category.findMany(findManyDto);
  }
}
