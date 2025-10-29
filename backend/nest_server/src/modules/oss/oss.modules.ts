import { ConsoleLogger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OSSResolver } from './oss.resolver';
import { OSSService } from './oss.service';


@Module({
  imports: [
  ],
  providers:[OSSResolver,OSSService],  
  exports:[OSSResolver]  //导出其他地方使用
})
export class OSSModule {}
