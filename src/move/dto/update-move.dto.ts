import { PartialType } from '@nestjs/mapped-types';
import { CreateMoveDto } from './create-move.dto';

export class UpdateMoveDto extends PartialType(CreateMoveDto) {
    productId?: number
    operatorId?: number
    outboundId?: number
    inboundId?: number
}
