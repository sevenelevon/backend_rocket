import {
  Controller,
  Get,
  Headers,
  Query,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { amocrmSerivce } from './amocrm.service';

@Controller('api/leads')
export class amocrmController {
  constructor(private readonly amocrmSerivce: amocrmSerivce) {}

  @Get()
  async findAllLead(
    @Headers('Authorization') authHeader: string,
    @Query('query') query?: string,
  ): Promise<string> {
    const token = authHeader.replace('Bearer ', '');
    const data = await this.amocrmSerivce.getLead(token, query);
    return data;
  }

  @Get('/contact')
  async findAllContact(
    @Headers('Authorization') authHeader: string,
    @Query('query') query?: string,
  ): Promise<string> {
    const token = authHeader.replace('Bearer ', '');
    const data = await this.amocrmSerivce.getContact(token, query);
    return data;
  }
}
