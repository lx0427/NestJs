import { Controller } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { ApiTags } from '@nestjs/swagger';
import { Crud } from 'nestjs-mongoose-crud';
import { User } from '@app/db/models/user.model';

@Crud({
  model: User,
})
@Controller('courses')
@ApiTags('课程')
export class CoursesController {
  constructor(@InjectModel(User) private readonly model) {}
}
