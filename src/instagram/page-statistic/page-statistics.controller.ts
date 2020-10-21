import { Controller, Get, Query } from '@nestjs/common';
import { PageStatisticService } from './page-statistic.service';

@Controller('instagram')
export class PageStatisticsController {
  constructor(private readonly service: PageStatisticService) {}

  @Get('profile')
  public getProfile(@Query() query: {nickname: string}) {
    return this.service.parse(query.nickname);
  }
}