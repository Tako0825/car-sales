import { Controller, Get } from '@nestjs/common';
import { TotalService } from './total.service';

@Controller('chart/total')
export class TotalController {
  constructor(private readonly totalService: TotalService) {}

  // API - GET INCOME TOTAL(获取营业额)
  @Get('income')
  async getIncome() {
    return await this.totalService.getIncome();
  }

  // API - GET SALES TOTAL(获取成交量)
  @Get('sales')
  async getSales() {
    return await this.totalService.getSales();
  }

  // API - GET WAREHOUSE TOTAL(获取仓库数)
  @Get('warehouses')
  async getWarehouses() {
    return await this.totalService.getWarehouses();
  }

  // API - GET USERS TOTAL(获取员工数)
  @Get('users')
  async getUsers() {
    return await this.totalService.getUsers();
  }
}
