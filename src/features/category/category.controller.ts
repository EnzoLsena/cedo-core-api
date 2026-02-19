import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { PageParams } from 'src/common/pagination/page-params';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth-guard';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { JwtPayload } from '../auth/jwt-payload.interface';

@Controller('api/v1/categories')
@UseGuards(JwtAuthGuard)
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  create(
    @Body() createCategoryDto: CreateCategoryDto,
    @CurrentUser() user: JwtPayload,
  ) {
    return this.categoryService.create(createCategoryDto, user.id);
  }

  @Get()
  findAll(@Query() pageParams: PageParams, @CurrentUser() user: JwtPayload) {
    return this.categoryService.findAll(pageParams, user.id);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @CurrentUser() user: JwtPayload) {
    return this.categoryService.findOne(+id, user.id);
  }
}
