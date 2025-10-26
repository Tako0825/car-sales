import { Module } from '@nestjs/common';
import { CommonModule } from './common/common.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './common/jwt/jwt.strategy';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ProductModule } from './product/product.module';
import { SupplierModule } from './supplier/supplier.module';
import { WarehouseModule } from './warehouse/warehouse.module';
import { SupplyModule } from './supply/supply.module';
import { OrderModule } from './order/order.module';
import { ChartModule } from './chart/chart.module';
import { QiniuModule } from './qiniu/qiniu.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    // 加载 .env 并注入 ConfigService
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    // 异步注册 - JWT
    JwtModule.registerAsync({
      global: true,
      useFactory: () => {
        return {
          secret: process.env.SECRET_OR_KEY,
          signOptions: { expiresIn: '30d' },
        };
      },
    }),
    CommonModule,
    AuthModule,
    UserModule,
    ProductModule,
    SupplierModule,
    WarehouseModule,
    SupplyModule,
    OrderModule,
    ChartModule,
    QiniuModule,
  ],
  controllers: [],
  providers: [JwtStrategy],
})
export class AppModule {}
