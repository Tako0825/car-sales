import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Product, Warehouse, User, Order } from '@prisma/client';
import { CommonService } from 'src/common/common.service';
import { PrismaModel } from 'src/common/enum/PrismaModel';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { ResponseData } from 'src/common/class/response.data';

@Injectable()
export class OrderService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly commonService: CommonService
  ) {}

  // SERVICE - CREATE ORDER(创建订单)
  async create(createOrderDto: CreateOrderDto) {
    const { productId, userId, warehouseId, createtime } = createOrderDto
    await this.commonService.getEntityById<Product>(PrismaModel.product, productId)
    await this.commonService.getEntityById<User>(PrismaModel.user, userId)
    await this.commonService.getEntityById<Warehouse>(PrismaModel.warehouse, warehouseId)
    return await this.commonService.handlePrismaExecution<ResponseData>(async() => {
      const order = await this.prisma.order.create({
        data: {
          productId,
          userId,
          warehouseId,
          createtime
        }
      })
      return {
        tip: "成功创建订单",
        order
      }
    })
  }

  // SERVICE - PAGING QUERY ORDER(分页查询订单)
  async findPage(page: number, pageSize: number) {
    return await this.commonService.handlePrismaExecution<Record<string, any>>(async() => {
      // 产品总数
      const orderTotal = await this.prisma.order.count()
      // 分页总数
      const pageTotal = Math.ceil(orderTotal / pageSize)
      // 当前页数据
      const orderList =  await this.prisma.order.findMany({
        skip: (page - 1) * pageSize,
        take: pageSize
      })
      // 数据聚合
      const data = await Promise.all(orderList.map(async order => {
        const { id, productId, userId, warehouseId, createtime } = order
        const product = await this.prisma.product.findUnique({
          where: {
            id: productId
          }
        })
        const user = await this.prisma.user.findUnique({
          where: {
            id: userId
          }
        })
        const warehouse = await this.prisma.warehouse.findUnique({
          where: {
            id: warehouseId
          }
        })
        return {
          id,
          brand: product.name,
          model: product.model,
          user: user.username,
          phone: user.phone,
          warehouse: warehouse.location,
          createtime
        }
      }))
      // 当前页数据数目
      const count = orderList.length
      return {
        page,
        count,
        pageTotal,
        orderTotal,
        orderList: data
      }
    })
  }

  // SERVICE - QUERY SPECIFIED ORDER(查询指定的订单)
  async findOne(id: number) {
    const { productId, userId, warehouseId } = await this.commonService.getEntityById<Order>(PrismaModel.order, id)
    return await this.commonService.handlePrismaExecution<Record<string, any>>(async() => {
      const product = await this.prisma.product.findUnique({
        where: {
          id: productId
        }
      })
      const user = await this.prisma.supplier.findUnique({
        where: {
          id: userId
        }
      })
      const warehouse = await this.prisma.warehouse.findUnique({
        where: {
          id: warehouseId
        }
      })
      return {
        id,
        product,
        user,
        warehouse
      }
    })
  }

  // SERVICE - UPDATE ORDER(修改订单)
  async update(id: number, updateOrderDto: UpdateOrderDto) {
    const { userId, productId, warehouseId } = updateOrderDto
    await this.commonService.getEntityById<Order>(PrismaModel.order, id)
    await this.commonService.getEntityById<User>(PrismaModel.user, userId)
    await this.commonService.getEntityById<Product>(PrismaModel.product, productId)
    await this.commonService.getEntityById<Warehouse>(PrismaModel.warehouse, warehouseId)
    return await this.commonService.handlePrismaExecution<ResponseData>(async() => {
      const order = await this.prisma.order.update({
        where: {
          id
        },
        data: {
          productId,
          userId,
          warehouseId
        }
      })
      return {
        tip: "成功修改订单",
        order
      }
    })
  }

  // SERVICE - DELETE ORDER(删除订单)
  async remove(id: number) {
    await this.commonService.getEntityById<Order>(PrismaModel.order, id)
    return await this.commonService.handlePrismaExecution<ResponseData>(async() => {
      // 1.删除订单
      const deleted = await this.prisma.order.delete({
        where: {
          id
        }
      })
      // 2.将相应库存记录的库存量 + 1
      await this.prisma.inventory.updateMany({
        where: {
          productId: deleted.productId,
          warehouseId: deleted.warehouseId
        },
        data: {
          quantity: {
            increment: 1
          }
        }
      })
      return {
        tip: "成功删除订单"
      }
    })
  }
}
