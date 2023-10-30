import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Query, UsePipes, UseGuards } from '@nestjs/common';
import { SupplyService } from './supply.service';
import { CreateSupplyDto } from './dto/create-supply.dto';
import { UpdateSupplyDto } from './dto/update-supply.dto';
import { PageDto } from 'src/common/dto/page.dto';
import { Validation } from 'src/common/validation/validation';
import { AuthGuard } from '@nestjs/passport';
import { ParseIdPipe } from 'src/common/pipe/parse-id.pipe';

@Controller('supply')
@UseGuards(AuthGuard("jwt"))
export class SupplyController {
  constructor(private readonly supplyService: SupplyService) {}

  // API - CREATE SUPPLY(创建供应记录)
  @Post()
  @UsePipes(Validation)
  async create(@Body(ParseIdPipe) createSupplyDto: CreateSupplyDto) {
    return await this.supplyService.create(createSupplyDto)
  }

  // API - PAGING QUERY SUPPLY(分页查询供应记录)
  @Get()
  @UsePipes(Validation)
  async findPage(
    @Query() pageDto: PageDto,
    @Query("page", ParseIntPipe) page: number,
    @Query("pageSize", ParseIntPipe) pageSize: number
  ) {
    return await this.supplyService.findPage(page, pageSize);
  }

  // API - QUERY SPECIFIED SUPPLY(查询指定的供应记录)
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.supplyService.findOne(id);
  }

  // API - UPDATE SUPPLY(修改供应记录)
  @Patch(':id')
  @UsePipes(Validation)
  async update(@Param('id', ParseIntPipe) id: number, @Body(ParseIdPipe) updateSupplyDto: UpdateSupplyDto) {
    return await this.supplyService.update(id, updateSupplyDto);
  }

  // API - REMOVE SUPPLY(删除供应记录)
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await this.supplyService.remove(id);
  }
}
