import { Controller } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { ApiTags } from '@nestjs/swagger';
import { Crud } from 'nestjs-mongoose-crud';
import { Course } from '@app/db/models/course.model';

@Crud({
  model: Course,
})
@Controller('courses')
@ApiTags('课程')
export class CoursesController {
  constructor(@InjectModel(Course) private readonly model) {}
}
