import { HttpException, HttpStatus, ValidationError, ValidationPipe } from "@nestjs/common";

export class Validation extends ValidationPipe {
    constructor() {
        super()
    }

    // 格式化 DTO 管道验证失败时的异常信息
    protected flattenValidationErrors(validationErrors: ValidationError[]): string[] {
        const error = new Object()
        validationErrors.forEach(item => {
            error[item.property] = Object.values(item.constraints)[0]
        })
        throw new HttpException({
            error,
        }, HttpStatus.UNPROCESSABLE_ENTITY)
    }
}