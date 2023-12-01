import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Query, UsePipes, UseGuards, SetMetadata } from '@nestjs/common';
import { WarehouseService } from './warehouse.service';
import { CreateWarehouseDto } from './dto/create-warehouse.dto';
import { UpdateWarehouseDto } from './dto/update-warehouse.dto';
import { PageDto } from 'src/common/dto/page.dto';
import { Validation } from 'src/common/validation/validation';
import { AuthGuard } from '@nestjs/passport';
import { $Enums } from '@prisma/client';
import { RoleGuard } from 'src/common/guard/role.guard';

// CONTROLLER - WAREHOUSE
@Controller('warehouse')
@UseGuards(AuthGuard("jwt"))
export class WarehouseController {
  constructor(private readonly warehouseService: WarehouseService) {}
  
  // API - CREATE WAREHOUSE(创建仓库)
  @Post()
  @SetMetadata("role", [$Enums.Role.ADMIN, $Enums.Role.ROOT])
  @UseGuards(RoleGuard)
  @UsePipes(Validation)
  async create(@Body() createWarehouseDto: CreateWarehouseDto) {
    return await this.warehouseService.create(createWarehouseDto)
  }

  // API - PAGING QUERY WAREHOUSE(分页查询仓库)
  @Get()
  @UsePipes(Validation)
  async findPage(
    @Query("page") page: string,
    @Query("pageSize") pageSize: string
  ) {
    if(!isNaN(+page) && !isNaN(+pageSize))
      return await this.warehouseService.findPage(+page, +pageSize);
    else return this.warehouseService.findAll()
  }

  // API - QUERY SPECIFIED WAREHOUSE(查询指定的仓库)
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.warehouseService.findOne(id);
  }

  // API - QUERY SPECIFIED WAREHOUSE'S INVENTORY(查询指定的仓库库存)
  @Get(':id/inventory')
  async findInventory(@Param('id', ParseIntPipe) id: number) {
    return await this.warehouseService.findInventory(id);
  }

  // API - UPDATE WAREHOUSE(修改仓库信息)
  @Patch(':id')
  @SetMetadata("role", [$Enums.Role.ADMIN, $Enums.Role.ROOT])
  @UseGuards(RoleGuard)
  @UsePipes(Validation)
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateWarehouseDto: UpdateWarehouseDto) {
    return await this.warehouseService.update(id, updateWarehouseDto);
  }

  // API - REMOVE WAREHOUSE(删除仓库)
  @Delete(':id')
  @SetMetadata("role", [$Enums.Role.ADMIN, $Enums.Role.ROOT])
  @UseGuards(RoleGuard)
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await this.warehouseService.remove(id);
  }
}
