import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Query, UsePipes, UseGuards } from '@nestjs/common';
import { MoveService } from './move.service';
import { CreateMoveDto } from './dto/create-move.dto';
import { UpdateMoveDto } from './dto/update-move.dto';
import { PageDto } from 'src/common/dto/page.dto';
import { ParseIdPipe } from 'src/common/pipe/parse-id.pipe';
import { Validation } from 'src/common/validation/validation';
import { AuthGuard } from '@nestjs/passport';

// CONTROLLER - MOVE
@Controller('move')
@UseGuards(AuthGuard("jwt"))
export class MoveController {
  constructor(private readonly moveService: MoveService) {}

  // API - CREATE MOVE(创建调仓记录)
  @Post()
  @UsePipes(Validation)
  async create(@Body(ParseIdPipe) createMoveDto: CreateMoveDto) {
    return await this.moveService.create(createMoveDto)
  }

  // API - PAGING QUERY MOVE(分页查询调仓记录)
  @Get()
  @UsePipes(Validation)
  async findPage(
    @Query() pageDto: PageDto,
    @Query("page", ParseIntPipe) page: number,
    @Query("pageSize", ParseIntPipe) pageSize: number
  ) {
    return await this.moveService.findPage(page, pageSize);
  }

  // API - QUERY SPECIFIED MOVE(查询指定的调仓记录)
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.moveService.findOne(id);
  }

  // API - UPDATE MOVE(修改调仓记录)
  @Patch(':id')
  @UsePipes(Validation)
  async update(@Param('id', ParseIntPipe) id: number, @Body(ParseIdPipe) updateMoveDto: UpdateMoveDto) {
    return await this.moveService.update(id, updateMoveDto);
  }

  // API - REMOVE MOVE(删除调仓记录)
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await this.moveService.remove(id);
  }
}
