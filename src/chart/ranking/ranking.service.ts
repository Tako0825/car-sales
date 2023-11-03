import { Injectable } from '@nestjs/common';
import { ResponseData } from 'src/common/class/response.data';
import { CommonService } from 'src/common/common.service';
import { PrismaService } from 'src/common/prisma/prisma.service';

@Injectable()
export class RankingService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly commonService: CommonService
    ) {}

    // SERVICE - GET USERS RANKING(获取员工销售额排行)
    async getUserRanking() {
        return await this.commonService.handlePrismaExecution<ResponseData>(async () => {
            const count = 7
            const year = 5
            const currentYear = new Date().getFullYear()
            const yList = new Array(year).fill(0).map((item, index) => currentYear - year + index)
            
            return new Promise((resolve) => {
                this.prisma.$queryRaw`
                    select \`order\`.userId,user.username
                    from \`order\`
                    inner join product
                    on \`order\`.productId=product.id 
                    inner join user 
                    on \`order\`.userId=user.id
                    group by \`order\`.userId
                    order by sum(product.price) desc
                    limit ${count}
                `
                .then(async (result: Array<{ userId: number,username: string }>) => {
                    const idList = result.map(item => item.userId)
                    const xList = result.map(item => item.username)
                    const source:Array<number[]> = new Array(xList.length).fill(new Array(yList.length).fill(0))
                    
                    idList.map(async (item,index) => {
                        const result:Array<{ year: number, total: number }> = await this.prisma.$queryRaw`
                            select year(o.createtime) as year,sum(product.price) as total
                            from \`order\` as o 
                            inner join product
                            on o.productId=product.id
                            inner join user
                            on o.userId=user.id
                            group by o.userId,year
                            having year>=${currentYear - year}
                            and year<=${currentYear}
                            and o.userId=${item}
                        `
                        console.log(result);
                    })
                    resolve({
                        tip: "成功获取员工销售额排行榜",
                        idList,
                        xList,
                        yList
                    })
                })
            })
        })
    }
}
