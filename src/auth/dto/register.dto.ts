import { IsNotEmpty, IsPhoneNumber, Validate } from "class-validator";
import { $Enums, User } from "@prisma/client"
import { PhoneRule } from "../rule/phone.rule";
import { RoleRule } from "../rule/role.rule";
import { ConfirmedRule } from "../rule/confirmed.rule";

export class RegisterDto implements Partial<User> {
    @IsNotEmpty({ message: "员工姓名不允许为空" })
    username: string
    @Validate(PhoneRule, { message: "员工电话格式不符 (以“1”开头共11位数字组合)" })
    @IsNotEmpty({ message: "员工电话不允许为空" })
    phone: string
    @IsNotEmpty({ message: "员工密码不允许为空" })
    password: string
    @Validate(ConfirmedRule, { message: "密码与确认密码不相同" })
    @IsNotEmpty({ message: "确认密码不允许为空" })
    passwordConfirmed: string
    @Validate(RoleRule, { message: "不存在该职位" })
    @IsNotEmpty({ message: "员工职位不允许为空" })
    role: $Enums.Role
    joined_date?: Date
    address?: string
    avatar?: string
}