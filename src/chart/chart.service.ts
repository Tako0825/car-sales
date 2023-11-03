import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ResponseData } from 'src/common/class/response.data';
import { CommonService } from 'src/common/common.service';
import { PrismaService } from 'src/common/prisma/prisma.service';

@Injectable()
export class ChartService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly commonService: CommonService
    ) {}


}
