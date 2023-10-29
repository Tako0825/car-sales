import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { LoginDto } from './dto/login.dto';
import { createHash } from 'crypto';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private jwt:JwtService
    ) {}

    // SERVICE - REGISTER(注册)
    async register(registerDto:RegisterDto) {
        let { username, password, phone, role } = registerDto
        try {
            let user = await this.prisma.user.create({
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
