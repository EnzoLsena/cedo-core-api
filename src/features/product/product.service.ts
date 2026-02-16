import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { Category } from 'src/features/category/entities/category.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly repository: Repository<Product>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async create(data: CreateProductDto) {
    const category = await this.categoryRepository.findOne({
      where: { id: data.categoryId },
    });

    if (!category) throw new NotFoundException('Category not found');

    const product = this.repository.create({
      name: data.name,
      salePrice: data.salePrice,
      category,
      isActive: data.isActive ?? true,
    });

    return this.repository.save(product);
  }

  async findAll() {
    return this.repository.find({ relations: ['category'] });
  }
}
