import { CallHandler, ExecutionContext, HttpException, HttpStatus, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable, map } from 'rxjs';
import { HttpStatusCode } from 'src/common/enum/HttpStatusCode';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  // 响应拦截器
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(map(response => {
      if(!response) {
        throw new HttpException({
          tip: "服务器提供了该接口但未处理响应内容, 请联系服务器开发者"
        }, HttpStatus.INTERNAL_SERVER_ERROR)
      }
      return {
        code: HttpStatus.OK,
        message: HttpStatusCode[HttpStatus.OK],
        data: response
      }
    }))
  }
}
