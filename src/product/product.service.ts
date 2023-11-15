import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from '@prisma/client';
import { CommonService } from 'src/common/common.service';
import { PrismaModel } from 'src/common/enum/PrismaModel';
import { PrismaService } from 'src/common/prisma/prisma.service';

@Injectable()
export class ProductService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly commonService: CommonService
  ) {}

  // SERVICE - CREATE PRODUCT(创建产品)
  async create(createProductDto: CreateProductDto) {
    const { name, model, price, poster, introduce } = createProductDto
    try {
      const product = await this.prisma.product.create({
        data: {
          name,
          model,
          price: +price,
          introduce,
          poster
        }
      })
      return {
        tip: "成功创建产品",
        product
      }
    }
    catch(error) {
      throw new HttpException({
        tip: "PRISMA 未知错误",
        error
      }, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  // SERVICE - PAGING QUERY PRODUCT(分页查询产品)
  async findPage(page: number, pageSize: number) {
    return await this.commonService.handlePrismaExecution<Record<string, any>>(async () => {
      // 产品总数
      const productTotal = await this.prisma.product.count()
      // 分页总数
      const pageTotal = Math.ceil(productTotal / pageSize)
      // 当前页数据
      const productList =  await this.prisma.product.findMany({
        skip: (page - 1) * pageSize,
        take: pageSize
      })
      // 当前页数据数目
      const count = productList.length
      // 并发收集汽车相应销量
      let source = new Array()
      const promise = productList.map(async (product, index) => {
        const { id } = product
        return {
          ...product,
          sales: await this.prisma.order.count({
            where: {
              productId: id
            }
          })
        }
      })
      source = await Promise.all(promise)
      return {
        page,
        count,
        pageTotal,
        productTotal,
        source
      }
    })
  }

  // SERVICE - QUERY SPECIFIED PRODUCT(查询指定的产品)
  async findOne(id: number) {
    const product = await this.commonService.getEntityById<Product>(PrismaModel.product, id)
    return {
      product
    }
  }

  // SERVICE - UPDATE PRODUCT(修改产品信息)
  async update(id: number, updateProductDto: UpdateProductDto) {
    await this.commonService.getEntityById<Product>(PrismaModel.product, id)
    const { name, model, price, introduce } = updateProductDto
    try {
      const product = await this.prisma.product.update({
        where: {
          id
        },
        data: {
          name,
          model,
          price: +price,
          introduce
        }
      })
      return {
        tip: "成功修改产品信息",
        product
      }
    }
    catch(error) {
      throw new HttpException({
        tip: "PRISMA 未知错误",
        error
      }, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  // SERVICE - DELETE PRODUCT(删除产品)
  async remove(id: number) {
    await this.commonService.getEntityById<Product>(PrismaModel.product, id)
    try {
      const result = await this.prisma.$transaction(async (prisma) => {
        // 1.删除 PRODUCT -前置条件: 删除 MOVE & ORDER & SUPPLY
        await prisma.move.deleteMany({
          where: {
            productId: id
          }
        })
        await prisma.order.deleteMany({
          where: {
            productId: id
          }
        })
        await prisma.supply.deleteMany({
          where: {
            productId: id
          }
        })
        await prisma.product.delete({
          where: {
            id
          }
        })
      })
      return {
        tip: "成功删除产品",
        result
      }
    }
    catch(error) {
      throw new HttpException({
        tip: "PRISMA 未知错误",
        error
      }, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
}
