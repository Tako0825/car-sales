import { Module } from '@nestjs/common';
import { CommonModule } from './common/common.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './common/jwt/jwt.strategy';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ProductModule } from './product/product.module';
import { SupplierModule } from './supplier/supplier.module';

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
    AuthModule,
    UserModule,
    ProductModule,
    SupplierModule,
],
  controllers: [],
  providers: [JwtStrategy],
})
export class AppModule {}
