import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { Validation } from 'src/common/validation/validation';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {
    
  }

  // 接口 - 注册
  @Post("register")
  @UsePipes(Validation)
  async register(@Body() registerDto:RegisterDto) {
    return await this.authService.register(registerDto)
  }
}
