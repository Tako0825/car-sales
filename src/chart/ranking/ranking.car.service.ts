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
            const year = 5
            const currentYear = new Date().getFullYear()
            // Y轴刻度 - [..., 2020, 2021, ..., 至今]
            const yList = new Array(year).fill(0).map((item, index) => currentYear - year + index + 1)
            
            return new Promise((resolve) => {
                // 以 currentYear 为基准, 取近 year 年以来销量最高的 count 台汽车产品
                this.prisma.$queryRaw`
                    SELECT product.id,product.name,product.model,count(*) as total
                    FROM (
                        SELECT *
                        FROM \`order\`
                        WHERE year(createtime) > ${ currentYear - year}
                    ) AS a
                    INNER JOIN product
                    ON a.productId = product.id
                    GROUP BY product.id
                    ORDER BY total DESC
                    LIMIT ${count}
                `
                .then(async (result: Array<{ id: number,name: string,model: string }>) => {
                    // 近 year 年以来销量最高的 count 台汽车的 “id” 列表
                    const idList = result.map(item => item.id)
                    // 近 year 年以来销量最高的 count 台汽车的 “名称+型号” 列表
                    const xList = result.map(item => `${item.name}-${item.model}`)
                    // 近 year 年以来销量最高的 count 台汽车的 “每年营业额” 列表
                    const source:Array<number[]> = new Array(xList.length).fill(new Array(yList.length).fill(0))
                    
                    // 根据 Echarts 折线图所需数据结构, 将以上数据聚合到 source 当中
                    const promise = idList.map(async (item,index) => {
                        // 上榜汽车在相应年份的销量
                        const result:Array<{ currentyear: number, total: BigInt }> = await this.prisma.$queryRaw`
                            SELECT o.productId,YEAR(o.createtime) AS currentyear,CONVERT(COUNT(*), SIGNED) AS total
                            FROM \`order\` AS o 
                            INNER JOIN product
                            ON o.productId = product.id
                            GROUP BY product.id,currentyear
                            HAVING currentyear >= ${currentYear - year + 1}
                            AND o.productId = ${item}
                        `
                        source[index] = source[index].map((jtem, jndex) => {
                            for(let ktem of result) {
                                if(ktem.currentyear === currentYear - year + 1 + jndex) {
                                    return Number(ktem.total.toString())
                                }
                            }
                            return 0
                        })
                    })
                    await Promise.all(promise)
                    resolve({
                        tip: "成功获取汽车热销榜",
                        idList,
                        xList,
                        yList,
                        source
                    })
                })
            })
        })
    }
}
