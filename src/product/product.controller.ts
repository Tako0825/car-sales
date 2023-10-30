import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Query, UsePipes, ParseFloatPipe, UseGuards } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PageDto } from 'src/common/dto/page.dto';
import { Validation } from 'src/common/validation/validation';
import { AuthGuard } from '@nestjs/passport';

// CONTROLLER - PRODUCT
@Controller('product')
@UseGuards(AuthGuard("jwt"))
export class ProductController {
  constructor(private readonly productServise: ProductService) {}

  // API - CREATE PRODUCT(创建产品)
  @Post()
  @UsePipes(Validation)
  async create(@Body() createProductDto: CreateProductDto) {
    return await this.productServise.create(createProductDto)
  }

  // API - PAGING QUERY PRODUCT(分页查询产品)
  @Get()
  @UsePipes(Validation)
  async findPage(
    @Query() pageDto: PageDto,
    @Query("page", ParseIntPipe) page: number,
    @Query("pageSize", ParseIntPipe) pageSize: number
  ) {
    return await this.productServise.findPage(page, pageSize);
  }

  // API - QUERY SPECIFIED PRODUCT(查询指定的产品)
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.productServise.findOne(id);
  }

  // API - UPDATE PRODUCT(修改产品信息)
  @Patch(':id')
  @UsePipes(Validation)
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateProductDto: UpdateProductDto) {
    return await this.productServise.update(id, updateProductDto);
  }

  // API - REMOVE PRODUCT(删除产品)
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await this.productServise.remove(id);
  }
}
