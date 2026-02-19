import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { Category } from 'src/features/category/entities/category.entity';
import { PageParams } from 'src/common/pagination/page-params';
import { PageList } from 'src/common/pagination/page-list';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly repository: Repository<Product>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async create(data: CreateProductDto, userId: number) {
    const category = await this.categoryRepository.findOne({
      where: { user: { id: userId } },
    });

    if (!category) throw new NotFoundException('Categoria não encontrada.');
    try {
      const product = this.repository.create({
        name: data.name,
        salePrice: data.salePrice,
        category,
        user: { id: userId },
        isActive: data.isActive ?? true,
      });

      return this.repository.save(product);
    } catch (error) {
      Logger.error('Erro ao criar produto', error.stack);
      throw error;
    }
  }

  async findAll(
    pageParams: PageParams,
    userId: number,
  ): Promise<PageList<Product>> {
    const { pageSize, pageNumber } = new PageParams(pageParams);
    try {
      const [items, count] = await this.repository.findAndCount({
        relations: ['category'],
        where: { user: { id: userId } },
        skip: (pageNumber - 1) * pageSize,
        take: pageSize,
      });

      return new PageList<Product>(items, count, pageSize, pageNumber);
    } catch (error) {
      Logger.error('Erro ao buscar produtos', error.stack);
      throw error;
    }
  }
}
