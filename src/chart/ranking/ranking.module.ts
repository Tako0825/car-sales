import { Module } from '@nestjs/common';
import { RankingService } from './ranking.service';
import { RankingController } from './ranking.controller';

@Module({
  controllers: [RankingController],
  providers: [RankingService],
})
export class RankingModule {}
