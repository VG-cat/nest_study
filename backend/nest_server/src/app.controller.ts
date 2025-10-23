import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { UserService } from './modules/user/user.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService,private readonly userServer: UserService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/create')
  async create():Promise<Boolean>{
    return await this.userServer.create({
      name:'人员1',
      desc:'rer',
      tel:'1234232',
      password:'qwerty',
      account:'admin'
    })
  }
}
