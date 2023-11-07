import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { LoginDto } from './dto/login.dto';
import { createHash } from 'crypto';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { CommonService } from 'src/common/common.service';
import { ResponseData } from 'src/common/class/response.data';

@Injectable()
export class AuthService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly jwt: JwtService,
        private readonly commonService: CommonService
    ) {}

    // SERVICE - REGISTER(注册)
    async register(registerDto:RegisterDto) {
        let { username, password, phone, role, joined_date, address } = registerDto
        if(await this.prisma.user.findUnique({
            where: {
                phone
            }
        })) {
            throw new HttpException({
                tip: "该电话号码已被注册",
            }, HttpStatus.UNPROCESSABLE_ENTITY)
        }
        return this.commonService.handlePrismaExecution<ResponseData>(async () => {
            const user = await this.prisma.user.create({
                data: {
                    username,
                    password: createHash("sha256").update(password).digest("hex"),
                    phone,
                    role,
                    joined_date,
                    address
                }
            })
            return {
                tip: "注册成功",
                user
            }
        })
    } 

    // SERVICE - LOGIN(登录)
    async login(loginDto:LoginDto) {
        const { phone, password: loginPassword } = loginDto
        try {
            const { id, username, password, role } = await this.prisma.user.findUnique({
                where: {
                    phone
                },
                select: {
                    id: true,
                    username: true,
                    password: true,
                    phone: true,
                    role: true
                }
            })
            const hash = createHash("sha256").update(loginPassword).digest("hex")
            if(hash === password) {
                // GENERATE TOKEN
                const token = await this.jwt.signAsync({
                    params: {
                        phone,
                        hash
                    },
                    sign: process.env.SECRET_OR_KEY
                })
                return {
                    tip: "登录成功",
                    user: {
                        id,
                        username,
                        phone,
                        role
                    },
                    token
                }
            }
        }catch(error) {
            throw new HttpException({
                tip: 'PRISMA 未知错误',
                error
            }, HttpStatus.INTERNAL_SERVER_ERROR)
        }
        throw new HttpException({
            tip: '电话号码与密码不匹配',
        }, HttpStatus.UNPROCESSABLE_ENTITY)
    }

    // SEVICE - AUTOMATIC LOGIN(自动登录)
    async autoLogin(user:User) {
        const { id, username, phone, role } = user
        return {
            tip: "自动登录成功",
            user: {
                id,
                username,
                phone,
                role
            }
        }
    }
}
