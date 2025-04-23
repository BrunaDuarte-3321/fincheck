import { Injectable, NotFoundException } from '@nestjs/common';
import { CategoriesRepositories } from 'src/shared/database/repositories/categories.repositories';

@Injectable()
export class ValidateCategoryOwnershipService {
  constructor(private readonly categoriesRepo: CategoriesRepositories) {}
  async validate(userId: string, categoryId: string) {
    const isOwner = await this.categoriesRepo.findFirst({
      where: {
        id: categoryId,
        userId,
      },
    });

    if (!isOwner) {
      throw new NotFoundException('Category not found');
    }
  }
}
