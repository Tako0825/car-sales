import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModel } from './enum/PrismaModel';

@Injectable()
export class CommonService {
  constructor(private prisma: PrismaService) {}

  // TRY TO SELECT DATA BY ID
  async getEntityById<T>(model: PrismaModel, id: number): Promise<T> {
    try {
      const entity = await (this.prisma[model] as any).findUnique({
        where: {
          id,
        },
      });
      if (!entity) {
        throw new Error();
      } else return entity;
    } catch (error) {
      throw new HttpException(
        {
          tip: '请提供有效的 id',
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }

  // TRY TO USE PRISMA
  async handlePrismaExecution<T>(callback: () => Promise<T>) {
    try {
      return await callback();
    } catch (error) {
      throw new HttpException(
        {
          tip: 'PRISMA 发生错误',
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
