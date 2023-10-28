import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";

@ValidatorConstraint()
export class IntegerRule implements ValidatorConstraintInterface {
    // 验证是否可转换为有效整数
    validate(value: any, args?: ValidationArguments): boolean | Promise<boolean> {
        return new Promise(resolve => {
            // 允许为空, 取默认值
            if(!value) {
                resolve(true)
            }
            // 但不允许不能转换为有效整数
            resolve(Number.isInteger(+value)?true:false)
        })
    }
}