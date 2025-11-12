import { Controller, Get, Query, Res } from "@nestjs/common";


@Controller('wx')
export class WxpayController {
    @Get('login')
    async wxLogin(
        @Query('userId') userId: string,
        @Query('url') url: string,
        @Res() res
    ):Promise<void> {
        res.redirect()
    }
}