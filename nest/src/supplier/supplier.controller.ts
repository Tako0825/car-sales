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
  UseGuards,
  SetMetadata,
} from '@nestjs/common';
import { SupplierService } from './supplier.service';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';
import { PageDto } from 'src/common/dto/page.dto';
import { Validation } from 'src/common/validation/validation';
import { AuthGuard } from '@nestjs/passport';
import { $Enums } from '@prisma/client';
import { RoleGuard } from 'src/common/guard/role.guard';

// CONTROLLER - SUPPLIER
@Controller('supplier')
@UseGuards(AuthGuard('jwt'))
export class SupplierController {
  constructor(private readonly supplierService: SupplierService) {}

  // API - CREATE SUPPLIER(创建供应商)
  @Post()
  @SetMetadata('role', [$Enums.Role.ADMIN, $Enums.Role.ROOT])
  @UseGuards(RoleGuard)
  @UsePipes(Validation)
  async create(@Body() createSupplierDto: CreateSupplierDto) {
    return await this.supplierService.create(createSupplierDto);
  }

  // API - PAGING QUERY SUPPLIER(分页查询供应商)
  @Get()
  @UsePipes(Validation)
  async findPage(
    @Query('page') page: string,
    @Query('pageSize') pageSize: string,
  ) {
    if (!isNaN(+page) && !isNaN(+pageSize))
      return await this.supplierService.findPage(+page, +pageSize);
    else return this.supplierService.findAll();
  }

  // API - QUERY SPECIFIED SUPPLIER(查询指定的供应商)
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.supplierService.findOne(id);
  }

  // API - UPDATE SUPPLIER(修改供应商信息)
  @Patch(':id')
  @SetMetadata('role', [$Enums.Role.ADMIN, $Enums.Role.ROOT])
  @UseGuards(RoleGuard)
  @UsePipes(Validation)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateSupplierDto: UpdateSupplierDto,
  ) {
    return await this.supplierService.update(id, updateSupplierDto);
  }

  // API - REMOVE SUPPLIER(删除供应商)
  @Delete(':id')
  @SetMetadata('role', [$Enums.Role.ADMIN, $Enums.Role.ROOT])
  @UseGuards(RoleGuard)
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await this.supplierService.remove(id);
  }
}
