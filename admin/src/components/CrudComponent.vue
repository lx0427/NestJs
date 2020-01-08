<template>
  <div>
    <el-form v-if="canSearch" :inline="true" size="medium" class="demo-form-inline" :model="searchForm"
             label-width="80px">
      <template v-for="(item,i) in fields">
        <el-form-item v-if="item.isSearch" :key="i" :label="item.label">
          <el-select v-if="item.dicData" clearable v-model="searchForm[item.prop]" placeholder="请选择">
            <el-option v-for="item in item.dicData" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
          <el-input v-else clearable v-model="searchForm[item.prop]" autocomplete="off"></el-input>
        </el-form-item>
      </template>
      <el-form-item>
        <el-button size="medium" type="primary" @click="search">查询</el-button>
      </el-form-item>
    </el-form>
    <el-button style="margin-bottom:10px" type="primary" size="small" @click="addClick">新增</el-button>
    <el-table @sort-change="sortChange" size="small" :data="data" stripe border style="width: 100%">
      <template v-for="(item,i) in fields">
        <el-table-column v-if="!item.upload" :sortable="item.sortable" :prop="item.prop" :label="item.label" :key="i"
                         :formatter="item.dicData?formatter:item.formatter?item.formatter:null">
        </el-table-column>
        <el-table-column v-else :prop="item.prop" :label="item.label" :key="i">
          <template slot-scope="{row}">
            <img :src="row[item.prop]" style="width:100px" alt="">
          </template>
        </el-table-column>
      </template>
      <el-table-column label="操作">
        <template slot-scope="{row}">
          <el-button size="small" type="primary" @click="editClick(row)">编辑</el-button>
          <el-button size="small" type="danger" @click="remove(row._id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination style="margin-top: 10px;" @size-change="handleSizeChange" @current-change="handleCurrentChange"
                   :page-sizes="pageOption.pageSizes" :page-size="pageOption.pageSize"
                   layout="total, sizes, prev, pager, next, jumper" :total="pageOption.total">
    </el-pagination>

    <el-dialog :title="title" :visible.sync="dialogFormVisible" :close-on-click-modal="false">
      <el-form :model="form" label-width="100px">
        <template v-for="(item,i) in fields">
          <el-form-item v-if="editId&&item.isEdit || (!editId&&item.formslot)" :key="i" :label="item.label">
            <upload-file v-if="item.upload" :key="i" :upload-class="item.upload" :url.sync="form[item.prop]"></upload-file>
            <el-select v-else-if="item.dicData" v-model="form[item.prop]" placeholder="请选择">
              <el-option v-for="item in item.dicData" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
            <el-input v-else v-model="form[item.prop]" autocomplete="off"></el-input>
          </el-form-item>
        </template>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible=false">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import UploadFile from "./UploadFile.vue";
@Component({
  components: {
    UploadFile
  }
})
export default class CrudComponent extends Vue {
  handleAvatarSuccess(res, file, c) {
    global.console.log(res, file, c, "handleAvatarSuccess");
  }
  // Property 'requestUrl' has no initializer and is not definitely assigned in the constructor.
  // 使用!:
  // 请求url
  @Prop(String) requestUrl!: string;
  // 标题
  @Prop(String) title!: string;
  // 表格表单字段
  @Prop(Array) fields!: Array<any>;
  // 分页器
  @Prop(Object) pages!: any;
  // 分页默认值
  pageOption = this.pages || {
    pageSizes: [10, 20, 30, 50, 100],
    total: 0,
    pageSize: 10,
    page: 1
  };
  // 查询参数
  query: any = {
    limit: this.pageOption.pageSize,
    page: this.pageOption.page
  };
  // 弹框显示隐藏
  dialogFormVisible = false;
  form: any = {};
  // 查询表格
  searchForm: any = {};
  canSearch = false;
  data = [];
  editId = ""; // 编辑数据id
  formatter(row, column) {
    let temp = this.fields.find(v => v.prop === column.property).dicData || [];
    let filter = temp.find(v => v.value === row.course);
    // global.console.log(temp, row.course, column.property, 123);
    return (filter && filter.label) || "";
  }
  sortChange(column, prop, order) {
    switch (column.order) {
      case "ascending":
        this.query.sort = column.prop;
        break;
      case "descending":
        this.query.sort = "-" + column.prop;
        break;
      default:
        delete this.query.sort;
    }
    this.fetch();
  }
  // 点击新增
  addClick() {
    this.form = {};
    this.fields.forEach(v => {
      if (v.formslot) {
        this.$set(this.form, v.prop, "");
      }
    });
    this.editId = "";
    this.dialogFormVisible = true;
  }
  // 点击编辑
  editClick(row) {
    this.fields.forEach(v => {
      if (v.formslot && v.isEdit) {
        this.$set(this.form, v.prop, row[v.prop]);
      }
    });
    this.editId = row._id;
    this.dialogFormVisible = true;
  }
  handleSizeChange(pageSize) {
    this.query.limit = pageSize;
    this.fetch();
  }
  handleCurrentChange(page) {
    this.query.page = page;
    this.fetch();
  }
  search() {
    let params = {};
    for (const key in this.searchForm) {
      let val = this.searchForm[key];
      if (val) {
        params[key] = this.fields.find(v => v.prop === key && v.regex)
          ? { $regex: val }
          : val;
      }
    }
    global.console.log(params);
    this.query.where = params;
    this.fetch();
  }
  async fetch() {
    let res = await this.$http.get(`${this.requestUrl}`, {
      params: {
        query: this.query
      }
    });
    this.data = res.data.data || [];
    this.pageOption.total = res.data.total || 0;
  }
  async submit() {
    let params = {};
    if (this.editId) {
      await this.$http.put(`${this.requestUrl}/${this.editId}`, this.form);
    } else {
      await this.$http.post(`${this.requestUrl}`, this.form);
    }
    this.$message.success("操作成功！");
    this.dialogFormVisible = false;
    this.fetch();
  }
  async remove(id) {
    try {
      await this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      });
      await this.$http.delete(`${this.requestUrl}/${id}`);
      this.$message.success("删除成功！");
      this.fetch();
    } catch {
      this.$message.info("取消删除！");
    }
  }
  created() {
    this.fields.forEach(v => {
      if (v.isSearch) {
        !this.canSearch && (this.canSearch = true);
        this.$set(this.searchForm, v.prop, "");
      }
    });
    global.console.log(this.searchForm);
    this.fetch();
  }
}
</script>

<style></style>