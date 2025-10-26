import { $Enums, user } from '@prisma/client';
import { Validate } from 'class-validator';
import { PhoneRule } from 'src/auth/rule/phone.rule';
import { RoleRule } from 'src/auth/rule/role.rule';

export class UpdateUserDto implements Partial<user> {
  username?: string;
  @Validate(PhoneRule, {
    message: '员工电话格式不符 (以“1”开头共11位数字组合)',
  })
  phone?: string;
  @Validate(RoleRule, { message: '不存在该职位' })
  role?: $Enums.user_role;
  joined_date?: Date;
  address?: string;
  avatar?: string;
}
