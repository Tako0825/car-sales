import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateWarehouseDto } from './dto/create-warehouse.dto';
import { UpdateWarehouseDto } from './dto/update-warehouse.dto';
import { Warehouse } from '@prisma/client';
import { CommonService } from 'src/common/common.service';
import { PrismaModel } from 'src/common/enum/PrismaModel';
import { PrismaService } from 'src/common/prisma/prisma.service';

@Injectable()
export class WarehouseService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly commonService: CommonService
  ) {}

  // SERVICE - CREATE WAREHOUSE(创建仓库)
  async create(createWarehouseDto: CreateWarehouseDto) {
    const { location } = createWarehouseDto
    try {
      const warehouse = await this.prisma.warehouse.create({
        data: {
          location
        }
      })
      return {
        tip: "成功创建仓库",
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

  // SERVICE - PAGING QUERY WAREHOUSE(分页查询仓库)
  async findPage(page: number, pageSize: number) {
    return this.commonService.handlePrismaExecution<Record<string, any>>(async () => {
      // 产品总数
      const warehouseTotal = await this.prisma.warehouse.count()
      // 分页总数
      const pageTotal = Math.ceil(warehouseTotal / pageSize)
      // 当前页数据
      const warehouseList =  await this.prisma.warehouse.findMany({
        skip: (page - 1) * pageSize,
        take: pageSize
      })
      // 当前页数据数目
      const count = warehouseList.length
      return {
        page,
        count,
        pageTotal,
        warehouseTotal,
        warehouseList
      }
    })
  }

  // SERVICE - QUERY SPECIFIED WAREHOUSE(查询指定的仓库)
  async findOne(id: number) {
    const warehouse = await this.commonService.getEntityById<Warehouse>(PrismaModel.warehouse, id)
    return {
      tip: `成功获取指定供应商`,
      warehouse
    }
  }

  // SERVICE - UPDATE WAREHOUSE(修改仓库信息)
  async update(id: number, updateWarehouseDto: UpdateWarehouseDto) {
    await this.commonService.getEntityById<Warehouse>(PrismaModel.warehouse, id)
    const { location } = updateWarehouseDto
    try {
      const warehouse = await this.prisma.warehouse.update({
        where: {
          id
        },
        data: {
          location
        }
      })
      return {
        tip: "成功修改仓库信息",
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

  // SERVICE - DELETE WAREHOUSE(删除仓库)
  async remove(id: number) {
    await this.commonService.getEntityById<Warehouse>(PrismaModel.warehouse, id)
    try {
      const result = await this.prisma.$transaction(async (prisma) => {
        // 1.删除 WAREHOUSE -前置条件: 删除 SUPPLY & MOVE
        await prisma.move.deleteMany({
          where: {
            OR: [
              {
                inboundId: id
              },
              {
                outboundId: id
              }
            ]
          }
        })
        await prisma.supply.deleteMany({
          where: {
            warehouseId: id
          }
        })
        await prisma.warehouse.delete({
          where: {
            id
          }
        })
      })
      return {
        tip: "成功删除仓库",
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
