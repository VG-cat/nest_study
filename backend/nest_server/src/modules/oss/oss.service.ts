import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { OssType } from './dto/oss.type';
import OSS from 'ali-oss';
import dayjs from 'dayjs';
import { access } from 'fs';

const config = {
    accessKeyId:''
    accessKeySecret: ''
    bucket:'ossdhimage',
    dir:'imgs/'
}

//用于操作数据库
@Injectable()
export class OSSService {
    async getSignature():Promise<OssType>{
        const client = new OSS(config);

        const date = new Date();
        date.setDate(date.getDate() +1);
        const policy = {
            expiration:date.toISOString(),
            conditions :[
                ['content-length-range',0,1048576000]
            ]
        }

        const formData = await client.calculatePostSignature(policy);

        const host = 'https://ossdhimage.oss-cn-beijing.aliyuncs.com';

        const params = {
            exprie:dayjs().add(1,'days').unix().toString(),
            policy:formData.policy,
            signature:formData.Signature,
            accessid:formData.OSSAccessKeyId,
            host,
            dir:config.dir
        }


        return params;

    }
}