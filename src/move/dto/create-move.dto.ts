import { Move } from "@prisma/client";
import { IsNotEmpty } from "class-validator";

export class CreateMoveDto implements Partial<Move> {
    @IsNotEmpty({ message: "调动产品不允许为空" })
    productId: number
    @IsNotEmpty({ message: "操作员不允许为空" })
    operatorId: number
    @IsNotEmpty({ message: "出库仓库允许为空" })
    outboundId: number
    @IsNotEmpty({ message: "入库仓库不允许为空" })
    inboundId: number
}
