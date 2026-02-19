import { Controller, Get, Post, Body, Query, UseGuards } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { PageParams } from 'src/common/pagination/page-params';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth-guard';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { JwtPayload } from '../auth/jwt-payload.interface';

@Controller('api/v1/products')
@UseGuards(JwtAuthGuard)
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto, @CurrentUser() user: JwtPayload) {
    return this.productService.create(createProductDto, user.id);
  }

  @Get()
  findAll(@Query() pageParams: PageParams, @CurrentUser() user: JwtPayload) {
    return this.productService.findAll(pageParams, user.id);
  }
}
