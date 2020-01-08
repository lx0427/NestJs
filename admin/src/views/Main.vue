<template>
  <div>
    <el-container>
      <el-aside width="200px">
        <el-menu mode="vertical" style="height:100vh" :default-active="$route.path" router>
          <template v-for="(submenus, index) in menus">
            <el-menu-item v-if="!submenus.children" :key="index" :index="submenus.path">
              <i class="el-icon-menu"></i>
              <span slot="title">{{submenus.title}}</span>
            </el-menu-item>
            <el-submenu v-else :key="index" index="/..">
              <template slot="title">{{submenus.title}}</template>
              <el-menu-item v-for="(item, subIndex) in submenus.children"
                            :index="item.path" :key="`submenus-${subIndex}`">
                {{item.title}}
              </el-menu-item>
            </el-submenu>
          </template>

        </el-menu>

      </el-aside>
      <el-container>
        <el-header height="">
          <h1>后台管理系统</h1>
        </el-header>
        <el-main height="">
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>

  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
@Component({})
export default class Main extends Vue {
  menus = [
    { path: "/", title: "首页" },
    {
      title: "内容管理",
      children: [
        { path: "/course", title: "课程管理" },
        { path: "/episode", title: "课时管理" }
      ]
    },
    {
      title: "运营管理",
      children: [
        // { path: "/user", title: "用户管理" },
        { path: "/user", title: "用户管理" }
      ]
    }
  ];
}
</script>

<style></style>