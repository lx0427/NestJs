<template>
  <div>
    <Crud requestUrl="users" title="用户管理" :fields="fields"></Crud>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
@Component({})
export default class User extends Vue {
  fields = [
    { prop: "_id", label: "ID" },
    { prop: "username", label: "用户名", formslot: true },
    { prop: "password", label: "密码", formslot: true, isEdit: true }
  ];
}
</script>

<style></style>