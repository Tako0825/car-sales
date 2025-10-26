import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  SetMetadata,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { Validation } from 'src/common/validation/validation';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from '@nestjs/passport';
import { $Enums, User } from '@prisma/client';
import { RoleGuard } from 'src/common/guard/role.guard';

// CONTROLLER - AUTH
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // API - REGISTER(注册)
  @Post('register')
  @SetMetadata('role', [$Enums.Role.ROOT])
  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @UsePipes(Validation)
  async register(@Body() registerDto: RegisterDto) {
    return await this.authService.register(registerDto);
  }

  // API - LOGIN(登录)
  @Post('login')
  @UsePipes(Validation)
  async login(@Body() loginDto: LoginDto) {
    return await this.authService.login(loginDto);
  }

  // API - AUTOMATIC LOGIN(自动登录)
  @Get('login')
  @UseGuards(AuthGuard('jwt'))
  async autoLogin(@Req() req: any) {
    const user: User = req.user;
    return await this.authService.autoLogin(user);
  }
}
