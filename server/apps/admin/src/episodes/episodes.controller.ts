import { Controller } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { ApiTags } from '@nestjs/swagger';
import { Crud } from 'nestjs-mongoose-crud';
import { Episode } from '../../../../libs/db/src/models/episode.model';

@Crud({
  model: Episode,
})
@Controller('episodes')
@ApiTags('课时')
export class EpisodesController {
  constructor(@InjectModel(Episode) private readonly model) {}
}
