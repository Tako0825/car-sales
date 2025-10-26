import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { product } from '@prisma/client';
import { CommonService } from 'src/common/common.service';
import { PrismaModel } from 'src/common/enum/PrismaModel';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { ResponseData } from 'src/common/class/response.data';

@Injectable()
export class ProductService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly commonService: CommonService,
  ) {}

  // SERVICE - CREATE PRODUCT(创建产品)
  async create(createProductDto: CreateProductDto) {
    const { name, model, price, poster, introduce } = createProductDto;
    return await this.commonService.handlePrismaExecution<ResponseData>(
      async () => {
        const product = await this.prisma.product.create({
          data: {
            name,
            model,
            price: +price,
            introduce,
            poster,
          },
        });
        return {
          tip: '成功创建产品',
          product,
        };
      },
    );
  }

  // SERVICE - PAGING QUERY PRODUCT(分页查询产品)
  async findPage(page: number, pageSize: number) {
    return await this.commonService.handlePrismaExecution<Record<string, any>>(
      async () => {
        // 产品总数
        const productTotal = await this.prisma.product.count();
        // 分页总数
        const pageTotal = Math.ceil(productTotal / pageSize);
        // 当前页数据
        const productList = await this.prisma.product.findMany({
          skip: (page - 1) * pageSize,
          take: pageSize,
        });
        // 当前页数据数目
        const count = productList.length;
        // 并发收集汽车相应销量
        let source = new Array();
        const promise = productList.map(async (product, index) => {
          const { id } = product;
          return {
            ...product,
            sales: await this.prisma.order.count({
              where: {
                productId: id,
              },
            }),
          };
        });
        source = await Promise.all(promise);
        return {
          page,
          count,
          pageTotal,
          productTotal,
          source,
        };
      },
    );
  }

  // SERVICE - QUERY ALL PRODUCT(查询所有产品)
  async findAll() {
    return await this.commonService.handlePrismaExecution<Record<string, any>>(
      async () => {
        return await this.prisma.product.findMany();
      },
    );
  }

  // SERVICE - QUERY SPECIFIED PRODUCT(查询指定的产品)
  async findOne(id: number) {
    return await this.commonService.handlePrismaExecution<Record<string, any>>(
      async () => {
        const product = await this.commonService.getEntityById<product>(
          PrismaModel.product,
          id,
        );
        const pie = await this.prisma.$queryRaw`
        SELECT CONCAT(Inventory.quantity, '') AS value, 
        warehouse.location AS name 
        FROM Inventory 
        INNER JOIN warehouse 
        ON Inventory.warehouseId = warehouse.id 
        WHERE Inventory.productId = ${id}
        AND Inventory.quantity > 0;
      `;
        const gradientBar: Array<{ year: string; total: string }> = await this
          .prisma.$queryRaw`
        SELECT YEAR(createtime) AS year,
        CONCAT(COUNT(*), '') AS total
        FROM \`order\` AS o
        GROUP BY productId, YEAR(createtime)
        HAVING productId = ${id}
        ORDER BY year ASC
      `;
        return {
          product,
          pie,
          gradientBarX: gradientBar.map((item) => item.year.toString()),
          gradientBarY: gradientBar.map((item) => +item.total),
        };
      },
    );
  }

  // SERVICE - QUERY SPECIFIED PRODUCT'S INVENTORY(查询指定的产品库存)
  async findInventory(id: number) {
    await this.commonService.getEntityById<product>(PrismaModel.product, id);
    return await this.commonService.handlePrismaExecution<any>(async () => {
      const productList = await this.prisma.$queryRaw` 
        SELECT warehouse.id, warehouse.location 
        FROM Inventory 
        INNER JOIN warehouse 
        ON Inventory.warehouseId = warehouse.id 
        WHERE Inventory.productId = ${id} 
        AND Inventory.quantity > 0 
        ORDER BY warehouse.id ASC 
      `;
      return productList;
    });
  }

  // SERVICE - UPDATE PRODUCT(修改产品信息)
  async update(id: number, updateProductDto: UpdateProductDto) {
    await this.commonService.getEntityById<product>(PrismaModel.product, id);
    const { name, model, price, introduce } = updateProductDto;
    return await this.commonService.handlePrismaExecution<ResponseData>(
      async () => {
        const product = await this.prisma.product.update({
          where: {
            id,
          },
          data: {
            name,
            model,
            price: +price,
            introduce,
          },
        });
        return {
          tip: '成功修改产品信息',
          product,
        };
      },
    );
  }

  // SERVICE - DELETE PRODUCT(删除产品)
  async remove(id: number) {
    await this.commonService.getEntityById<product>(PrismaModel.product, id);
    return await this.commonService.handlePrismaExecution<ResponseData>(
      async () => {
        const result = await this.prisma.$transaction(async () => {
          // 1.删除 PRODUCT -前置条件: 删除 ORDER & SUPPLY & INVENTORY
          const orderCount = await this.prisma.order.deleteMany({
            where: { productId: id },
          });
          const supplyCount = await this.prisma.supply.deleteMany({
            where: { productId: id },
          });
          const inventoryCount = await this.prisma.inventory.deleteMany({
            where: { productId: id },
          });
          await this.prisma.product.delete({
            where: { id },
          });
          return {
            orderCount,
            supplyCount,
            inventoryCount,
          };
        });
        return {
          tip: '成功删除产品',
          ...result,
        };
      },
    );
  }
}
