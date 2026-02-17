import { Module } from '@nestjs/common';
import { RecipeService } from './recipe.service';
import { RecipeController } from './recipe.controller';
import { RecipeItem } from './entities/recipe-items.entity';
import { Recipe } from './entities/recipe.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from '../product/entities/product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RecipeItem, Recipe, Product])],
  controllers: [RecipeController],
  providers: [RecipeService],
})
export class RecipeModule {}
