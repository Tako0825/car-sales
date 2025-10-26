import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { CommonService } from 'src/common/common.service';
import { PrismaModel } from 'src/common/enum/PrismaModel';
import { user } from '@prisma/client';
import { ResponseData } from 'src/common/class/response.data';
import { createHash } from 'crypto';
import { UpdatePasswordDto } from './dto/update-password.dto';

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly commonService: CommonService,
  ) {}

  // SERVICE - PAGING QUERY USER(分页查询用户)
  async findPage(page: number, pageSize: number) {
    return await this.commonService.handlePrismaExecution<Record<string, any>>(
      async () => {
        // 用户总数
        const userTotal = await this.prisma.user.count();
        // 分页总数
        const pageTotal = Math.ceil(userTotal / pageSize);
        // 当前页数据
        const userList = await this.prisma.user.findMany({
          skip: (page - 1) * pageSize,
          take: pageSize,
          select: {
            id: true,
            avatar: true,
            username: true,
            phone: true,
            joined_date: true,
            address: true,
            role: true,
          },
        });
        // 当前页数据数目
        const count = userList.length;
        return {
          page,
          count,
          pageTotal,
          userTotal,
          userList,
        };
      },
    );
  }

  // SERVICE - QUERY ALL USER(查询所有用户)
  async findAll() {
    return await this.commonService.handlePrismaExecution<Record<string, any>>(
      async () => {
        return await this.prisma.user.findMany();
      },
    );
  }

  // SERVICE - QUERY SPECIFIED USER(查询指定的用户)
  async findOne(id: number) {
    await this.commonService.getEntityById<user>(PrismaModel.user, id);
    return await this.commonService.handlePrismaExecution<Record<string, any>>(
      async () => {
        const { avatar, username, phone, role, joined_date, address } =
          await this.commonService.getEntityById<user>(PrismaModel.user, id);
        return {
          user: {
            id,
            avatar,
            username,
            phone,
            role,
            joined_date,
            address,
          },
        };
      },
    );
  }

  // SERVICE - QUERY SPECIFIED USER BY PHONE(根据电话查询指定的用户)
  async findOneByPhone(phone: string) {
    return await this.commonService.handlePrismaExecution<any>(async () => {
      const user = await this.prisma.user.findUnique({
        where: {
          phone,
        },
      });
      return user ? true : false;
    });
  }

  // SERVICE - UPDATE USER(修改用户信息)
  async update(id: number, updateUserDto: UpdateUserDto) {
    await this.commonService.getEntityById<user>(PrismaModel.user, id);
    return await this.commonService.handlePrismaExecution<ResponseData>(
      async () => {
        const { phone, username, role, address, joined_date } = updateUserDto;
        await this.prisma.user.update({
          where: {
            id,
          },
          data: {
            phone,
            username,
            role,
            address,
            joined_date,
          },
        });
        return {
          tip: '成功修改用户信息',
        };
      },
    );
  }
  // SERVICE - UPDATE PASSWORD(修改用户密码)
  async updateAvatar(id: number, updateUserDto: UpdateUserDto) {
    await this.commonService.getEntityById<user>(PrismaModel.user, id);
    return await this.commonService.handlePrismaExecution<ResponseData>(
      async () => {
        const { avatar } = updateUserDto;
        await this.prisma.user.update({
          where: {
            id,
          },
          data: {
            avatar,
          },
        });
        return {
          tip: '成功修改用户头像',
        };
      },
    );
  }

  // SERVICE - UPDATE PASSWORD(修改用户密码)
  async updatePassword(id: number, updatePasswordDto: UpdatePasswordDto) {
    await this.commonService.getEntityById<user>(PrismaModel.user, id);
    return await this.commonService.handlePrismaExecution<any>(async () => {
      // 情况 1
      if (updatePasswordDto.password !== updatePasswordDto.passwordConfirmed) {
        return {
          success: false,
          message: '新密码与确认密码必须保持一致',
        };
      }
      // 密码哈希加密
      const hash = createHash('sha256')
        .update(updatePasswordDto.originalPassword)
        .digest('hex');
      const user = await this.prisma.user.findUnique({
        where: { id },
      });
      // 情况 2
      if (hash !== user.password) {
        return {
          success: false,
          message: '原密码错误',
        };
      }
      // 情况 3
      await this.prisma.user.update({
        where: { id },
        data: {
          password: createHash('sha256')
            .update(updatePasswordDto.password)
            .digest('hex'),
        },
      });
      return {
        tip: '成功修改密码',
        success: true,
      };
    });
  }

  // SERVICE - DELETE USER(删除用户)
  async remove(id: number) {
    await this.commonService.getEntityById<user>(PrismaModel.user, id);
    return await this.commonService.handlePrismaExecution<ResponseData>(
      async () => {
        // 1.删除 USER - 前置条件: 删除 ORDER
        const result = await this.prisma.$transaction(async (prisma) => {
          const orderCount = await prisma.order.deleteMany({
            where: {
              userId: id,
            },
          });
          await prisma.user.delete({
            where: {
              id,
            },
          });
          return {
            orderCount,
          };
        });
        return {
          tip: '成功删除用户',
          ...result,
        };
      },
    );
  }
}
