import { product } from '@prisma/client';
import { IsNotEmpty } from 'class-validator';

export class CreateProductDto implements Partial<product> {
  @IsNotEmpty({ message: '汽车名称不允许为空' })
  name: string;
  @IsNotEmpty({ message: '汽车型号不允许为空' })
  model: string;
  @IsNotEmpty({ message: '汽车售价不允许为空' })
  price: number;
  @IsNotEmpty({ message: '汽车车型不允许为空' })
  poster: string;
  @IsNotEmpty({ message: '汽车介绍不允许为空' })
  introduce: string;
}
