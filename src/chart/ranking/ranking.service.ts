import { Injectable } from '@nestjs/common';
import { ResponseData } from 'src/common/class/response.data';
import { CommonService } from 'src/common/common.service';
import { PrismaService } from 'src/common/prisma/prisma.service';

@Injectable()
export class RankingService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly commonService: CommonService
    ) {}

    // SERVICE - GET USERS RANKING(获取员工销售额排行)
    async getUserRanking() {
        return await this.commonService.handlePrismaExecution<ResponseData>(async () => {
            const count = 7
            const result = await this.prisma.$queryRaw`
                SELECT userId,username,ROUND(SUM(price),2) AS price
                FROM (
                    SELECT o.userId, u.username, p.price
                    FROM \`order\` as o
                    INNER JOIN product as p
                    ON o.productId=p.id
                    INNER JOIN user as u
                    ON o.userId=u.id
                ) AS result
                GROUP BY userId
                ORDER BY price DESC
                LIMIT ${count}
            `
            return {
                tip: "成功获取员工销售额排行榜",
                count,
                result
            }
        })
    }
}
