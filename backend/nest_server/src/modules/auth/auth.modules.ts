import { ConsoleLogger, Module } from '@nestjs/common';
import {JwtModule} from '@nestjs/jwt'
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/models/user.entity';
import { JwtStrategy } from './jwt.strategy';


@Module({
  imports: [
    JwtModule.register({
      secret:'dh',
      signOptions:{
        expiresIn:'60s'
      }
    }),
    TypeOrmModule.forFeature([User])
  ],
  providers:[JwtStrategy,AuthResolver,AuthService,UserService],  
  exports:[AuthResolver]  //导出其他地方使用
})
export class AuthModule {}
