import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { LoginDto } from './dto/login.dto';
import { CommonService } from 'src/common/common.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly prisma:PrismaService,
        private readonly commonService:CommonService
    ) {}

    // 服务 - 注册
    async register(registerDto:RegisterDto) {
        let { username, password, phone, role } = registerDto
        try {
            let user = await this.prisma.user.create({
                data: {
                    username,
                    password,
                    phone,
                    role
                },
                select: {
                    username: true,
                    password: true,
                    phone: true,
                    role: true
                }
            })
            return {
                tip: "注册成功",
                user
            }
        } catch(error) {
            if(await this.prisma.user.findUnique({
                where: {
                    phone
                }
            })) {
                throw new HttpException({
                    tip: "电话号码与密码不匹配",
                }, HttpStatus.UNPROCESSABLE_ENTITY)
            }
            throw new HttpException({
                tip: "注册失败",
                error
            }, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    } 

    
    // 服务 - 登录
    async login(loginDto:LoginDto) {
        const { phone, password } = loginDto
        try {
            let user = await this.prisma.user.findUnique({
                where: {
                    phone
                },
                select: {
                    username: true,
                    password: true,
                    phone: true,
                    role: true
                }
            })
            if(password===user.password) {
                return {
                    tip: "登录成功",
                    user
                }
            }
        }catch(error) {
            throw new HttpException({
                tip: '登录失败',
                meta: '未知错误'
            }, HttpStatus.INTERNAL_SERVER_ERROR)
        }
        throw new HttpException({
            tip: '登录失败',
            meta: '电话号码与密码不匹配'
        }, HttpStatus.UNPROCESSABLE_ENTITY)
    }
}
