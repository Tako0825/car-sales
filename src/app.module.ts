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
import { MoveModule } from './move/move.module';
import { ChartModule } from './chart/chart.module';

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
    WarehouseModule,
    SupplyModule,
    OrderModule,
    MoveModule,
    ChartModule,
],
  controllers: [],
  providers: [JwtStrategy],
})
export class AppModule {}
