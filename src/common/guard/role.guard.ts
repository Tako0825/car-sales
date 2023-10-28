/**
 * 使用方法:
 * 
 *  - 1.@SetMetadata(元数据名, 元数据)
 * 
 *  - 2.@UseGuards(守卫文件)
 * 
 *  - 在有需要的路由添加上述守卫, 定义访问当前路由所需的角色信息并进行鉴权
*/
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { User } from '@prisma/client';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(
    private reflector:Reflector
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
      // 当前登录用户信息
      const request = context.switchToHttp().getRequest()
      const user:User = request.user
      // 当前路由访问所需的角色信息
      const roles = this.reflector.get<string[]>("role",context.getHandler())
      // 判断当前用户是否可访问资源? 403
      return roles.includes(user.role)?true:false;
  }
}