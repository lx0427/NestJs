<template>
  <div>
    <Crud v-if="dicData.length" requestUrl="episodes" title="课时管理" :fields="fields"></Crud>
    <!-- <Crud requestUrl="episodes" title="课时管理" :fields="fields" :pages="pages"></Crud> -->
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
@Component({})
export default class Episode extends Vue {
  dicData = [];
  fields = [];
  pages = {
    pageSizes: [2, 3, 5, 10],
    total: 0,
    pageSize: 2,
    page: 1
  };

  async getDicData() {
    this.dicData = (await this.$http.get("courses")).data.data.map(v => ({
      value: v._id,
      label: v.name
    }));
    this.fields = [
      {
        sortable: true,
        prop: "title",
        label: "课时名称",
        formslot: true,
        isEdit: true,
        isQuery: true
      },
      { prop: "file", label: "课时文件", formslot: true, isEdit: true },
      {
        prop: "course",
        label: "所属课程",
        formslot: true,
        isEdit: true,
        dicData: this.dicData,
        isQuery: true
      }
    ];
    // global.console.log(this.dicData);
  }
  mounted() {
    this.getDicData();
  }
  created() {}
}
</script>

<style></style>