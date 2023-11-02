import { Controller, Get } from '@nestjs/common';
import { ChartService } from './chart.service';

@Controller('chart')
export class ChartController {
  constructor(private readonly chartService: ChartService) {}

  // API - GET INCOME TOTAL(获取营业额)
  @Get("income")
  async getIncome() {
    return await this.chartService.getIncome()
  }

  // API - GET SALES TOTAL(获取成交量)
  @Get("sales")
  async getSales() {
    return await this.chartService.getSales()
  }

  // API - GET WAREHOUSE TOTAL(获取仓库数)
  @Get("warehouses")
  async getWarehouses() {
    return await this.chartService.getWarehouses()
  }

  // API - GET USERS TOTAL(获取员工数)
  @Get("users")
  async getUsers() {
    return await this.chartService.getUsers()
  }

  // API - GET USERS RANKING(获取员工流水排行)
  @Get("user-ranking")
  async getUserRanking() {
    return await this.chartService.getUserRanking()
  }
}
