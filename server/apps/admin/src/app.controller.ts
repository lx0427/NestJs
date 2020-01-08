import {
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { AppService } from './app.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('uploads')
  @UseInterceptors(FileInterceptor('file')) // 文件拦截器
  async uploadFile(@UploadedFile('file') file) {
    // 获取上传文件的装饰器 UploadedFile
    return {
      url: `http://localhost:${process.env.ADMIN_PORT}/${file.path}`,
    };
  }
}
