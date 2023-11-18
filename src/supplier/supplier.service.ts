import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';
import { Supplier } from '@prisma/client';
import { CommonService } from 'src/common/common.service';
import { PrismaModel } from 'src/common/enum/PrismaModel';
import { PrismaService } from 'src/common/prisma/prisma.service';

@Injectable()
export class SupplierService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly commonService: CommonService
  ) {}

  // SERVICE - CREATE SUPPLIER(创建供应商)
  async create(createSupplierDto: CreateSupplierDto) {
    const { name, phone, company } = createSupplierDto
    try {
      const supplier = await this.prisma.supplier.create({
        data: {
          name,
          phone,
          company
        }
      })
      return {
        tip: "成功创建供应商",
        supplier
      }
    }
    catch(error) {
      throw new HttpException({
        tip: "PRISMA 未知错误",
        error
      }, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  // SERVICE - PAGING QUERY SUPPLIER(分页查询供应商)
  async findPage(page: number, pageSize: number) {
    // 产品总数
    const supplierTotal = await this.prisma.supplier.count()
    // 分页总数
    const pageTotal = Math.ceil(supplierTotal / pageSize)
    // 当前页数据
    const supplierList =  await this.prisma.supplier.findMany({
      skip: (page - 1) * pageSize,
      take: pageSize
    })
    // 当前页数据数目
    const count = supplierList.length
    return {
      page,
      count,
      pageTotal,
      supplierTotal,
      supplierList
    }
  }

  // SERVICE - QUERY ALL SUPPLIER(查询所有供应商)
  async findAll() {
    return this.commonService.handlePrismaExecution<Record<string, any>>(async () => {
      return await this.prisma.supplier.findMany()
    })
  }

  // SERVICE - QUERY SPECIFIED SUPPLIER(查询指定的供应商)
  async findOne(id: number) {
    const supplier = await this.commonService.getEntityById<Supplier>(PrismaModel.supplier, id)
    return {
      supplier
    }
  }

  // SERVICE - UPDATE SUPPLIER(修改供应商信息)
  async update(id: number, updateSupplierDto: UpdateSupplierDto) {
    await this.commonService.getEntityById<Supplier>(PrismaModel.supplier, id)
    const { name, phone, company } = updateSupplierDto
    try {
      const supplier = await this.prisma.supplier.update({
        where: {
          id
        },
        data: {
          name,
          phone,
          company
        }
      })
      return {
        tip: "成功修改供应商信息",
        supplier
      }
    }
    catch(error) {
      throw new HttpException({
        tip: "PRISMA 未知错误",
        error
      }, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  // SERVICE - DELETE SUPPLIER(删除供应商)
  async remove(id: number) {
    await this.commonService.getEntityById<Supplier>(PrismaModel.supplier, id)
    try {
      const result = await this.prisma.$transaction(async (prisma) => {
        // 1.删除 SUPPLIER -前置条件: 删除 SUPPLY
        await prisma.supply.deleteMany({
          where: {
            supplierId: id
          }
        })
        await prisma.supplier.deleteMany({
          where: {
            id
          }
        })
      })
      return {
        tip: "成功删除供应商",
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
