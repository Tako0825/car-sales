import { IsNotEmpty } from 'class-validator';

export class UpdatePasswordDto {
  @IsNotEmpty({ message: '原密码不允许为空' })
  originalPassword: string;
  @IsNotEmpty({ message: '密码不允许为空' })
  password: string;
  @IsNotEmpty({ message: '确认密码不允许为空' })
  passwordConfirmed: string;
}
