import { Module } from '@nestjs/common';
import * as puppeteer from 'puppeteer';
import { BrowserService } from './browser.service';

@Module({
  providers: [
    {
      provide: 'BROWSER',
      useFactory: async () => {
        const result: { [key: string]: any } = {};
        const puppeteerOptions = {
          args: ['--disable-gpu', '--no-sandbox', '--disable-features=site-per-process', '--disable-dev-shm-usage', '--disable-setuid-sandbox'],
          headless: process.env.NODE_ENV === 'production',
        };
        return await puppeteer.launch(puppeteerOptions);
      },
    },
    BrowserService
  ],
  exports: [BrowserService]
})
export class BrowserModule {}