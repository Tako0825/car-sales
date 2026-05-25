import { Type } from 'class-transformer';
import {
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  MaxLength,
  ValidateNested,
} from 'class-validator';

class CreateTrackContextDto {
  @IsNotEmpty({ message: '应用标识不允许为空' })
  @IsString({ message: '应用标识必须是字符串' })
  @MaxLength(100, { message: '应用标识长度不能超过 100' })
  appId: string;

  @IsOptional()
  @IsString({ message: '应用名称必须是字符串' })
  @MaxLength(100, { message: '应用名称长度不能超过 100' })
  appName?: string;

  @IsOptional()
  @IsString({ message: '版本号必须是字符串' })
  @MaxLength(50, { message: '版本号长度不能超过 50' })
  release?: string;

  @IsOptional()
  @IsString({ message: '环境标识必须是字符串' })
  @MaxLength(20, { message: '环境标识长度不能超过 20' })
  env?: string;

  @IsOptional()
  uid?: string | number;

  @IsNotEmpty({ message: '会话标识不允许为空' })
  @IsString({ message: '会话标识必须是字符串' })
  @MaxLength(64, { message: '会话标识长度不能超过 64' })
  sid: string;

  @IsNotEmpty({ message: '页面地址不允许为空' })
  @IsString({ message: '页面地址必须是字符串' })
  @MaxLength(500, { message: '页面地址长度不能超过 500' })
  url: string;

  @IsOptional()
  @IsString({ message: '路由地址必须是字符串' })
  @MaxLength(255, { message: '路由地址长度不能超过 255' })
  route?: string;

  @IsOptional()
  @IsString({ message: 'User-Agent 必须是字符串' })
  @MaxLength(500, { message: 'User-Agent 长度不能超过 500' })
  ua?: string;

  @IsOptional()
  @IsString({ message: '设备类型必须是字符串' })
  @MaxLength(50, { message: '设备类型长度不能超过 50' })
  deviceType?: string;
}

export class CreateTrackEventDto {
  @IsNotEmpty({ message: '事件 id 不允许为空' })
  @IsString({ message: '事件 id 必须是字符串' })
  @MaxLength(64, { message: '事件 id 长度不能超过 64' })
  id: string;

  @IsIn(['track', 'monitor'], { message: '事件分类不合法' })
  category: 'track' | 'monitor';

  @IsNotEmpty({ message: '事件类型不允许为空' })
  @IsString({ message: '事件类型必须是字符串' })
  @MaxLength(50, { message: '事件类型长度不能超过 50' })
  type: string;

  @IsIn(['P0', 'P1', 'P2'], { message: '事件优先级不合法' })
  level: 'P0' | 'P1' | 'P2';

  @IsNumber({}, { message: '事件时间戳必须是数字' })
  ts: number;

  @IsObject({ message: '上下文必须是对象' })
  @ValidateNested()
  @Type(() => CreateTrackContextDto)
  ctx: CreateTrackContextDto;

  @IsObject({ message: 'payload 必须是对象' })
  payload: Record<string, any>;
}
