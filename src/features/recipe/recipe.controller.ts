import { Controller, Post, Body, Param, UseGuards } from '@nestjs/common';
import { RecipeService } from './recipe.service';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth-guard';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { JwtPayload } from '../auth/jwt-payload.interface';

@Controller('api/v1/recipes')
@UseGuards(JwtAuthGuard)
export class RecipeController {
  constructor(private readonly recipeService: RecipeService) {}

  @Post()
  create(
    @Body() createRecipeDto: CreateRecipeDto,
    @CurrentUser() user: JwtPayload,
  ) {
    return this.recipeService.create(createRecipeDto, user.id);
  }

  @Post(':id/recalculate')
  recalculate(@Param('id') id: string, @CurrentUser() user: JwtPayload) {
    return this.recipeService.recalculate(+id, user.id);
  }
}
