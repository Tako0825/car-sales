import { Warehouse } from "@prisma/client";
import { IsNotEmpty } from "class-validator";

export class CreateWarehouseDto implements Partial<Warehouse> {
    @IsNotEmpty({ message: "供应商地址不允许为空" })
    location: string
}
