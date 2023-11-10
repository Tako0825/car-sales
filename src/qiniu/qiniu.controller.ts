import { Controller, Get } from '@nestjs/common';
import { QiniuService } from './qiniu.service';

@Controller('qiniu')
export class QiniuController {
    constructor(private readonly qiniuService:QiniuService) {}

    // 接口 - 获取七牛云上传凭据
    @Get("upload-token")
    getUploadToken() {
      return this.qiniuService.getUploadToken()
    }
}
