import { Module } from "@nestjs/common";
import { WxpayController } from "./wxpay.controller";


@Module({
    controllers:[WxpayController]
})
export class WxpayModule {
    
}