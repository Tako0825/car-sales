import { Module } from '@nestjs/common';
import { TotalService } from './total.service';
import { TotalController } from './total.controller';

@Module({
  controllers: [TotalController],
  providers: [TotalService],
})
export class TotalModule {}
