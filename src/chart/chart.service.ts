import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';

@Injectable()
export class ChartService {
    constructor(private readonly prisma: PrismaService) {}

    // SERVICE - GET INCOME TOTAL(获取营业额)
    async getIncome() {
        try {
            const result = await this.prisma.$queryRaw`
                SELECT SUM(product.price) AS income
                FROM \`order\`
                LEFT JOIN product
                on \`order\`.productId = product.id
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
            return {
                tip: "成功获取成交量",
                sales: await this.prisma.order.count()
            }
        }
        catch(error) {
            throw new HttpException({
                tip: "PRISMA 未知错误"
            }, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
}
