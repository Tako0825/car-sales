import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModel } from './enum/PrismaModel';

@Injectable()
export class CommonService {
    constructor(private prisma:PrismaService) {}

    /**
     * 尝试根据 uuid 获取数据模型的实体 entity
     * @param { PrismaModel } model - 具体的数据模型
     * @param { string } uuid - 当前数据实体对应的uuid
     * @return - entity | HttpException(异常)
    */
    async getEntityByUuid(model: PrismaModel, uuid: string) {
        const entity = await (this.prisma[model] as any).findFirst({
            where: {
                uuid
            }
        })
        if(!entity) {
            throw new HttpException({
                tip: `无效的uuid`,
                meta: {
                    uuid
                }
            }, HttpStatus.UNPROCESSABLE_ENTITY)
        } else return entity
    }
}
