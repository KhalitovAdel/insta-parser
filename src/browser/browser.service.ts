import { Inject, Injectable } from '@nestjs/common';
import { Browser, Page } from 'puppeteer';

@Injectable()
export class BrowserService {
  constructor(@Inject('BROWSER') private readonly browser: Browser) {}

  public cretePage() {
    return this.browser.newPage();
  }

  public async closePage(page: Page) {
    if (!(await page.isClosed())) {
      const client = await page.target().createCDPSession();
      await client.send('Network.clearBrowserCookies');
      await client.send('Network.clearBrowserCache');
      await page.evaluate(() => localStorage.clear());
      await page.close();
    }
  }

}