import { Module } from '@nestjs/common';
import { InstagramPageModule } from '../instagram-page/instagram-page.module';
import { InstagramPageService } from '../instagram-page/instagram-page.service';

@Module({
  imports: [InstagramPageModule],
  providers: [
    {
      provide: 'PAGE',
      useFactory: async (service: InstagramPageService) => {
        return await service.login('khalitov_adel', 'adelADEL131!');
      },
      inject: [InstagramPageService]
    },
  ]
})
export class PageStatisticModule {}