import { Module } from '@nestjs/common';
import { amocrmController } from './amocrm.controller';
import { amocrmSerivce } from './amocrm.service';

@Module({
  controllers: [amocrmController],
  providers: [amocrmSerivce],
})
export class amocrmModule {}