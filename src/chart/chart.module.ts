import { Module } from '@nestjs/common';
import { ChartService } from './chart.service';
import { ChartController } from './chart.controller';
import { TotalModule } from './total/total.module';
import { RankingModule } from './ranking/ranking.module';

@Module({
  controllers: [ChartController],
  providers: [ChartService],
  imports: [TotalModule, RankingModule],
})
export class ChartModule {}
