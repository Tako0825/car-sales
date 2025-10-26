import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

// 管道 - 用于将对象中所有属性的类型转化为 number 或 undefined
@Injectable()
export class ParseIdPipe implements PipeTransform {
  async transform(value: any, metadata: ArgumentMetadata) {
    for(const key in value) {
      value[key] = isNaN(value[key])?undefined:+value[key]
    }
    return value;
  }
}
