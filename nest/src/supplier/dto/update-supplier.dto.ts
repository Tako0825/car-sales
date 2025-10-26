import { PartialType } from '@nestjs/mapped-types';
import { CreateSupplierDto } from './create-supplier.dto';
import { Validate } from 'class-validator';
import { PhoneRule } from 'src/auth/rule/phone.rule';

export class UpdateSupplierDto extends PartialType(CreateSupplierDto) {
    name?: string
    @Validate(PhoneRule, { message: "员工电话格式不符 (以“1”开头共11位数字组合)" })
    phone?: string
    company?: string
}
