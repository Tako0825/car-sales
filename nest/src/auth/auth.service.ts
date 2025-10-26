import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { LoginDto } from './dto/login.dto';
import { createHash } from 'crypto';
import { JwtService } from '@nestjs/jwt';
import { user } from '@prisma/client';
import { CommonService } from 'src/common/common.service';
import { ResponseData } from 'src/common/class/response.data';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService,
    private readonly commonService: CommonService,
  ) {}

  // SERVICE - REGISTER(注册)
  async register(registerDto: RegisterDto) {
    let { username, password, phone, role, joined_date, address, avatar } =
      registerDto;
    if (
      await this.prisma.user.findUnique({
        where: {
          phone,
        },
      })
    ) {
      throw new HttpException(
        {
          tip: '该电话号码已被注册',
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    return this.commonService.handlePrismaExecution<ResponseData>(async () => {
      const user = await this.prisma.user.create({
        data: {
          username,
          password: createHash('sha256').update(password).digest('hex'),
          phone,
          role,
          joined_date,
          address,
          avatar,
        },
      });
      return {
        tip: '注册成功',
        user,
      };
    });
  }

  // SERVICE - LOGIN(登录)
  async login(loginDto: LoginDto) {
    try {
      const user: user = await this.prisma.user.findUnique({
        where: {
          phone: loginDto.phone,
        },
      });
      const { phone, password } = user;
      const hash = createHash('sha256').update(loginDto.password).digest('hex');
      if (hash === password) {
        // GENERATE TOKEN
        const token = await this.jwt.signAsync({
          params: {
            phone,
            password,
          },
          sign: process.env.SECRET_OR_KEY,
        });
        return {
          tip: '登录成功',
          user,
          token,
        };
      }
    } catch (error) {
      throw new HttpException(
        {
          tip: '手机号不存在',
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    throw new HttpException(
      {
        tip: '手机号与密码不匹配',
      },
      HttpStatus.UNPROCESSABLE_ENTITY,
    );
  }

  // SEVICE - AUTOMATIC LOGIN(自动登录)
  async autoLogin(user: user) {
    return { user };
  }
}
