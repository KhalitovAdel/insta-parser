import { Inject, Injectable } from '@nestjs/common';
import { Page } from 'puppeteer';
import { InstagramProfile } from './interfaces/page-statistics.interfaces';
import { NetworkTransform } from './network-transform';

@Injectable()
export class PageStatisticService {
  constructor(@Inject('PAGE') private readonly page: Page) {}

  private async goToProfile(nickname: string) {
    await this.page.goto(`https://www.instagram.com/${nickname}/`);
    await this.page.waitForSelector('ul[class="k9GMp "]');
  }

  private async returnSelfProfile() {
    await this.page.goto('https://www.instagram.com/', {waitUntil: 'networkidle0'});
    await this.page.waitForSelector('div[class="zGtbP IPQK5 VideM"]');
  }

  private readNetwork() {
    return new Promise(async (res, rej) => {
      const timeoutReject = setTimeout(() => {
        return rej(new Error('Превышен лимит ожидания запросов метода readNetwork'))
      }, 15000);
      this.page.on('response', async response => {
        if (response.url().includes('graphql/query')) {
          const body = await response.json() as any;
          if (body?.data?.user?.edge_owner_to_timeline_media) {
            await this.page.removeAllListeners();
            clearTimeout(timeoutReject);
            res(body?.data?.user?.edge_owner_to_timeline_media)
          }
        }
      })
    })
  }

  private getProfileData(nickname: string): Promise<InstagramProfile> {
    return this.page.evaluate((nickname) => {
      const followers = document.querySelector(`a[href="/${nickname}/followers/"]`)?.querySelector('span')?.getAttribute('title') || '0';
      const following = document.querySelector(`a[href="/${nickname}/following/"]`)?.querySelector('span')?.innerText || '0';
      return {
        followers: parseInt(followers.replace(/,/gi, '')),
        following: parseInt(following.replace(/,/gi, '')),
        name: document.querySelector(`h1[class="rhpdm"]`)?.textContent,
        link: document.querySelector(`a[page_id="profilePage"]`)?.textContent,
        description: document.querySelector(`div[class="-vDIg"]`)?.querySelector('span')?.textContent
      }
    }, nickname)
  }

  public async parse(nickname: string) {
    await this.goToProfile(nickname);
    const networkData = await this.readNetwork();
    const profile = await this.getProfileData(nickname);
    const transformedNetwork = new NetworkTransform(networkData)
    return {
      ...profile,
      ...transformedNetwork.fullData
    };
  }
}