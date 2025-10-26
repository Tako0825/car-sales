import { Module } from '@nestjs/common';
import { SupplyService } from './supply.service';
import { SupplyController } from './supply.controller';

@Module({
  controllers: [SupplyController],
  providers: [SupplyService],
})
export class SupplyModule {}
