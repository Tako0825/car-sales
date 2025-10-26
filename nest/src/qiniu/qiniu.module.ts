import { Module } from '@nestjs/common';
import { QiniuService } from './qiniu.service';
import { QiniuController } from './qiniu.controller';

@Module({
  providers: [QiniuService],
  controllers: [QiniuController]
})
export class QiniuModule {}
