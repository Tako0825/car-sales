import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { CommonService } from 'src/common/common.service';
import { PrismaModel } from 'src/common/enum/PrismaModel';
import { User } from '@prisma/client';
import { createHash } from 'crypto';

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly commonService: CommonService
  ) {}

  // SERVICE - PAGING QUERY USER(分页查询用户)
  async findPage(page: number, pageSize: number) {
    // 用户总数
    const userTotal = await this.prisma.user.count()
    // 分页总数
    const pageTotal = Math.ceil(userTotal / pageSize)
    // 当前页数据
    const userList =  await this.prisma.user.findMany({
      skip: (page - 1) * pageSize,
      take: pageSize,
      select: {
        username: true,
        phone: true,
        role: true
      }
    })
    // 当前页数据数目
    const count = userList.length
    return {
      tip: `成功获取第 ${page} 页共 ${count} 条数据`,
      page,
      count,
      pageTotal,
      userTotal,
      userList
    }
  }

  // SERVICE - QUERY SPECIFIED USER(查询指定的用户)
  async findOne(id: number) {
    const { username, phone, role } = await this.commonService.getEntityById<User>(PrismaModel.user, id)
    return {
      tip: `成功获取指定用户`,
      user: {
        id,
        username,
        phone,
        role
      }
    }
  }

  // SERVICE - UPDATE USER(修改用户信息)
  async update(id: number, updateUserDto: UpdateUserDto) {
    const { username, password, phone, role } = updateUserDto
    await this.commonService.getEntityById<User>(PrismaModel.user, id)
    try {
      const user = await this.prisma.user.update({
        where: {
          id
        },
        data: {
          username,
          password: createHash("sha256").update(password).digest("hex"),
          phone,
          role
        },
        select: {
          id: true,
          username: true,
          phone: true,
          role: true
        }
      })
      return {
        tip: "成功更新用户信息",
        user
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
      const result = await this.prisma.$transaction(async (prisma) => {
        await prisma.move.deleteMany({
          where: {
            operatorId: id
          }
        })
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