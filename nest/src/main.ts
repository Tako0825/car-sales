import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ResponseInterceptor } from './common/interceptor/response.interceptor';
import { HttpStatusFilter } from './common/filter/httpstatus.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 跨域 - CORS
  app.enableCors({
    origin: '*',
  });

  // 请求前缀 - api
  app.setGlobalPrefix('api');

  // 适配器 - ws库
  // app.useWebSocketAdapter(new WsAdapter(app));

  // 响应拦截器
  app.useGlobalInterceptors(new ResponseInterceptor());

  // 异常过滤器
  app.useGlobalFilters(new HttpStatusFilter());

  // 监听端口 - 3000
  await app.listen(3000);
}
bootstrap();
