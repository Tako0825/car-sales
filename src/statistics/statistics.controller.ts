import { Controller, Get } from '@nestjs/common';
import { StatisticsService } from './statistics.service';

@Controller('statistics')
export class StatisticsController {
  constructor(private readonly statisticsService: StatisticsService) {}

  // API - GET INCOME TOTAL(获取营业额)
  @Get("income")
  async getIncome() {
    return await this.statisticsService.getIncome()
  }

  // API - GET SALES TOTAL(获取成交量)
  @Get("sales")
  async getSales() {
    return await this.statisticsService.getSales()
  }

}
