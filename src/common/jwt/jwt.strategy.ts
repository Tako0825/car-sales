import { PassportStrategy } from "@nestjs/passport"
import { PrismaService } from "src/common/prisma/prisma.service"
import { Strategy, ExtractJwt } from "passport-jwt"

export class JwtStrategy extends PassportStrategy(Strategy,"jwt") {
    constructor(
        private prisma = new PrismaService()
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.SECRET_OR_KEY
        })
    }

    // 通过身份验证后, 执行 validate() 方法返回用户信息
    async validate(payload: any) {
        // 根据 openid 查询用户信息
        const { id } = payload.params;
        const user = await this.prisma.user.findFirst({
            where: {
                id
            }
        });
        // 返回用户信息
        return user;
    }
}