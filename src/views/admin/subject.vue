<template>
  <div>
    <div style="width: 80%;margin: 0 auto;">
      <router-link to="/index">首页</router-link>
      <el-button
        type="success"
        @click="toAdd"
      >添加</el-button>
    </div>
    <el-table
      :data="subjects"
      style="width: 80%;margin:0 auto"
    >
      <el-table-column
        prop="id"
        label="编号"
        width="150"
      />
      <el-table-column
        prop="subjectNo"
        label="课程编号"
        width="150"
      />
      <el-table-column
        prop="name"
        label="课题名称"
        width="120"
      />

      <el-table-column
        prop="origin"
        label="课题来源"
        width="120"
      />
      <el-table-column
        prop="participant"
        label="参与者"
        width="120"
      />
      <el-table-column
        prop="fee"
        label="课题费用"
        width="120"
      />

      <el-table-column
        prop="rank"
        label="课题等级"
        width="120"
      />
      <el-table-column
        prop="period"
        label="课题周期"
        width="120"
      />

      <el-table-column
        fixed="right"
        label="操作"
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
    title="项目编辑"
  >
    <el-form :model="subject">
      <el-form-item
        label="课程编号"
        :label-width="formLabelWidth"
      >
        <el-input
          v-model="subject.subjectNo"
          autocomplete="off"
        />
      </el-form-item>
      <el-form-item
        label="课程等级"
        :label-width="formLabelWidth"
      >
        <el-input
          v-model="subject.rank"
          autocomplete="off"
        />
      </el-form-item>
      <el-form-item
        label="课程周期"
        :label-width="formLabelWidth"
      >
        <el-input
          v-model="subject.period"
          autocomplete="off"
        />
      </el-form-item>
      <el-form-item
        label="参与者"
        :label-width="formLabelWidth"
      >
        <el-input
          v-model="subject.participant"
          autocomplete="off"
        />
      </el-form-item>
      <el-form-item
        label="课程来源"
        :label-width="formLabelWidth"
      >
        <el-input
          v-model="subject.origin"
          autocomplete="off"
        />
      </el-form-item>

      <el-form-item
        label="课程名称"
        :label-width="formLabelWidth"
      >
        <el-input
          v-model="subject.name"
          autocomplete="off"
        />
      </el-form-item>

      <el-form-item
        label="是否结项"
        :label-width="formLabelWidth"
      >
        <el-select
          v-model="subject.finished"
          placeholder="请选择"
        >
          <el-option
            label="否"
            :value="0"
          />
          <el-option
            label="是"
            :value="1"
          />
        </el-select>
      </el-form-item>

      <el-form-item
        label="课程费用"
        :label-width="formLabelWidth"
      >
        <el-input-number
          v-model="subject.fee"
          autocomplete="off"
        />
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
import { getOne, updateOne, addOne, getPage } from "@/http/subject";
import { cloneDeep } from "lodash-es";
export default defineComponent({
  data() {
    return {
      subjects: [],
      page: {
        total: 0,
        current: 1,
        size: 10,
      },
      dialogFormVisible: false,
      subject: {
        id: 0,
        name: "",
        finished: 0,
      },
      formLabelWidth: 80,
    };
  },
  mounted() {
    this.getSubjectsPage(1);
  },
  methods: {
    toEdit(subject) {
      console.log(subject);
      this.dialogFormVisible = true;
      this.subject = cloneDeep(subject);
    },
    getSubjectsPage(current) {
      const data = {
        current: current,
        size: 10,
        colums: [],
      };
      getPage(data)
        .then((res) => {
          console.log(res);
          const page = res.data.page;
          this.subjects = page.records;
          this.page = page;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    currentchange(current) {
      // console.log(current);
      this.getSubjectsPage(current);
      this.page.current = current; //数据更新到目前显示的页面
    },
    toAdd() {
      this.dialogFormVisible = true;
      this.subject = {
        id: 0,
        name: "",
        finished: 0,
      };
    },
    save() {
      const subject = this.subject;
      if (subject.id == 0) {
        addOne(subject).then((res) => {
          if (res.success) {
            this.dialogFormVisible = false;
            this.getSubjectsPage(this.page.current);
            ElMessage(res.msg);
          } else {
            ElMessage(res.msg);
            return false;
          }
        });
        updateOne.catch((err) => {
          ElMessage("网络错误联系管理员");
        });
      } else {
        subject
          .then((res) => {
            if (res.success) {
              this.dialogFormVisible = false;
              this.getSubjectPage(this.page.current);
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