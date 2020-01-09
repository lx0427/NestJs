<template>
  <el-upload class="avatar-uploader"
             :action="baseURL+'/uploads'"
             :on-success="handleAvatarSuccess"
             :show-file-list="false">
    <template v-if="fileUrl">
      <img v-if="uploadType==='image'" :src="fileUrl" class="avatar">
      <video v-else-if="uploadType==='video'" :src="fileUrl" class="avatar"></video>
    </template>
    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
  </el-upload>
</template>

<script lang="ts">
import { Vue, Component, PropSync, Prop } from "vue-property-decorator";
@Component({})
export default class UploadFile extends Vue {
  // 上传文件类型：image,video
  @Prop(String) uploadType!: string;
  // 传入url,同步更改数据
  @PropSync("url", { type: String }) fileUrl!: string;

  handleAvatarSuccess(res, file) {
    global.console.log(res, file, "handleAvatarSuccess");
    this.fileUrl = res.url;
  }
}
</script>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>