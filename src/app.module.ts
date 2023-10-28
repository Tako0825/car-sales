import { Module } from '@nestjs/common';
import { CommonModule } from './common/common.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './common/jwt/jwt.strategy';

@Module({
  imports: [
    // 异步注册 - JWT
    JwtModule.registerAsync({
      global: true,
      useFactory: () => {
        return {
          secret: process.env.SECRET_OR_KEY,
          signOptions: { expiresIn:'30d' },
        }
      }
    }),
    CommonModule, 
],
  controllers: [],
  providers: [JwtStrategy],
})
export class AppModule {}
