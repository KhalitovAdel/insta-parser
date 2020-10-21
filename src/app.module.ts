import { Module } from '@nestjs/common';
import { BrowserModule } from './browser/browser.module';
import { InstagramRootModule } from './instagram/root/instagram-root.module';
import { ProfileModule } from './profile/profile.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { database } from './config';
import { ProfileEntity } from './profile/entity/profile.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: database.type as any,
        port: database.port,
        username: database.username,
        password: database.password,
        database: database.database,
        entities: [ProfileEntity],
        synchronize: true,
      })
    }),
    BrowserModule,
    InstagramRootModule,
    ProfileModule
  ],
})
export class AppModule {}
