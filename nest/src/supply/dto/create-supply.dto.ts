import { supply } from '@prisma/client';
import { IsNotEmpty } from 'class-validator';

export class CreateSupplyDto implements Partial<supply> {
  @IsNotEmpty({ message: '供应数量不允许为空' })
  quantity: number;
  @IsNotEmpty({ message: '供应产品不允许为空' })
  productId: number;
  @IsNotEmpty({ message: '供应商不允许为空' })
  supplierId: number;
  @IsNotEmpty({ message: '供应仓库不允许为空' })
  warehouseId: number;
  createtime?: Date;
}
