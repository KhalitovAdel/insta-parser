import { Module } from '@nestjs/common';
import { BrowserModule } from '../../browser/browser.module';
import { BrowserService } from '../../browser/browser.service';
import { InstagramPageService } from './instagram-page.service';

@Module({
  imports: [BrowserModule],
  providers: [
    {
      provide: 'PAGE',
      useFactory: async (service: BrowserService) => {
        return await service.cretePage();
      },
      inject: [BrowserService]
    },
    InstagramPageService
  ],
  exports: [InstagramPageService]
})
export class InstagramPageModule {}