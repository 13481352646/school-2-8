<template>
  <div>
    <div style="width: 80%;margin: 0 auto;">
      <router-link to="/index">首页</router-link>
      <el-form-item
        label="id"
        :label-width="80"
        style="display:inline-flex; margin-right: 10px;"
      >
        <el-input
          v-model="searchid"
          placeholder="请输入班级ID"
        ></el-input>
      </el-form-item>

      <el-button
        type="primary"
        @click="search"
      >查询</el-button>

      <el-button
        type="warning"
        @click="research"
      >重置</el-button>

      <el-button
        type="success"
        @click="toAdd"
      >添加</el-button>
    </div>
    <el-table
      :data="classinfos"
      style="width: 80%;margin:0 auto"
    >
      <el-table-column
        prop="id"
        label="班级编号"
        width="150"
      />
      <el-table-column
        prop="name"
        label="班级名称"
        width="120"
      />
      <el-table-column
        prop="major"
        label="专业"
        width="120"
      />
      <el-table-column
        prop="depart"
        label="学院"
        width="120"
      />
      <el-table-column
        prop="school"
        label="学校"
        width="120"
      />
      <el-table-column
        label="状态"
        width="120"
      >
        <template #default="scope">
          {{scope.row.state == 0 ?'未启用':'启用'}}
        </template>
      </el-table-column>
      <el-table-column
        fixed="right"
        label="功能管理"
        width="120"
      >
        <template #default="scope">
          <el-button
            link
            type="primary"
            size="small"
            @click="toEdit(scope.row)"
          >更新</el-button>
          <el-button
            link
            type="primary"
            size="small"
            @click="del(scope.row.id)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      layout="prev, pager, next"
      :page-size="page.size"
      :total="page.total"
      @current-change="currentchange"
    />
  </div>
  <el-dialog
    v-model="dialogFormVisible"
    title="班级编辑"
  >
    <el-form :model="classinfo">
      <el-form-item
        label="班级名称"
        :label-width="formLabelWidth"
      >
        <el-input
          v-model="classinfo.name"
          autocomplete="off"
        />
      </el-form-item>
      <el-form-item
        label="专业"
        :label-width="formLabelWidth"
      >
        <el-input
          v-model="classinfo.major"
          autocomplete="off"
        />
      </el-form-item>
      <el-form-item
        label="学院"
        :label-width="formLabelWidth"
      >
        <el-input
          v-model="classinfo.depart"
          autocomplete="off"
        />
      </el-form-item>
      <el-form-item
        label="学校"
        :label-width="formLabelWidth"
      >
        <el-input
          v-model="classinfo.school"
          autocomplete="off"
        />
      </el-form-item>
      <el-form-item
        label="状态"
        :label-width="formLabelWidth"
      >
        <el-select
          v-model="classinfo.state"
          placeholder="请选择"
        >
          <el-option
            label="启用"
            :value="1"
          />
          <el-option
            label="未启用"
            :value="0"
          />
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button
          type="primary"
          @click="save"
        >保存
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
import { defineComponent } from "vue";
import {
  classinfoone,
  classinfoAdd,
  classinfoEdit,
  classinfoDelId,
  classinfoPage,
  queryBySchoolName,
} from "../../http/classinfo";
import { cloneDeep } from "lodash-es";
export default defineComponent({
  data() {
    return {
      input: "",
      classinfos: [],
      page: {
        total: 0,
        current: 1,
        size: 10,
      },
      searchid: "",
      dialogFormVisible: false,
      classinfo: {
        id: 0,
        name: "",
        major: "",
        depart: "",
        school: "",
        state: 1,
      },
      formLabelWidth: 80,
    };
  },
  mounted() {
    this.getclassinfosPage(1);
  },
  methods: {
    research() {
      this.searchid = "";
      this.getclassinfosPage(1);
    },
    search() {
      if (this.searchid == "") {
        alert("请输入班级名称后查询");
        return;
      }
      classinfoone(this.searchid)
        .then((res) => {
          console.log(res);
          this.classinfos = Array.from(res.data.classinfo);
          console.log(this.classinfos);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    toEdit(classInfo) {
      console.log(classInfo);
      this.dialogFormVisible = true;
      this.classinfo = cloneDeep(classInfo);
    },
    getclassinfosPage(current) {
      const data = {
        current: current,
        size: 10,
      };
      classinfoPage(data)
        .then((res) => {
          console.log(res);
          // const page = res.data.page.records;
          this.classinfos = res.data.page.records;
          // this.page = page;
          console.log(this.classinfos);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    currentchange(current) {
      // console.log(current);
      this.getclassinfosPage(current);
      this.page.current = current; //数据更新到目前显示的页面
    },
    del(id) {
      if (confirm("是否删除") == true) console.log(id);
      console.log(id);
      const params = {
        id: id,
      };
      classinfoDelId(params)
        .then((res) => {
          if (res.success) {
            this.getclassinfoPage(this.page.current);
          } else {
            console.log(res.msg);
            return false;
          }
        })
        .catch((err) => {});
    },
    toAdd() {
      this.dialogFormVisible = true;
      this.classinfo = {
        id: 0,
        name: "",
        major: "",
        depart: "",
        school: "",
        state: 1,
      };
    },
    save() {
      const classInfo = this.classinfo;
      if (classInfo.id == 0) {
        classinfoAdd(classInfo)
          .then((res) => {
            if (res.success) {
              this.dialogFormVisible = false;
              this.getclassinfosPage(this.page.current);
              ElMessage(res.msg);
            } else {
              ElMessage(res.msg);
              return false;
            }
          })
          .catch((err) => {
            ElMessage("网络错误联系管理员");
          });
      } else {
        classinfoEdit(classInfo)
          .then((res) => {
            if (res.success) {
              this.dialogFormVisible = false;
              this.getclassinfoPage(this.page.current);
              ElMessage(res.msg);
            } else {
              ElMessage(res.msg);
              return false;
            }
          })
          .catch((err) => {
            ElMessage("添加成功");
          });
      }
    },
  },
});
</script>
<style lang = "scss" scoped></style>