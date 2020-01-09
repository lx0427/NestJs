import { prop, modelOptions, arrayProp, Ref } from '@typegoose/typegoose';
import { Episode } from './episode.model';

@modelOptions({
  schemaOptions: {
    timestamps: true,
    toJSON: { virtuals: true }, // 开启获取虚拟字段
  },
})
export class Course {
  @prop()
  name: string;
  @prop()
  cover: string;

  // 定义虚拟字段
  @arrayProp({
    ref: 'Episode', // 参考模型
    localField: '_id', // 本地键，course._id关联了episode
    foreignField: 'course', // 外键，对应episode.course
  })
  episodes: Ref<Episode>[]; // 参考Episode的数组
}
