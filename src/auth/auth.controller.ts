import { Body, Controller, Get, Post, Req, UseGuards, UsePipes } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { Validation } from 'src/common/validation/validation';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from '@nestjs/passport';
import { User } from '@prisma/client';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // API - REGISTER(注册)
  @Post("register")
  @UsePipes(Validation)
  async register(@Body() registerDto:RegisterDto) {
    return await this.authService.register(registerDto)
  }

  // API - LOGIN(登录)
  @Post("login")
  @UsePipes(Validation)
  async login(@Body() loginDto:LoginDto) {
    return await this.authService.login(loginDto)
  }

  // API - AUTOMATIC LOGIN(自动登录)
  @Get("login")
  @UseGuards(AuthGuard("jwt"))
  async autoLogin(@Req() req:any) {
    const user:User = req.user
    return await this.authService.autoLogin(user)
  }
}
