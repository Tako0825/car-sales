import { Controller, Get } from '@nestjs/common';
import { RankingUserService } from './ranking.user.service';
import { RankingCarService } from './ranking.car.service';

@Controller('chart/ranking')
export class RankingController {
  constructor(
    private readonly rankingUserService: RankingUserService,
    private readonly rankingCarService: RankingCarService
  ) {}
  
  // API - GET USERS RANKING(获取员工流水排行)
  @Get("user")
  async getUserRanking() {
    return await this.rankingUserService.getUserRanking()
  }

  @Get("car")
  async getCarRanking() {
    return await this.rankingCarService.getCarRanking()
  }
}
