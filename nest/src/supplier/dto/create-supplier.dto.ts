import { Supplier } from "@prisma/client";
import { IsNotEmpty, Validate } from "class-validator";
import { PhoneRule } from "src/auth/rule/phone.rule";

export class CreateSupplierDto implements Partial<Supplier> {
    @IsNotEmpty({ message: "供应商联系人不允许为空" })
    name: string
    @Validate(PhoneRule, { message: "员工电话格式不符 (以“1”开头共11位数字组合)" })
    @IsNotEmpty({ message: "员工电话不允许为空" })
    phone: string
    @IsNotEmpty({ message: "供应商单位不允许为空" })
    company: string
}
