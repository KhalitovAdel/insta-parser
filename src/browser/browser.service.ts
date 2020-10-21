import { Inject, Injectable } from '@nestjs/common';
import { Browser, Page } from 'puppeteer';

@Injectable()
export class BrowserService {
  constructor(@Inject('BROWSER') private readonly browser: Browser) {}

  public async cretePage(params?: {isMobile: boolean}) {
    const page = await this.browser.newPage();
    if (!params?.isMobile) {
      await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36');
      await page.setViewport({width:960,height:768});
    }
    return page;
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