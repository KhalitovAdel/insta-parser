import { Inject, Injectable } from '@nestjs/common';
import { Page } from 'puppeteer';

@Injectable()
export class InstagramPageService {
  constructor(@Inject('PAGE') private readonly page: Page) {}

  public async login(login: string, password: string) {
    await this.page.goto('https://www.instagram.com', {waitUntil: 'load'});
    await this.page.waitForSelector('body');
    const needLogin = await this.page.evaluate(() => {return !document.querySelector('div[class="zGtbP IPQK5 VideM"]')})
    if (needLogin) {
      await this.page.goto('https://www.instagram.com/accounts/login/');
      await this.page.waitForSelector('input[name="username"]');
      await this.page.type('input[name="username"]', login);
      await this.page.type('input[name="password"]', password);
      await this.page.click('button[type="submit"]');
      await this.page.waitForSelector('button[class="sqdOP  L3NKy   y3zKF     "]');
      await this.page.click('button[class="sqdOP  L3NKy   y3zKF     "]');
      await this.page.waitForSelector('button[class="aOOlW   HoLwm "]');
      await this.page.click('button[class="aOOlW   HoLwm "]');
    }
    return this.page;
  }

  public async reLogin(login: string, password: string) {
    await this.page.evaluate(() => localStorage.clear());
    return await this.login(login, password);
  }
}