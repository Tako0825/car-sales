import { Injectable } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { PrismaService } from 'src/common/prisma/prisma.service';

@Injectable()
export class AuthService {
    constructor(private readonly prisma:PrismaService) {}

    // 服务 - 登录
    async login() {

    }

    // 服务 - 注册
    async register(registerDto:RegisterDto) {
        let user = await this.prisma.user.create({
            data: {
                username: registerDto.username,
                password: registerDto.password,
                phone: registerDto.phone,
                role: registerDto.role
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
    } 

}
