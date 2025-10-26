import { PartialType } from '@nestjs/mapped-types';
import { CreateSupplyDto } from './create-supply.dto';

export class UpdateSupplyDto extends PartialType(CreateSupplyDto) {
    quantity?: number
    productId?: number
    supplierId?: number
    warehouseId?: number
}
