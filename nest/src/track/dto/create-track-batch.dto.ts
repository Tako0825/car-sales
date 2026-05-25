import { Type } from 'class-transformer';
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  MaxLength,
  ValidateNested,
} from 'class-validator';
import { CreateTrackEventDto } from './create-track-event.dto';

class CreateTrackMetaDto {
  @IsOptional()
  @IsNumber({}, { message: '发送时间必须是数字' })
  sentAt?: number;

  @IsOptional()
  @IsString({ message: 'SDK 版本必须是字符串' })
  @MaxLength(50, { message: 'SDK 版本长度不能超过 50' })
  sdkVersion?: string;
}

export class CreateTrackBatchDto {
  @IsOptional()
  @IsObject({ message: 'meta 必须是对象' })
  @ValidateNested()
  @Type(() => CreateTrackMetaDto)
  meta?: CreateTrackMetaDto;

  @IsArray({ message: 'events 必须是数组' })
  @ArrayMinSize(1, { message: 'events 至少需要 1 条事件' })
  @ArrayMaxSize(30, { message: '单次上报事件数不能超过 30 条' })
  @ValidateNested({ each: true })
  @Type(() => CreateTrackEventDto)
  events: CreateTrackEventDto[];
}
