import { Injectable } from '@nestjs/common';
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
        const sales = await this.prisma.$queryRaw`
            SELECT ROUND(SUM(product.price), 2) AS sales
            FROM \`order\` AS o
            INNER JOIN product 
            ON o.productId = product.id
            WHERE o.userId = ${id}
        `
        const average = await this.prisma.$queryRaw`
          select round(avg(b.sales), 2) as average_sales, ceil(avg(b.count)) as average_count
          from (
            select user.id, ifnull(a.sales, 0) as sales, ifnull(a.count, 0) as count
            from user 
            left join (
              select userId, sum(product.price) as sales, count(o.id) as count
              from \`order\` as o 
              inner join product 
              on o.productId = product.id 
              group by userId 
            ) as a
            on user.id = a.userId
          ) as b
        `
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
            sales: sales[0].sales,
            average_count: average[0].average_count,
            average_sales: average[0].average_sales,
            source
        }
    })
  }
}
