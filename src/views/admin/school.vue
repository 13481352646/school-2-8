<template>
  <div>
    <div style="width: 80%;margin: 0 auto;">
      <router-link to="/index">首页</router-link>
      <el-form-item
        label="学校"
        :label-width="80"
        style="display:inline-flex; margin-right: 10px;"
      >
        <el-input
          v-model="searchNo"
          placeholder="请输入学校ID"
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
      :data="Schools"
      style="width: 80%;margin: 0 auto;"
    >
      <el-table-column
        fixed
        prop="id"
        label="序号"
        width="50"
      />
      <el-table-column
        prop="schoolName"
        label="学校名称"
        width="120"
      />
      <el-table-column
        prop="province"
        label="省"
        width="120"
      />

      <el-table-column
        prop="area"
        label="市|县"
        width="120"
      />
      <el-table-column
        prop="address"
        label="地址"
        width="120"
      />
      <el-table-column
        prop="description"
        label="学校说明"
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
            type="warning"
            size="small"
            @click="toEdit(scope.row)"
          >更新</el-button>
          <el-button
            link
            type="danger"
            size="small"
            @click="del(scope.row.id)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
  <el-dialog
    v-model="dialogFormVisible"
    title="学校编辑"
  >
    <el-form :model="School">
      <el-form-item
        label="学校名称"
        :label-width="formLabelWidth"
      >
        <el-input
          v-model="School.schoolName"
          autocomplete="off"
        />
      </el-form-item>
      <el-form-item
        label="省"
        :label-width="formLabelWidth"
      >
        <el-input
          v-model="School.province"
          autocomplete="off"
        />
      </el-form-item>
      <el-form-item
        label="市|县"
        :label-width="formLabelWidth"
      >
        <el-input
          v-model="School.area"
          autocomplete="off"
        />
      </el-form-item>

      <el-form-item
        label="城市"
        :label-width="formLabelWidth"
      >
        <el-input
          v-model="School.city"
          autocomplete="off"
        />
      </el-form-item>

      <el-form-item
        label="地址"
        :label-width="formLabelWidth"
      >
        <el-input
          v-model="School.address"
          autocomplete="off"
        />
      </el-form-item>

      <el-form-item
        label="经度"
        :label-width="formLabelWidth"
      >
        <el-input-number
          v-model="School.longitude"
          autocomplete="off"
        />
      </el-form-item>

      <el-form-item
        label="纬度"
        :label-width="formLabelWidth"
      >
        <el-input-number
          v-model="School.latitude"
          autocomplete="off"
        />
      </el-form-item>
      <el-form-item
        label="是否删除"
        :label-width="formLabelWidth"
      >
        <el-radio-group v-model="School.deleted">
          <el-radio :label="1">是</el-radio>
          <el-radio :label="0">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item
        label="学校说明"
        :label-width="formLabelWidth"
      >
        <el-input
          type="textarea"
          :rows="3"
          v-model="School.description"
        >
        </el-input>
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
  getOne,
  delOne,
  queryByEnable,
} from "@/http/school";
import { ElMessage } from "element-plus";
import { cloneDeep } from "lodash-es";
export default defineComponent({
  data() {
    return {
      input: "",
      Schools: [],
      searchEnable: null,
      dialogFormVisible: false,
      School: {
        id: 0,
        deleted: 0,
        latitude: 0,
        longitude: 0,
      },
      searchNo: "",
      formLabelWidth: 80,
    };
  },
  mounted() {
    this.getSchoolList();
  },
  methods: {
    research(){
      this.searchEnable = null;
      this.getSchoolList();
    },
    search() {
      if (this.searchNo == "") {
        alert("请输入后进行查询");
        return;
      }
      getOne(this.searchNo)
        .then((res) => {
          console.log(res);
          this.Schools=[];
          this.Schools.push(res.data.school);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    toEdit(School) {
      this.dialogFormVisible = true;
      this.School = cloneDeep(School);
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
    getSchoolList() {
      getAll()
        .then((res) => {
          console.log(res);
          this.Schools = res.data.schools;
          console.log(this.Schools);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    del(id) {
      delOne(id)
        .then((res) => {
          if (res.success) {
            this.getSchoolList();
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
      const School = this.School;
      if (School.id == 0) {
        addOne(School)
          .then((res) => {
            if (res.success) {
              //刷新页面
              this.dialogFormVisible = false;
              this.getSchoolList();
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
        updateOne(School)
          .then((res) => {
            if (res.success) {
              //刷新页面
              this.dialogFormVisible = false;
              this.getSchoolList();
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
  