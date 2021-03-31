<template>
  <div>

    <div class="form-group">
      <vs-select
          class="selectExample"
          label="نقش مورد نظر را انتخاب کنید:"
          v-model="role_id"
          @change="getRolePermissions"
      >
        <vs-select-item :key="index" :value="item.value" :text="item.text" v-for="(item,index) in roles_list"/>
      </vs-select>
    </div>
    <br>
    <br>
    <div class="form-group">
      <vs-select
          class="selectExample"
          label="مجوزهای مورد نظر را انتخاب کنید:"
          v-model="permissions_ids"
          multiple
          autocomplete
      >
        <vs-select-item dir="ltr" :key="index" :value="item.value" :text="item.text"
                        v-for="(item,index) in permissions_list"/>
      </vs-select>
    </div>

    <div class="form-group" style="margin-top: 40px">
      <span @click="submit" class="submit_button">
        ثبت
      </span>
    </div>

  </div>
</template>

<script>
import RoleService from "@/services/Roles/RoleService";
import HelperClass from "@/services/HelperClass";
import store from "@/store/vuex";

export default {
  name: "AssignPermission",
  data() {
    return {
      roles_list: [],
      permissions_list: [],
      role_id: '',
      permissions_ids: [],
      permissions: [],
    }
  },
  created() {
    this.$store.state.pageTitle = 'اختصاص مجوز به نقش ها';
    this.getRoles();
    this.getPermissions();
  },
  methods: {
    getRoles() {
      RoleService.getListOfTheRoles('select_box')
          .then(res => {
            this.roles_list = [];
            if (res.status === 204) {
              this.roles_list.push({text: 'نقشی تعریف نشده است', value: 0})
              this.role_id = 0
              return;
            }
            this.roles_list.push({text: 'نقش مورد نظر را انتخاب کنید', value: 0})
            this.role_id = 0
            res.data.data.forEach(item => {
              this.roles_list.push({text: item.fa_name, value: item.id})
            })
          }).catch(error => {

        HelperClass.showErrors(error, this.$noty)

      })
    },
    getPermissions() {
      RoleService.getPermissions()
          .then(res => {
            this.permissions_list = [];
            if (res.status === 204) {
              this.permissions_list.push({text: 'هیچ مجوزی  ثبت نشده است', value: 0});
              this.permissions_ids.push(0);
              return;
            }
            res.data.data.forEach(item => {
              this.permissions_list.push({text: item.fa_name, value: item.id})
            })
            this.permissions_ids = [];
            this.permissions_ids = [this.permissions_list[0].value]
          }).catch(error => {
        HelperClass.showErrors(error, this.$noty)
      })
    },
    getRolePermissions() {
      if (this.role_id !== 0) {
        RoleService.getRolePermissions(this.role_id)
            .then(res => {
              this.permissions_ids = [];
              if (res.status === 204) {
                this.permissions_ids.push(0);
                return;
              }
              res.data.data.forEach(item => {
                this.permissions_ids.push(item.id)
              })
            }).catch(error => {
          HelperClass.showErrors(error, this.$noty)
        })
      }
    },
    getValues() {
      this.permissions_ids=this.permissions_ids.filter(item=>{
        return item!==0;
      })
      return {
        ids: this.permissions_ids
      }
    },
    makeEmptyValues() {
      this.getRoles();
      this.getPermissions();
    },

    submit() {
      store.state.loading = true;
      let data = this.getValues();
      RoleService.assignPermissionsToRole(data, this.role_id)
          .then(() => {
            HelperClass.showSuccess(this.$noty)
            HelperClass.scrollTop();
            this.makeEmptyValues();
          }).catch(error => {
        HelperClass.showErrors(error, this.$noty)
      })

    }
  }
}
</script>

<style scoped>
.con-select {
  width: 90% !important;
}
</style>