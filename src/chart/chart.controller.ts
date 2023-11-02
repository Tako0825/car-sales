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
}
