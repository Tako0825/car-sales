import { Injectable } from '@nestjs/common';
import { ResponseData } from 'src/common/class/response.data';
import { CommonService } from 'src/common/common.service';
import { PrismaService } from 'src/common/prisma/prisma.service';

@Injectable()
export class TotalService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly commonService: CommonService
    ) {}

    // SERVICE - GET INCOME TOTAL(获取营业额)
    async getIncome() {
        return await this.commonService.handlePrismaExecution<ResponseData>(async () => {
            const result = await this.prisma.$queryRaw`
                SELECT ROUND(SUM(product.price),2) AS income
                FROM \`order\`
                LEFT JOIN product
                ON \`order\`.productId = product.id
            `
            return {
                tip: "成功获取营业额",
                total: result[0].income
            }
        })
    }

    // SERVICE - GET SALES TOTAL(获取成交量)
    async getSales() {
        return await this.commonService.handlePrismaExecution<ResponseData>(async () => {
            return {
                tip: "成功获取成交量",
                total: await this.prisma.order.count()
            }
        })
    }

    // SERVICE - GET WAREHOUSE TOTAL(获取仓库数)
    async getWarehouses() {
        return await this.commonService.handlePrismaExecution<ResponseData>(async () => {
            return {
                tip: "成功获取仓库数",
                total: await this.prisma.warehouse.count()
            }
        }) 
    }

    // SERVICE - GET USERS TOTAL(获取员工数)
    async getUsers() {
        return await this.commonService.handlePrismaExecution<ResponseData>(async () => {
            return {
                tip: "成功获取员工数",
                total: await this.prisma.user.count()
            }
        })
    }
}
