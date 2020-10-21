import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { ProfileEntity } from './entity/profile.entity';
import { ProfileDataBase, ProfileInterface } from './interfaces/profile.interfaces';

@Injectable()
export class ProfileService {
  constructor(@InjectRepository(ProfileEntity) private profileRepository: Repository<ProfileDataBase>) {}

  public create(params: ProfileInterface) {
    return this.profileRepository.save(this.profileRepository.create(params));
  }

  public fetch() {
    return this.profileRepository.find({})
  }

  public checkExists(params: {nicknames: string[]}): Promise<string[]> {
    return this.profileRepository.find({where: {nickname: In(params.nicknames || [])}, select: ['nickname']}).then(data => data.map(el => el.nickname));
  }
}