import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule,{
    cors: true, // ✅ 启用 CORS（允许所有来源，开发环境用没问题）
  });

  //或者
  // app.enableCors({
  //   origin: 'http://localhost:5173', // ✅ 只允许这个前端地址
  //   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  //   credentials: true, // 如果你需要传递 cookie 或 auth header，设为 true
  // });
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
