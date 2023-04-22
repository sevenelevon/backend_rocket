import { Module } from '@nestjs/common';
import { amocrmModule } from './amocrm/amocrm.module';

@Module({
  imports: [amocrmModule],
})
export class AppModule {}