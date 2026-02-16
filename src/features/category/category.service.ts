import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Category } from './entities/category.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly repository: Repository<Category>,
  ) {}

  async create(data: CreateCategoryDto) {
    const category = this.repository.create(data);
    return this.repository.save(category);
  }

  async findAll() {
    return this.repository.find();
  }

  async findOne(id: number) {
    const category = await this.repository.findOne({ where: { id } });
    if (!category) throw new NotFoundException();
    return category;
  }
}
