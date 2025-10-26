import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import { RegisterDto } from "../dto/register.dto";

@ValidatorConstraint()
export class ConfirmedRule implements ValidatorConstraintInterface {
    validate(value: any, validationArguments?: ValidationArguments): boolean | Promise<boolean> {
        return value===((validationArguments.object) as RegisterDto).password?true:false
    }
}