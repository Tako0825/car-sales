import { Injectable } from '@nestjs/common';
import { CreateWarehouseDto } from './dto/create-warehouse.dto';
import { UpdateWarehouseDto } from './dto/update-warehouse.dto';
import { Warehouse } from '@prisma/client';
import { CommonService } from 'src/common/common.service';
import { PrismaModel } from 'src/common/enum/PrismaModel';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { ResponseData } from 'src/common/class/response.data';

@Injectable()
export class WarehouseService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly commonService: CommonService
  ) {}

  // SERVICE - CREATE WAREHOUSE(创建仓库)
  async create(createWarehouseDto: CreateWarehouseDto) {
    const { location } = createWarehouseDto
    return await this.commonService.handlePrismaExecution<ResponseData>(async() => {
      const warehouse = await this.prisma.warehouse.create({
        data: {
          location
        }
      })
      return {
        tip: "成功创建仓库",
        warehouse
      }
    })
  }

  // SERVICE - PAGING QUERY WAREHOUSE(分页查询仓库)
  async findPage(page: number, pageSize: number) {
    return await this.commonService.handlePrismaExecution<Record<string, any>>(async () => {
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

  // SERVICE - QUERY ALL WAREHOUSE(查询所有仓库)
  async findAll() {
    return await this.commonService.handlePrismaExecution<Record<string, any>>(async () => {
      return await this.prisma.warehouse.findMany()
    })
  }

  // SERVICE - QUERY SPECIFIED WAREHOUSE(查询指定的仓库)
  async findOne(id: number) {
    const warehouse = await this.commonService.getEntityById<Warehouse>(PrismaModel.warehouse, id)
    return { warehouse }
  }

  // SERVICE - QUERY SPECIFIED WAREHOUSE'S INVENTORY(查询指定的仓库库存)
  async findInventory(id: number) {
    await this.commonService.getEntityById<Warehouse>(PrismaModel.warehouse, id)
    return await this.commonService.handlePrismaExecution<any>(async() => {
      const warehouseList = await this.prisma.$queryRaw`
        SELECT Product.id, Product.name, Product.model
        FROM Inventory 
        INNER JOIN Product 
        ON Inventory.productId = Product.id 
        WHERE Inventory.warehouseId = ${id} 
        AND Inventory.quantity > 0 
        ORDER BY Product.id ASC
      ` 
      return warehouseList
    })
  }

  // SERVICE - UPDATE WAREHOUSE(修改仓库信息)
  async update(id: number, updateWarehouseDto: UpdateWarehouseDto) {
    await this.commonService.getEntityById<Warehouse>(PrismaModel.warehouse, id)
    return await this.commonService.handlePrismaExecution<ResponseData>(async() => {
      const { location } = updateWarehouseDto
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
    })
  }

  // SERVICE - DELETE WAREHOUSE(删除仓库)
  async remove(id: number) {
    await this.commonService.getEntityById<Warehouse>(PrismaModel.warehouse, id)
    return await this.commonService.handlePrismaExecution<ResponseData>(async () => {
      const result = await this.prisma.$transaction(async () => {
        // 1.删除 WAREHOUSE - 前置条件: 删除 SUPPLY & ORDER & INVENTORY
        const supplyCount = await this.prisma.supply.deleteMany({
          where: { warehouseId: id }
        })
        const orderCount = await this.prisma.order.deleteMany({
          where: { warehouseId: id }
        })
        const inventoryCount = await this.prisma.inventory.deleteMany({
          where: { warehouseId: id }
        })
        await this.prisma.warehouse.delete({
          where: { id }
        })
        return {
          supplyCount,
          orderCount,
          inventoryCount
        }
      })
      return {
        tip: "成功删除仓库",
        ...result
      }
    })
  }
}
