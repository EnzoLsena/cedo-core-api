import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Recipe } from './entities/recipe.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { Product } from 'src/features/product/entities/product.entity';

@Injectable()
export class RecipeService {
  constructor(
    @InjectRepository(Recipe)
    private readonly repository: Repository<Recipe>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async create(data: CreateRecipeDto, userId: number) {
    const product = await this.productRepository.findOne({
      where: { id: data.productId, user: { id: userId } },
    });

    if (!product) throw new NotFoundException('Product not found');

    const totalItemsCost = data.items.reduce(
      (sum, item) => sum + item.quantity * item.unitCost,
      0,
    );

    const totalCost = totalItemsCost + data.laborCost;

    const recipe = this.repository.create({
      laborCost: data.laborCost,
      totalCost,
      product,
      user: { id: userId },
      items: data.items,
    });

    return this.repository.save(recipe);
  }

  async recalculate(recipeId: number, userId: number) {
    const recipe = await this.repository.findOne({
      where: { id: recipeId, user: { id: userId } },
      relations: ['items'],
    });

    if (!recipe) throw new NotFoundException();

    const totalItemsCost = recipe.items.reduce(
      (sum, item) => sum + item.quantity * item.unitCost,
      0,
    );

    recipe.totalCost = totalItemsCost + recipe.laborCost;

    return this.repository.save(recipe);
  }
}
