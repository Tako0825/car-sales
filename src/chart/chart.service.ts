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
                total: result[0].income
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
                total: await this.prisma.order.count()
            }
        }
        catch(error) {
            throw new HttpException({
                tip: "PRISMA 未知错误"
            }, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    // SERVICE - GET WAREHOUSE TOTAL(获取仓库数)
    async getWarehouses() {
        try {
            return {
                tip: "成功获取仓库数",
                total: await this.prisma.warehouse.count()
            }
        }
        catch(error) {
            throw new HttpException({
                tip: "PRISMA 未知错误"
            }, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    // SERVICE - GET USERS TOTAL(获取员工数)
    async getUsers() {
        try {
            return {
                tip: "成功获取员工数",
                total: await this.prisma.user.count()
            }
        }
        catch(error) {
            throw new HttpException({
                tip: "PRISMA 未知错误"
            }, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    // SERVICE - GET USERS RANKING(获取员工流水排行)
    async getUserRanking() {
        try {
            const result = await this.prisma.$queryRaw`
                select result.userId,result.username,round(sum(result.price),2) as price
                from (
                    select o.userId,u.username,p.price
                    from \`order\` as o
                    inner join product as p
                    on o.productId=p.id
                    inner join user as u
                    on o.userId=u.id
                ) as result
                group by userId
                order by price
                desc
                limit 7
            `
            return {
                tip: "成功获取员工数",
                result
            }
        }
        catch(error) {
            throw new HttpException({
                tip: "PRISMA 未知错误"
            }, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
}
