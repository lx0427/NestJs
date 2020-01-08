import { prop } from '@typegoose/typegoose';
export class Course {
  @prop()
  name: string;
  @prop()
  cover: string;
}
