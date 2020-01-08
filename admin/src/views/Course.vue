<template>
  <div>
    <Crud requestUrl="courses" title="课程管理" :fields="fields"></Crud>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
@Component({})
export default class Course extends Vue {
  fields = [
    { prop: "_id", label: "ID" },
    { prop: "name", label: "课程名称", formslot: true, isEdit: true },
    {
      prop: "cover",
      label: "课程封面图",
      formslot: true,
      isEdit: true,
      upload: "avatar-uploader"
    }
  ];
}
</script>

<style></style>
