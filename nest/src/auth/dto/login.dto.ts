import { IsNotEmpty } from "class-validator";
import { User } from "@prisma/client"

export class LoginDto implements Partial<User> {
    @IsNotEmpty({ message: '员工电话不允许为空' })
    phone: string
    @IsNotEmpty({ message: '员工密码不允许为空' })
    password: string
}