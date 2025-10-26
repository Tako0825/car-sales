import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseIntPipe,
  UsePipes,
  UseGuards,
  SetMetadata,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { Validation } from 'src/common/validation/validation';
import { AuthGuard } from '@nestjs/passport';
import { $Enums } from '@prisma/client';
import { RoleGuard } from 'src/common/guard/role.guard';
import { UserOtherService } from './user.other.service';
import { UpdatePasswordDto } from './dto/update-password.dto';

// CONTROLLER - USER
@Controller('user')
@UseGuards(AuthGuard('jwt'))
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly userOtherService: UserOtherService,
  ) {}

  // API - PAGING QUERY USER(分页查询用户)
  @Get()
  @UsePipes(Validation)
  async findPage(
    @Query('page') page: string,
    @Query('pageSize') pageSize: string,
  ) {
    if (!isNaN(+page) && !isNaN(+pageSize))
      return await this.userService.findPage(+page, +pageSize);
    else return this.userService.findAll();
  }

  // API - QUERY SPECIFIED USER(查询指定的用户)
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.userService.findOne(id);
  }

  // API - QUERY SPECIFIED USER BY PHONE(根据电话查询指定的用户)
  @Get('/phone/:phone')
  async findOneByPhone(@Param('phone') phone: string) {
    return await this.userService.findOneByPhone(phone);
  }

  // API - UPDATE USER(修改用户信息)
  @Patch(':id')
  @SetMetadata('role', [$Enums.Role.ROOT])
  @UseGuards(RoleGuard)
  @UsePipes(Validation)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return await this.userService.update(id, updateUserDto);
  }

  // API - UPDATE AVATAR(修改用户头像)
  @Patch(':id/avatar')
  @UseGuards(AuthGuard('jwt'))
  async updateAvatar(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return await this.userService.updateAvatar(id, updateUserDto);
  }

  // API - UPDATE USER PASSWORD(修改用户密码)
  @Patch(':id/password')
  @UseGuards(AuthGuard('jwt'))
  @UsePipes(Validation)
  async updatePassword(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ) {
    return await this.userService.updatePassword(id, updatePasswordDto);
  }

  // API - REMOVE USER(删除用户)
  @Delete(':id')
  @SetMetadata('role', [$Enums.Role.ROOT])
  @UseGuards(RoleGuard)
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await this.userService.remove(id);
  }

  // API - QUERY ALL MY ORDER(查询用户订单)
  @Get(':id/order')
  async findMyOrder(@Param('id', ParseIntPipe) id: number) {
    return await this.userOtherService.findMyOrder(id);
  }
}
