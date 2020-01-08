import { prop, Ref, modelOptions } from '@typegoose/typegoose';
import { Course } from './course.model';

@modelOptions({
  schemaOptions: {
    timestamps: true,
  },
})
export class Episode {
  @prop()
  title: string;
  @prop()
  file: string;
  @prop({ ref: Course })
  course: Ref<Course>;
}
