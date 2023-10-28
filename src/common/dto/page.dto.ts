import { Validate } from "class-validator"
import { IntegerRule } from "src/common/rule/integer.rule"

export class PageDto {
    @Validate(IntegerRule, { message: "无法转换为有效整数" })
    currentPage: number
    @Validate(IntegerRule, { message: "无法转换为有效整数" })
    pageSize: number
}