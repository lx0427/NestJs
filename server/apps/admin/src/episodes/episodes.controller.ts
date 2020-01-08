import { Controller } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { ApiTags } from '@nestjs/swagger';
import { Crud } from 'nestjs-mongoose-crud';
import { User } from '@app/db/models/user.model';

@Crud({
  model: User,
})
@Controller('episodes')
@ApiTags('课时')
export class EpisodesController {
  constructor(@InjectModel(User) private readonly model) {}
}
