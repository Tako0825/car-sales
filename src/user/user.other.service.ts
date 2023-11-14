import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { CommonService } from 'src/common/common.service';

@Injectable()
export class UserOtherService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly commonService: CommonService
  ) {}

  // SERVICE - QUERY ALL MY ORDER(查询用户订单)
  async findMyOrder(id: number) {
    return this.commonService.handlePrismaExecution<Record<string, any>>(async () => {
        const count = await this.prisma.order.count({
            where: {
                userId: id
            }
        })
        let salesResult = await this.prisma.$queryRaw`
            SELECT ROUND(SUM(product.price), 2) AS sales
            FROM \`order\` AS o
            INNER JOIN product 
            ON o.productId = product.id
            WHERE o.userId = ${id}
        `
        const sales = salesResult[0].sales
        const source = await this.prisma.$queryRaw`
            SELECT o.id, product.name, product.model, warehouse.location, o.createtime 
            FROM \`order\` AS o 
            INNER JOIN product 
            ON o.productId = product.id 
            INNER JOIN warehouse 
            ON o.warehouseId = warehouse.id 
            WHERE userId = ${id}
        `
        return {
            count,
            sales,
            source
        }
    })
  }
}
