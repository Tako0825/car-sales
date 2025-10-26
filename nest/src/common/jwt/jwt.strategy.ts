import { PassportStrategy } from '@nestjs/passport';
import { PrismaService } from '../prisma/prisma.service';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { user } from '@prisma/client';

export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private prisma = new PrismaService()) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.SECRET_OR_KEY,
    });
  }

  // 通过身份验证后, 执行 validate() 方法返回用户信息
  async validate(payload: any): Promise<user> {
    // 根据 openid 查询用户信息
    const { phone } = payload.params;
    return await this.prisma.user.findUnique({
      where: {
        phone,
      },
    });
  }
}
