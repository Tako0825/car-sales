import { Module } from '@nestjs/common';
import { RankingUserService } from './ranking.user.service';
import { RankingController } from './ranking.controller';
import { RankingCarService } from './ranking.car.service';

@Module({
  controllers: [RankingController],
  providers: [RankingUserService, RankingCarService],
})
export class RankingModule {}
