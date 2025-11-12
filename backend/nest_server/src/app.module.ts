import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './modules/user/user.modules';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver,ApolloDriverConfig} from '@nestjs/apollo';
import { join } from 'path';
import { OSSModule } from './modules/oss/oss.modules';
import { AuthModule } from './modules/auth/auth.modules';
import { WxpayModule } from './modules/wxpay/wxpay.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type:'mysql',
      host:'localhost',
      port:3306,
      username:'root',
      password:'123456',
      database:'drop',
      entities:[`${__dirname}/../modules/**/*.entity{.ts,.js}`],
      logging:true,
      synchronize:true,
      autoLoadEntities:true,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver, // 使用 Apollo 驱动
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'), // 自动生成 GraphQL Schema 文件
      // 如果你想使用 GraphiQL 或 Playground（调试界面），可以加上：
      playground: true, // 或者 introspection: true
    }),
    UserModule,
    OSSModule,
    AuthModule,
    WxpayModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
