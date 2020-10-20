import { Module } from '@nestjs/common';
import { InstagramPageModule } from '../instagram-page/instagram-page.module';
import { PageStatisticModule } from '../page-statistic/page-statistic.module';

@Module({
  imports: [InstagramPageModule, PageStatisticModule]
})
export class InstagramRootModule {}