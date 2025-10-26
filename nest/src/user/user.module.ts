import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserOtherService } from './user.other.service';

@Module({
  controllers: [UserController],
  providers: [UserService, UserOtherService],
})
export class UserModule {}
