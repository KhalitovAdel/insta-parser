import { Module } from '@nestjs/common';
import { InstagramPageModule } from '../instagram-page/instagram-page.module';
import { InstagramPageService } from '../instagram-page/instagram-page.service';
import { auth } from '../../config';

@Module({
  imports: [InstagramPageModule],
  providers: [
    {
      provide: 'PAGE',
      useFactory: async (service: InstagramPageService) => {
        return await service.login(auth.login, auth.password);
      },
      inject: [InstagramPageService]
    },
  ]
})
export class PageStatisticModule {}