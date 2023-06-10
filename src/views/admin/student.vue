<template>
  <div>
    <div style="width: 80%;margin: 0 auto;">
      <router-link to="/index">首页</router-link>
      <el-form-item
        label="学生"
        :label-width="80"
        style="display:inline-flex; margin-right: 10px;"
      >
        <el-input
          v-model="searchNo"
          placeholder="请输入学生学号"
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
      :data="Students"
      style="width: 80%; margin: 0 auto"
    >
      <el-table-column
        fixed
        prop="id"
        label="序号"
        width="50"
      />
      <el-table-column
        prop="studentNo"
        label="	学号"
        width="120"
      />
      <el-table-column
        prop="studentName"
        label="姓名"
        width="120"
      />
      <el-table-column
        prop="school"
        label="学校"
        width="120"
      />
      <el-table-column
        prop="major"
        label="专业"
        width="120"
      />
      <el-table-column
        prop="depart"
        label="部门"
        width="120"
      />
      <el-table-column
        prop="major"
        label="专业"
        width="120"
      />
      <el-table-column
        prop="classinfo"
        label="班级"
        width="120"
      />
      <el-table-column
        label="创建时间"
        width="200"
      >
        <template #default="scope">
          {{this.transformTimestamp(scope.row.createTime)}}
        </template>
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="100"
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
  </div>
  <el-dialog
    v-model="dialogFormVisible"
    title="学生编辑"
  >
    <el-form :model="Student">
      <el-form-item
        label="学号"
        :label-width="formLabelWidth"
      >
        <el-input
          v-model="Student.studentNo"
          autocomplete="off"
        />
      </el-form-item>
      <el-form-item
        label="姓名"
        :label-width="formLabelWidth"
      >
        <el-input
          v-model="Student.studentName"
          autocomplete="off"
        />
      </el-form-item>
      <el-form-item
        label="班级"
        :label-width="formLabelWidth"
      >
        <el-input
          v-model="Student.classinfo"
          autocomplete="off"
        />
      </el-form-item>

      <el-form-item
        label="学校"
        :label-width="formLabelWidth"
      >
        <el-input
          v-model="Student.school"
          autocomplete="off"
        />
      </el-form-item>
      <el-form-item
        label="专业"
        :label-width="formLabelWidth"
      >
        <el-input
          v-model="Student.major"
          autocomplete="off"
        />
      </el-form-item>
      <el-form-item
        label="部门"
        :label-width="formLabelWidth"
      >
        <el-input
          v-model="Student.depart"
          autocomplete="off"
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible = false">Cancel</el-button>
        <el-button
          type="primary"
          @click="save"
        >
          保存
        </el-button>
      </span>
    </template>
  </el-dialog>

  <template><el-input
      v-model="input"
      placeholder="Please input"
    /></template>
</template>

<script>
import { defineComponent } from "vue";
//
import {
  getAll,
  addOne,
  updateOne,
  delOne,
  queryByStudetnNo,
} from "@/http/student";
import { ElMessage } from "element-plus";
import { cloneDeep } from "lodash-es";
export default defineComponent({
  data() {
    return {
      input: "",
      Students: [],
      dialogFormVisible: false,
      Student: {
        id: 0,
      },
      searchNo: "",
      formLabelWidth: 80,
    };
  },
  mounted() {
    this.getStudentList();
  },
  methods: {
    research() {
      this.searchNo = "";
      this.getStudentList();
    },
    search() {
      if (this.searchNo == "") {
        alert("请输入学生学号后进行查询");
        return;
      }
      queryByStudetnNo(this.searchNo)
        .then((res) => {
          console.log(res);
          this.Students=[];
          this.Students.push(res.data.student)
          console.log(this.Students);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    toEdit(student) {
      this.dialogFormVisible = true;
      this.Student = cloneDeep(student);
    },
    //时间转换
    transformTimestamp(timestamp) {
      let a = new Date(timestamp).getTime();
      const date = new Date(a);
      const Y = date.getFullYear() + "-";
      const M =
        (date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1) + "-";
      const D =
        (date.getDate() < 10 ? "0" + date.getDate() : date.getDate()) + "  ";
      const h =
        (date.getHours() < 10 ? "0" + date.getHours() : date.getHours()) + ":";
      const m =
        date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
      // const s = date.getSeconds(); // 秒
      const dateString = Y + M + D + h + m;
      // console.log('dateString', dateString); // > dateString 2021-07-06 14:23
      return dateString;
    },
    getStudentList() {
      getAll()
        .then((res) => {
          console.log(res);
          this.Students = res.data.students;
          console.log(this.Students);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    del(id) {
      delOne(id)
        .then((res) => {
          if (res.success) {
            this.getStudentList();
          } else {
            console.log(res.msg);
            return false;
          }
        })
        .catch((err) => {});
    },
    toAdd() {
      //到添加的页面
      this.dialogFormVisible = true;
    },
    save() {
      const student = this.Student;
      if (student.id == 0) {
        addOne(student)
          .then((res) => {
            if (res.success) {
              //刷新页面
              this.dialogFormVisible = false;
              this.getStudentList();
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
        updateOne(student)
          .then((res) => {
            if (res.success) {
              //刷新页面
              this.dialogFormVisible = false;
              this.getStudentList();
              ElMessage(res.msg);
            } else {
              ElMessage(res.msg);
              return false;
            }
          })
          .catch((err) => {
            ElMessage("网络错误联系管理员");
          });
      }
    },
  },
});
</script>

<style lang="scss" scoped></style>
