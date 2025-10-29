import { ConsoleLogger, Module } from '@nestjs/common';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/models/user.entity';


@Module({
  imports: [
    TypeOrmModule.forFeature([User])
  ],
  providers:[AuthResolver,AuthService,UserService],  
  exports:[AuthResolver]  //导出其他地方使用
})
export class AuthModule {}
