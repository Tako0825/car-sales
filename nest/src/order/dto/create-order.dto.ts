import { order } from '@prisma/client';
import { IsNotEmpty } from 'class-validator';

export class CreateOrderDto implements Partial<order> {
  @IsNotEmpty({ message: '订单所属产品不允许为空' })
  productId: number;
  @IsNotEmpty({ message: '订单所属销售员不允许为空' })
  userId: number;
  @IsNotEmpty({ message: '订单所属仓库不允许为空' })
  warehouseId: number;
  createtime?: Date;
}
