import { Controller, Get, UseGuards } from '@nestjs/common';
import { QiniuService } from './qiniu.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('qiniu')
@UseGuards(AuthGuard("jwt"))
export class QiniuController {
    constructor(private readonly qiniuService:QiniuService) {}

    // 接口 - 获取七牛云上传凭据
    @Get("upload-token")
    getUploadToken() {
      return this.qiniuService.getUploadToken()
    }
}
