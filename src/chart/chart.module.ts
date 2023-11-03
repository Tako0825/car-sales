import { Module } from '@nestjs/common';
import { TotalModule } from './total/total.module';
import { RankingModule } from './ranking/ranking.module';

@Module({
  controllers: [],
  providers: [],
  imports: [TotalModule, RankingModule],
})
export class ChartModule {}
