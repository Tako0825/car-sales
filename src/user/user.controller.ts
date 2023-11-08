import { Controller, Get, Body, Patch, Param, Delete, Query, ParseIntPipe, UsePipes, UseGuards, SetMetadata } from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { PageDto } from 'src/common/dto/page.dto';
import { Validation } from 'src/common/validation/validation';
import { AuthGuard } from '@nestjs/passport';
import { $Enums } from '@prisma/client';
import { RoleGuard } from 'src/common/guard/role.guard';

// CONTROLLER - USER
@Controller('user')
@UseGuards(AuthGuard("jwt"))
export class UserController {
  constructor(private readonly userService: UserService) {}

  // API - PAGING QUERY USER(分页查询用户)
  @Get()
  @UsePipes(Validation)
  async findPage(
    @Query() pageDto: PageDto,
    @Query("page", ParseIntPipe) page: number,
    @Query("pageSize", ParseIntPipe) pageSize: number
  ) {
    return await this.userService.findPage(page, pageSize);
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
  @SetMetadata("role", [$Enums.Role.ADMIN])
  @UseGuards(RoleGuard)
  @UsePipes(Validation)
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateUserDto: UpdateUserDto) {
    return await this.userService.update(id, updateUserDto);
  }

  // API - REMOVE USER(删除用户)
  @Delete(':id')
  @SetMetadata("role", [$Enums.Role.ADMIN])
  @UseGuards(RoleGuard)
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await this.userService.remove(id);
  }
}
