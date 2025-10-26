import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  Query,
  UsePipes,
  ParseFloatPipe,
  UseGuards,
  SetMetadata,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PageDto } from 'src/common/dto/page.dto';
import { Validation } from 'src/common/validation/validation';
import { AuthGuard } from '@nestjs/passport';
import { $Enums } from '@prisma/client';
import { RoleGuard } from 'src/common/guard/role.guard';

// CONTROLLER - PRODUCT
@Controller('product')
@UseGuards(AuthGuard('jwt'))
export class ProductController {
  constructor(private readonly productServise: ProductService) {}

  // API - CREATE PRODUCT(创建产品)
  @Post()
  @SetMetadata('role', [$Enums.user_role.ADMIN, $Enums.user_role.ROOT])
  @UseGuards(RoleGuard)
  @UsePipes(Validation)
  async create(@Body() createProductDto: CreateProductDto) {
    return await this.productServise.create(createProductDto);
  }

  // API - PAGING QUERY PRODUCT(分页查询产品)
  @Get()
  @UsePipes(Validation)
  async findPage(
    @Query('page') page: string,
    @Query('pageSize') pageSize: string,
  ) {
    if (!isNaN(+page) && !isNaN(+pageSize))
      return await this.productServise.findPage(+page, +pageSize);
    else return this.productServise.findAll();
  }

  // API - QUERY SPECIFIED PRODUCT(查询指定的产品)
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.productServise.findOne(id);
  }

  // API - QUERY SPECIFIED PRODUCT'S INVENTORY(查询指定的产品库存)
  @Get(':id/inventory')
  async findInventory(@Param('id', ParseIntPipe) id: number) {
    return await this.productServise.findInventory(id);
  }

  // API - UPDATE PRODUCT(修改产品信息)
  @Patch(':id')
  @SetMetadata('role', [$Enums.user_role.ADMIN, $Enums.user_role.ROOT])
  @UseGuards(RoleGuard)
  @UsePipes(Validation)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return await this.productServise.update(id, updateProductDto);
  }

  // API - REMOVE PRODUCT(删除产品)
  @Delete(':id')
  @SetMetadata('role', [$Enums.user_role.ADMIN, $Enums.user_role.ROOT])
  @UseGuards(RoleGuard)
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await this.productServise.remove(id);
  }
}
