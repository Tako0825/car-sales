import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModel } from './enum/PrismaModel';

@Injectable()
export class CommonService {
    constructor(private prisma:PrismaService) {}

    async getEntityById<T>(model: PrismaModel, id: number): Promise<T> {
        const entity = await (this.prisma[model] as any).findUnique({
            where: {
                id
            }
        })
        if(!entity) {
            throw new HttpException({
                tip: "请提供有效的 id",
                id
            }, HttpStatus.UNPROCESSABLE_ENTITY)
        }
        else return entity
    }
}
