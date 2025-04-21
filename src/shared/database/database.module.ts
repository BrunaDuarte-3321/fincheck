import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { UsersRepositories } from './repositories/users.repositories';
import { CategoriesRepositories } from './repositories/categories.repositories';

@Global()
@Module({
  providers: [PrismaService, UsersRepositories, CategoriesRepositories],
  exports: [UsersRepositories, CategoriesRepositories],
})
export class DatabaseModule {}
