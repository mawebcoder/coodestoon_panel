<template>
  <div>

    <div style="margin-bottom: 40px">
      <vs-select
          class="selectExample"
          label="عنوان دپارتمان :"
          v-model="department_id"
          :disabled="disable_department_selection"
      >
        <vs-select-item :key="index" :value="item.value" :text="item.text"
                        v-for="(item,index) in departments"/>
      </vs-select>

    </div>
    <div style="margin-bottom: 40px">
      <vs-select
          class="selectExample"
          label="انتخاب اعضا :"
          v-model="users_id"
          multiple
      >
        <vs-select-item :key="index" :value="item.value" :text="item.text"
                        v-for="(item,index) in users"/>
      </vs-select>
    </div>
    <div class="form-group">
            <span @click="submit" class="submit_button">
                ثبت
            </span>
    </div>
  </div>
</template>

<script>
import DepartmentService from "@/services/Department/DepartmentService";
import HelperClass from "@/services/HelperClass";
import RoleService from "@/services/Roles/RoleService";

export default {
  name: "AssingUserToDepartment",
  data() {
    return {
      departments: [],
      department_id: '',
      disable_department_selection: false,
      users: [],
      users_id: []
    }
  },
  created() {
    this.$store.state.pageTitle = 'تخصیص وظایف دپارتمان ها';
    this.getList()
  },
  methods: {
    getList() {
      DepartmentService.getListOfTheDepartments('select_box')
          .then(res => {
            this.departments = [];
            if (res.status === 204) {
              this.departments.push({text: 'دپارتمانی در سیستم وجود ندارد', value: 0})
              this.department_id = 0
              this.disable_department_selection = true;
              return;
            }
            let departments = res.data.data;
            departments.forEach(item => {
              this.departments.push({text: item.fa_name, value: item.id})
            })
            this.department_id = this.departments[0].value
          }).catch(error => {
        HelperClass.showErrors(error, this.$noty)
      })
      RoleService.getAllAdmins()
          .then(res => {
            this.users = [];
            this.users_id = [];
            if (res.status === 204) {
              this.users.push({text: 'هیچ کاربری وجود ندارد', value: 0})
              this.users_id.push(0)
              return;
            }
            let users = res.data.data;
            users.forEach(item => {
              this.users.push({text: item.name + ' ' + item.family, value: item.id})
            })
            this.users_id.push(this.users[0].value)
          }).catch(error => {
        HelperClass.showErrors(error, this.$noty)
      })
    },
    getValues() {
      return {
        ids: this.users_id
      }
    },
    submit() {
      let data = this.getValues();
      DepartmentService.AssignUsersToDepartment(this.department_id, data)
          .then(() => {
            HelperClass.showSuccess(this.$noty);
          }).catch(error => {
        HelperClass.showErrors(error, this.$noty)
      })
    }
  }

}
</script>

<style scoped>

</style>