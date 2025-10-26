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
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { PageDto } from 'src/common/dto/page.dto';
import { Validation } from 'src/common/validation/validation';
import { AuthGuard } from '@nestjs/passport';
import { ParseIdPipe } from 'src/common/pipe/parse-id.pipe';

// CONTROLLER - ORDER
@Controller('order')
@UseGuards(AuthGuard('jwt'))
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  // API - CREATE ORDER(创建订单)
  @Post()
  @UsePipes(Validation)
  async create(@Body(ParseIdPipe) createOrderDto: CreateOrderDto) {
    return await this.orderService.create(createOrderDto);
  }

  // API - PAGING QUERY ORDER(分页查询订单)
  @Get()
  @UsePipes(Validation)
  async findPage(
    @Query() pageDto: PageDto,
    @Query('page', ParseIntPipe) page: number,
    @Query('pageSize', ParseIntPipe) pageSize: number,
  ) {
    return await this.orderService.findPage(page, pageSize);
  }

  // API - QUERY SPECIFIED ORDER(查询指定的订单)
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.orderService.findOne(id);
  }

  // API - UPDATE ORDER(修改订单)
  @Patch(':id')
  @UsePipes(Validation)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body(ParseIdPipe) updateOrderDto: UpdateOrderDto,
  ) {
    return await this.orderService.update(id, updateOrderDto);
  }

  // API - REMOVE ORDER(删除订单)
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await this.orderService.remove(id);
  }
}
