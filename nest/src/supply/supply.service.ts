import { Injectable } from '@nestjs/common';
import { CreateSupplyDto } from './dto/create-supply.dto';
import { UpdateSupplyDto } from './dto/update-supply.dto';
import { Product, Supplier, Supply, Warehouse } from '@prisma/client';
import { CommonService } from 'src/common/common.service';
import { PrismaModel } from 'src/common/enum/PrismaModel';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { ResponseData } from 'src/common/class/response.data';

@Injectable()
export class SupplyService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly commonService: CommonService,
  ) {}

  // SERVICE - CREATE SUPPLY(创建供应记录)
  async create(createSupplyDto: CreateSupplyDto) {
    const { quantity, supplierId, productId, warehouseId, createtime } =
      createSupplyDto;
    await this.commonService.getEntityById<Supplier>(
      PrismaModel.supplier,
      supplierId,
    );
    await this.commonService.getEntityById<Product>(
      PrismaModel.product,
      productId,
    );
    await this.commonService.getEntityById<Warehouse>(
      PrismaModel.warehouse,
      warehouseId,
    );
    return await this.commonService.handlePrismaExecution<ResponseData>(
      async () => {
        const supply = await this.prisma.supply.create({
          data: {
            quantity,
            supplierId,
            productId,
            warehouseId,
            createtime,
          },
        });
        return {
          tip: '成功创建供应记录',
          supply,
        };
      },
    );
  }

  // SERVICE - PAGING QUERY SUPPLY(分页查询供应记录)
  async findPage(page: number, pageSize: number) {
    return await this.commonService.handlePrismaExecution<Record<string, any>>(
      async () => {
        // 产品总数
        const supplyTotal = await this.prisma.supply.count();
        // 分页总数
        const pageTotal = Math.ceil(supplyTotal / pageSize);
        // 当前页数据
        const supplyList = await this.prisma.supply.findMany({
          skip: (page - 1) * pageSize,
          take: pageSize,
        });
        // 数据聚合
        const data = await Promise.all(
          supplyList.map(async (supply) => {
            const { id, quantity, supplierId, productId, warehouseId } = supply;
            const supplier = await this.prisma.supplier.findUnique({
              where: {
                id: supplierId,
              },
            });
            const product = await this.prisma.product.findUnique({
              where: {
                id: productId,
              },
            });
            const warehouse = await this.prisma.warehouse.findUnique({
              where: {
                id: warehouseId,
              },
            });
            return {
              id,
              quantity,
              supplier: supplier.company,
              brand: product.name,
              model: product.model,
              warehouse: warehouse.location,
            };
          }),
        );

        // 当前页数据数目
        const count = supplyList.length;
        return {
          page,
          count,
          pageTotal,
          supplyTotal,
          supplyList: data,
        };
      },
    );
  }

  // SERVICE - QUERY SPECIFIED SUPPLY(查询指定的供应记录)
  async findOne(id: number) {
    const { quantity, supplierId, productId, warehouseId } =
      await this.commonService.getEntityById<Supply>(PrismaModel.supply, id);
    return await this.commonService.handlePrismaExecution<Record<string, any>>(
      async () => {
        const supplier = await this.prisma.supplier.findUnique({
          where: {
            id: supplierId,
          },
        });
        const product = await this.prisma.product.findUnique({
          where: {
            id: productId,
          },
        });
        const warehouse = await this.prisma.warehouse.findUnique({
          where: {
            id: warehouseId,
          },
        });
        return {
          id,
          quantity,
          supplier,
          product,
          warehouse,
        };
      },
    );
  }

  // SERVICE - UPDATE SUPPLY(修改仓库信息)
  async update(id: number, updateSupplyDto: UpdateSupplyDto) {
    const { quantity, supplierId, productId, warehouseId } = updateSupplyDto;
    await this.commonService.getEntityById<Supply>(PrismaModel.supply, id);
    await this.commonService.getEntityById<Supplier>(
      PrismaModel.supplier,
      supplierId,
    );
    await this.commonService.getEntityById<Product>(
      PrismaModel.product,
      productId,
    );
    await this.commonService.getEntityById<Warehouse>(
      PrismaModel.warehouse,
      warehouseId,
    );
    return await this.commonService.handlePrismaExecution<ResponseData>(
      async () => {
        const supply = await this.prisma.supply.update({
          where: {
            id,
          },
          data: {
            quantity,
            supplierId,
            productId,
            warehouseId,
          },
        });
        return {
          tip: '成功修改供应记录',
          supply,
        };
      },
    );
  }

  // SERVICE - DELETE SUPPLY(删除供应记录)
  async remove(id: number) {
    await this.commonService.getEntityById<Supply>(PrismaModel.supply, id);
    return await this.commonService.handlePrismaExecution<ResponseData>(
      async () => {
        await this.prisma.supply.delete({
          where: {
            id,
          },
        });
        return {
          tip: '成功删除供应记录',
        };
      },
    );
  }
}
