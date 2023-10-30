import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateMoveDto } from './dto/create-move.dto';
import { UpdateMoveDto } from './dto/update-move.dto';
import { Product, User, Warehouse, Order, Move } from '@prisma/client';
import { CommonService } from 'src/common/common.service';
import { PrismaModel } from 'src/common/enum/PrismaModel';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { CreateOrderDto } from 'src/order/dto/create-order.dto';
import { UpdateOrderDto } from 'src/order/dto/update-order.dto';

@Injectable()
export class MoveService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly commonService: CommonService
  ) {}

  // SERVICE - CREATE MOVE(创建调仓记录)
  async create(createMoveDto: CreateMoveDto) {
    const { productId, operatorId, outboundId, inboundId } = createMoveDto
    await this.commonService.getEntityById<Product>(PrismaModel.product, productId)
    await this.commonService.getEntityById<User>(PrismaModel.user, operatorId)
    await this.commonService.getEntityById<Warehouse>(PrismaModel.warehouse, outboundId)
    await this.commonService.getEntityById<Warehouse>(PrismaModel.warehouse, inboundId)
    try {
      const move = await this.prisma.move.create({
        data: {
          productId, 
          operatorId, 
          outboundId, 
          inboundId
        }
      })
      return {
        tip: "成功创建调仓记录",
        move
      }
    }
    catch(error) {
      throw new HttpException({
        tip: "PRISMA 未知错误",
        error
      }, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  // SERVICE - PAGING QUERY MOVE(分页查询调仓记录)
  async findPage(page: number, pageSize: number) {
    // 产品总数
    const moveTotal = await this.prisma.move.count()
    // 分页总数
    const pageTotal = Math.ceil(moveTotal / pageSize)
    // 当前页数据
    const moveList =  await this.prisma.move.findMany({
      skip: (page - 1) * pageSize,
      take: pageSize
    })
    // 数据聚合
    const data = await Promise.all(moveList.map(async move => {
      const { id, productId, operatorId, outboundId, inboundId } = move
      const product = await this.prisma.product.findUnique({
        where: {
          id: productId
        }
      })
      const operator = await this.prisma.supplier.findUnique({
        where: {
          id: operatorId
        }
      })
      const outbound = await this.prisma.warehouse.findUnique({
        where: {
          id: outboundId
        }
      })
      const inbound = await this.prisma.warehouse.findUnique({
        where: {
          id: inboundId
        }
      })
      return {
        id,
        product,
        operator,
        outbound,
        inbound
      }
    }))
    
    // 当前页数据数目
    const count = moveList.length
    return {
      tip: `成功获取第 ${page} 页共 ${count} 条数据`,
      page,
      count,
      pageTotal,
      moveTotal,
      moveList: data
    }
  }

  // SERVICE - QUERY SPECIFIED MOVE(查询指定的调仓记录)
  async findOne(id: number) {
    const { productId, operatorId, outboundId, inboundId } = await this.commonService.getEntityById<Move>(PrismaModel.move, id)
    try {
      const product = await this.prisma.product.findUnique({
        where: {
          id: productId
        }
      })
      const operator = await this.prisma.supplier.findUnique({
        where: {
          id: operatorId
        }
      })
      const outbound = await this.prisma.warehouse.findUnique({
        where: {
          id: outboundId
        }
      })
      const inbound = await this.prisma.warehouse.findUnique({
        where: {
          id: inboundId
        }
      })
      return {
        tip: "成功获取调仓记录",
        id,
        product,
        operator,
        outbound,
        inbound
      }
    }
    catch(error) {
      throw new HttpException({
        tip: "PRISMA 未知错误",
        error
      }, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  // SERVICE - UPDATE MOVE(修改调仓记录)
  async update(id: number, updateMoveDto: UpdateMoveDto) {
    const { productId, operatorId, outboundId, inboundId } = updateMoveDto
    await this.commonService.getEntityById<Order>(PrismaModel.order, id)
    await this.commonService.getEntityById<User>(PrismaModel.user, operatorId)
    await this.commonService.getEntityById<Product>(PrismaModel.product, productId)
    await this.commonService.getEntityById<Warehouse>(PrismaModel.warehouse, outboundId)
    await this.commonService.getEntityById<Warehouse>(PrismaModel.warehouse, inboundId)
    try {
      const move = await this.prisma.move.update({
        where: {
          id
        },
        data: {
          productId,
          operatorId,
          outboundId,
          inboundId
        }
      })
      return {
        tip: "成功修改调仓记录",
        move
      }
    }
    catch(error) {
      throw new HttpException({
        tip: "PRISMA 未知错误",
        error
      }, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  // SERVICE - DELETE MOVE(删除调仓记录)
  async remove(id: number) {
    await this.commonService.getEntityById<Move>(PrismaModel.move, id)
    try {
      const result = await this.prisma.move.delete({
        where: {
          id
        }
      })
      return {
        tip: "成功删除调仓记录",
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
