import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Product, Warehouse, User, Order } from '@prisma/client';
import { CommonService } from 'src/common/common.service';
import { PrismaModel } from 'src/common/enum/PrismaModel';
import { PrismaService } from 'src/common/prisma/prisma.service';

@Injectable()
export class OrderService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly commonService: CommonService
  ) {}

  // SERVICE - CREATE ORDER(创建订单)
  async create(createOrderDto: CreateOrderDto) {
    const { productId, userId, warehouseId } = createOrderDto
    await this.commonService.getEntityById<Product>(PrismaModel.product, productId)
    await this.commonService.getEntityById<User>(PrismaModel.user, userId)
    await this.commonService.getEntityById<Warehouse>(PrismaModel.warehouse, warehouseId)
    try {
      const order = await this.prisma.order.create({
        data: {
          productId,
          userId,
          warehouseId
        }
      })
      return {
        tip: "成功创建订单",
        order
      }
    }
    catch(error) {
      throw new HttpException({
        tip: "PRISMA 未知错误",
        error
      }, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  // SERVICE - PAGING QUERY ORDER(分页查询订单)
  async findPage(page: number, pageSize: number) {
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
      const { id, productId, userId, warehouseId } = order
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
    }))
    
    // 当前页数据数目
    const count = orderList.length
    return {
      tip: `成功获取第 ${page} 页共 ${count} 条数据`,
      page,
      count,
      pageTotal,
      orderTotal,
      orderList: data
    }
  }

  // SERVICE - QUERY SPECIFIED ORDER(查询指定的订单)
  async findOne(id: number) {
    const { productId, userId, warehouseId } = await this.commonService.getEntityById<Order>(PrismaModel.order, id)
    try {
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
        tip: "成功获取订单",
        id,
        product,
        user,
        warehouse
      }
    }
    catch(error) {
      throw new HttpException({
        tip: "PRISMA 未知错误",
        error
      }, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  // SERVICE - UPDATE ORDER(修改订单)
  async update(id: number, updateOrderDto: UpdateOrderDto) {
    const { userId, productId, warehouseId } = updateOrderDto
    await this.commonService.getEntityById<Order>(PrismaModel.order, id)
    await this.commonService.getEntityById<Product>(PrismaModel.product, productId)
    await this.commonService.getEntityById<User>(PrismaModel.user, userId)
    await this.commonService.getEntityById<Warehouse>(PrismaModel.warehouse, warehouseId)
    try {
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
    }
    catch(error) {
      throw new HttpException({
        tip: "PRISMA 未知错误",
        error
      }, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  // SERVICE - DELETE ORDER(删除订单)
  async remove(id: number) {
    await this.commonService.getEntityById<Order>(PrismaModel.order, id)
    try {
      const result = await this.prisma.order.delete({
        where: {
          id
        }
      })
      return {
        tip: "成功删除订单",
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
