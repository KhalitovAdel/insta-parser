import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { PageStatisticService } from './page-statistic.service';
import { ProfileService } from '../../profile/profile.service';

@Controller('instagram')
export class PageStatisticsController {
  constructor(
    private readonly service: PageStatisticService,
    private readonly profile: ProfileService
  ) {}

  @Get('profile')
  public async getProfile(@Query() query: {nickname: string}) {
    const profile = await this.service.parse(query.nickname);
    return await this.profile.create({...profile, nickname: query.nickname});
  }

  @Post('import/profile')
  public async importProfiles(@Body() body: {nicknames: string[]}) {
    const errors: {message: string, nickname: string}[] = [];
    const existsProfiles = (await this.profile.checkExists({nicknames: body.nicknames || []}));
    const profileToImport = body.nicknames.filter(profile => !existsProfiles.includes(profile));
    for (const elem of profileToImport) {
      try {
        const profile = await this.service.parse(elem);
        await this.profile.create({...profile, nickname: elem});
      } catch (e) {
        errors.push({message: e.message, nickname: elem});
      }
    }
    return {errors}
  }
}