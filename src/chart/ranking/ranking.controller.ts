import { Controller, Get } from '@nestjs/common';
import { RankingService } from './ranking.service';

@Controller('chart/ranking')
export class RankingController {
  constructor(private readonly rankingService: RankingService) {}
  
  // API - GET USERS RANKING(获取员工流水排行)
  @Get("user")
  async getUserRanking() {
    return await this.rankingService.getUserRanking()
  }
}
