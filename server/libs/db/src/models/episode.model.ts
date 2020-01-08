import { prop, Ref } from '@typegoose/typegoose';
import { Course } from './course.model';
export class Episode {
  @prop()
  title: string;
  @prop()
  file: string;
  @prop({ ref: Course })
  course: Ref<Course>;
}
