import { Injectable } from '@nestjs/common';
import { CommonService } from 'src/common/common.service';
import { PrismaService } from 'src/common/prisma/prisma.service';

@Injectable()
export class RankingUserService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly commonService: CommonService,
  ) {}

  // SERVICE - GET USER RANKING(获取员工销售额排行)
  async getUserRanking() {
    return await this.commonService.handlePrismaExecution<Record<string, any>>(
      async () => {
        const count = 7;
        const year = 5;
        const currentYear = new Date().getFullYear();
        // Y轴刻度 - [..., 2020, 2021, ..., 至今]
        const xList = new Array(year)
          .fill(0)
          .map((item, index) => currentYear - year + index + 1);

        return new Promise((resolve) => {
          // 以 currentYear 为基准, 取近 year 年以来销售量最高的 count 名员工
          this.prisma.$queryRaw`
                    SELECT a.userId,user.username,SUM(product.price) AS total
                    FROM (
                        SELECT *
                        FROM \`order\`
                        WHERE year(createtime) > ${currentYear - year}
                    ) AS a
                    INNER JOIN product
                    ON a.productId = product.id
                    INNER JOIN user 
                    ON a.userId = user.id
                    GROUP BY userId
                    ORDER BY total DESC
                    LIMIT ${count}
                `.then(
            async (result: Array<{ userId: number; username: string }>) => {
              // 近 year 年以来销售量最高的 count 名员工的 “id” 列表
              const idList = result.map((item) => item.userId);
              // 近 year 年以来销售量最高的 count 名员工的 “姓名” 列表
              const yList = result.map((item) => item.username);
              // 近 year 年以来销售量最高的 count 名员工的 “每年营业额” 列表
              const source = Array.from({ length: year }, () => []);

              // 根据 Echarts 折线图所需数据结构, 将以上数据聚合到 source 当中
              const promise = idList.map(async (item, index) => {
                // 上榜员工在相应年份的销售额
                const result: Array<{ currentyear: number; total: number }> =
                  await this.prisma.$queryRaw`
                            SELECT YEAR(o.createtime) AS currentyear,ROUND(SUM(product.price),2) AS total
                            FROM \`order\` AS o 
                            INNER JOIN product 
                            ON o.productId = product.id 
                            INNER JOIN user 
                            ON o.userId = user.id 
                            GROUP BY o.userId,currentyear 
                            HAVING currentyear >= ${currentYear - year + 1} 
                            AND o.userId = ${item}
                        `;
                // todo - 在这里进行数据聚合
                result.forEach((item) => {
                  // 计算年份在source数组中的索引
                  const yearIndex = Number(
                    BigInt(item.currentyear) - BigInt(currentYear - year + 1),
                  );
                  // 将每年的销售额数据按顺序添加到相应年份的位置
                  source[yearIndex][index] = item.total;
                });
              });
              await Promise.all(promise);

              resolve({
                idList,
                xList,
                yList,
                source,
              });
            },
          );
        });
      },
    );
  }
}
