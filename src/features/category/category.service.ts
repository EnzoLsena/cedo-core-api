import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Category } from './entities/category.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { PageList } from 'src/common/pagination/page-list';
import { PageParams } from 'src/common/pagination/page-params';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly repository: Repository<Category>,
  ) {}

  async create(data: CreateCategoryDto, userId: number) {
    try {
      const category = this.repository.create({
        ...data,
        user: { id: userId },
      });

      return this.repository.save(category);
    } catch (error) {
      Logger.error('Erro ao criar categoria', error.stack);
      throw error;
    }
  }

  async findAll(pageParams: PageParams, userId: number): Promise<PageList<Category>> {
    const { pageSize, pageNumber } = new PageParams(pageParams);
    try {
      const [items, count] = await this.repository.findAndCount({
        relations: ['products'],
        where: { user: { id: userId } },
        skip: (pageNumber - 1) * pageSize,
        take: pageSize,
      });

      return new PageList<Category>(items, count, pageSize, pageNumber);
    } catch (error) {
      Logger.error('Erro ao buscar categorias', error.stack);
      throw error;
    }
  }

  async findOne(id: number, userId: number) {
    const category = await this.repository.findOne({ where: { id, user: { id: userId } } });
    if (!category) throw new NotFoundException();
    return category;
  }
}
