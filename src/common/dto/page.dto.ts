import { IsNotEmpty, Validate } from "class-validator"
import { IntegerRule } from "../rule/integer.rule"

export class PageDto {
    @Validate(IntegerRule, { message: "不能转换为有效整数" })
    @IsNotEmpty({ message: "当前页不允许为空" })
    page: string
    @Validate(IntegerRule, { message: "不能转换为有效整数" })
    @IsNotEmpty({ message: "每页展示条数不允许为空" })
    pageSize: string
}