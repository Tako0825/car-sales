import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';

@Injectable()
export class StatisticsService {
    constructor(private prisma: PrismaService) {}

    // SERVICE - GET INCOME TOTAL(获取营业额)
    async getIncome() {
        try {
            const result = await this.prisma.$queryRaw`
                SELECT SUM(p.price) AS income
                FROM \`order\` AS o
                LEFT JOIN product AS p
                on o.productId = p.id
            `
            return {
                tip: "成功获取营业额",
                income: result[0].income
            }
        }
        catch(error) {
            throw new HttpException({
                tip: "PRISMA 未知错误"
            }, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    // SERVICE - GET SALES TOTAL(获取成交量)
    async getSales() {
        try {
            const result = await this.prisma.order.count()
            return {
                tip: "成功获取成交量",
                sales: result
            }
        }
        catch(error) {
            throw new HttpException({
                tip: "PRISMA 未知错误"
            }, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
}
