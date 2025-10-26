import { Module } from '@nestjs/common';
import { WarehouseService } from './warehouse.service';
import { WarehouseController } from './warehouse.controller';

@Module({
  controllers: [WarehouseController],
  providers: [WarehouseService],
})
export class WarehouseModule {}
