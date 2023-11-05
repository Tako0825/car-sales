import { Injectable } from '@nestjs/common';
import { ResponseData } from 'src/common/class/response.data';
import { CommonService } from 'src/common/common.service';
import { PrismaService } from 'src/common/prisma/prisma.service';

@Injectable()
export class RankingCarService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly commonService: CommonService
    ) {}

    // SERVICE - GET CAR RANKING(获取汽车热销榜)
    async getCarRanking() {
        return await this.commonService.handlePrismaExecution<ResponseData>(async () => {
            const count = 7
            const year = 10
            const currentYear = new Date().getFullYear()
            // Y轴刻度 - [..., 2020, 2021, ..., 至今]
            const yList = new Array(year).fill(0).map((item, index) => currentYear - year + index + 1)
            const products:Array<{ id: number, fullname: string }> = await this.prisma.$queryRaw`
                SELECT product.id,
                CONCAT(product.name,'-',product.model) AS fullname
                FROM \`order\` AS o 
                INNER JOIN product 
                ON o.productId = product.id
                WHERE year(o.createtime) > ${currentYear - year}
                GROUP BY o.productId
                ORDER BY count(*) DESC, productId ASC
                LIMIT ${count}
            `
            // 近 year 年以来销量最高的 count 台汽车的 “id” 列表
            const idList = products.map(product => product.id)
            // 近 year 年以来销量最高的 count 台汽车的 “全称” 列表
            const xList = products.map(product => product.fullname)

            interface ISource {
                productId: number
                product: string
                currentyear: number
                sales: string
            }

            // 近 year 年以来销量最高的 count 台汽车的 “每年销量” 列表
            const result:Array<ISource> = await this.prisma.$queryRaw`
                SELECT sub1.productId,
                sub1.product,
                sub1.currentyear,
                CONCAT(sub1.yearsales, '') AS sales
                FROM (
                    SELECT o.productId,
                    CONCAT(product.name,"-",product.model) AS product,
                    YEAR(o.createtime) AS currentyear,
                    count(*) AS yearsales
                    FROM \`order\` AS o 
                    INNER JOIN product 
                    ON o.productId = product.id
                    GROUP BY o.productId, currentyear
                ) AS sub1
                INNER JOIN (
                    SELECT o.productId, count(*) AS sales
                    FROM \`order\` AS o 
                    WHERE year(o.createtime) > ${currentYear - year}
                    GROUP BY o.productId
                    ORDER BY sales DESC, productId ASC
                    LIMIT ${count}
                ) AS sub2
                ON sub1.productId = sub2.productId
                HAVING sub1.currentyear > ${currentYear - year}
                ORDER BY currentyear, sales DESC, productId ASC
            `
            const source:Array<[any, any, any]> = [["sales", "product", "year"]]
            result.map(item => {
                source.push([ +item.sales, item.product, item.currentyear ])
            })

            return {
                tip: "成功获取汽车热销榜",
                idList,
                xList,
                yList,
                source
            }
        })
    }
}
