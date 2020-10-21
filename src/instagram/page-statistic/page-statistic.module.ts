import { Module } from '@nestjs/common';
import { InstagramPageModule } from '../instagram-page/instagram-page.module';
import { InstagramPageService } from '../instagram-page/instagram-page.service';
import { auth } from '../../config';
import { PageStatisticService } from './page-statistic.service';
import { PageStatisticsController } from './page-statistics.controller';

@Module({
  imports: [InstagramPageModule],
  controllers: [PageStatisticsController],
  providers: [
    {
      provide: 'PAGE',
      useFactory: async (service: InstagramPageService) => {
        return await service.login(auth.login, auth.password);
      },
      inject: [InstagramPageService]
    },
    PageStatisticService
  ]
})
export class PageStatisticModule {}