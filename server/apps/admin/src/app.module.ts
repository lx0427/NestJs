import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersController } from './users/users.controller';
import { UsersModule } from './users/users.module';
import { CoursesModule } from './courses/courses.module';
import { EpisodesController } from './episodes/episodes.controller';
import { EpisodesModule } from './episodes/episodes.module';
import { CommonModule } from '../../../libs/common/src/common.module';

@Module({
  imports: [CommonModule, UsersModule, CoursesModule, EpisodesModule],
  controllers: [AppController, UsersController, EpisodesController],
  providers: [AppService],
})
export class AppModule {}
