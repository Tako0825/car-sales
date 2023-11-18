import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { CommonService } from 'src/common/common.service';
import { PrismaModel } from 'src/common/enum/PrismaModel';
import { Prisma, User } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly commonService: CommonService
  ) {}

  // SERVICE - PAGING QUERY USER(分页查询用户)
  async findPage(page: number, pageSize: number) {
    return await this.commonService.handlePrismaExecution<any>(async () => {
      // 用户总数
      const userTotal = await this.prisma.user.count()
      // 分页总数
      const pageTotal = Math.ceil(userTotal / pageSize)
      // 当前页数据
      const userList =  await this.prisma.user.findMany({
        skip: (page - 1) * pageSize,
        take: pageSize,
        select: {
          id: true,
          avatar: true,
          username: true,
          phone: true,
          joined_date: true,
          address: true,
          role: true
        }
      })
      // 当前页数据数目
      const count = userList.length
      return {
        page,
        count,
        pageTotal,
        userTotal,
        userList
      }
    })
  }

  // SERVICE - QUERY ALL USER(查询所有用户)
  async findAll() {
    return this.commonService.handlePrismaExecution<Record<string, any>>(async () => {
      return await this.prisma.user.findMany()
    })
  }

  // SERVICE - QUERY SPECIFIED USER(查询指定的用户)
  async findOne(id: number) {
    await this.commonService.getEntityById<User>(PrismaModel.user, id)
    return await this.commonService.handlePrismaExecution<Record<string, any>>(async () => {
      const { avatar, username, phone, role, joined_date, address } = await this.commonService.getEntityById<User>(PrismaModel.user, id)
      return {
        user: {
          id,
          avatar,
          username,
          phone,
          role,
          joined_date,
          address
        }
      }
    })
  }

  // SERVICE - QUERY SPECIFIED USER BY PHONE(根据电话查询指定的用户)
  async findOneByPhone(phone: string) {
    return await this.commonService.handlePrismaExecution<any>(async () => {
      const user = await this.prisma.user.findUnique({
        where: {
          phone
        }
      })
      return user ? true : false
    })
  }

  // SERVICE - UPDATE USER(修改用户信息)
  async update(id: number, updateUserDto: UpdateUserDto) {
    await this.commonService.getEntityById<User>(PrismaModel.user, id)
    try {
      const { phone, username, role, address, joined_date, avatar } = updateUserDto
      const user = await this.prisma.user.update({
        where: {
          id
        },
        data: {
          phone, username, role, address, joined_date, avatar
        }
      })
      return {
        tip: "成功修改用户信息"
      }
    }catch(error) {
      throw new HttpException({
        tip: "PRISMA 未知错误",
        error
      }, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  // SERVICE - DELETE USER(删除用户)
  async remove(id: number) {
    await this.commonService.getEntityById<User>(PrismaModel.user, id)
    try {
      // 1.删除 USER - 前置条件: 删除 ORDER
      const result = await this.prisma.$transaction(async (prisma) => {
        await prisma.order.deleteMany({
          where: {
            userId: id
          }
        })
        await prisma.user.delete({
          where: {
            id
          }
        })
      })
      return {
        tip: "成功删除用户",
        result
      }
    }catch(error) {
      throw new HttpException({
        tip: "PRISMA 未知错误",
        error
      }, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
}
