import { ConsoleLogger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {User} from './models/user.entity';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';

@Module({
  imports: [
    TypeOrmModule.forFeature([User])
  ],
  providers:[UserResolver,UserService],  
  exports:[UserService]  //导出其他地方使用
})
export class UserModule {}
