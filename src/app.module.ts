import { Module } from '@nestjs/common';
import { BrowserModule } from './browser/browser.module';
import { InstagramRootModule } from './instagram/root/instagram-root.module';

@Module({
  imports: [BrowserModule, InstagramRootModule],
})
export class AppModule {}
