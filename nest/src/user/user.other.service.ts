import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { CommonService } from 'src/common/common.service';

@Injectable()
export class UserOtherService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly commonService: CommonService,
  ) {}

  // SERVICE - QUERY ALL MY ORDER(查询用户订单)
  async findMyOrder(id: number) {
    return this.commonService.handlePrismaExecution<Record<string, any>>(
      async () => {
        const count = await this.prisma.order.count({
          where: {
            userId: id,
          },
        });
        const sales = await this.prisma.$queryRaw`
            SELECT ROUND(SUM(Product.price), 2) AS sales
            FROM \`Order\` AS o
            INNER JOIN Product 
            ON o.productId = Product.id
            WHERE o.userId = ${id}
        `;
        const average = await this.prisma.$queryRaw`
          select round(avg(b.sales), 2) as average_sales, ceil(avg(b.count)) as average_count
          from (
            select User.id, ifnull(a.sales, 0) as sales, ifnull(a.count, 0) as count
            from User 
            left join (
              select userId, sum(Product.price) as sales, count(o.id) as count
              from \`Order\` as o 
              inner join Product 
              on o.productId = Product.id 
              group by userId 
            ) as a
            on User.id = a.userId
          ) as b
        `;
        const source = await this.prisma.$queryRaw`
            SELECT o.id, Product.name, Product.model, Warehouse.location, o.createtime 
            FROM \`Order\` AS o 
            INNER JOIN Product 
            ON o.productId = Product.id 
            INNER JOIN Warehouse 
            ON o.warehouseId = Warehouse.id 
            WHERE userId = ${id}
        `;
        return {
          count,
          sales: sales[0].sales,
          average_count: average[0].average_count,
          average_sales: average[0].average_sales,
          source,
        };
      },
    );
  }
}
