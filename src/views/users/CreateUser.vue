<template>
  <div>
    <label>
      نام کاربر :
    </label>
    <div class="form-group">

      <VueInputUi autocomplete="off" type="array" label="نام کاربر..." v-model="name"/>

    </div>
    <label>
      نام خانوادگی کاربر :
    </label>
    <div class="form-group">

      <VueInputUi autocomplete="off" type="array" label="نام خانوادگی کاربر..." v-model="family"/>
    </div>
    <label>
      شماره تماس کاربر :
    </label>
    <div class="form-group">

      <VueInputUi autocomplete="off" type="array" label="شماره همراه کاربر..." v-model="cell"/>
    </div>
    <label>
      تکرا شماره تماس کاربر :
    </label>
    <div class="form-group">

      <VueInputUi autocomplete="off" type="array" label="شماره همراه کاربر..." v-model="confirm_cell"/>
    </div>
    <label>
      ایمیل کاربر :
    </label>
    <div class="form-group">

      <VueInputUi autocomplete="off" type="array" label="شماره همراه کاربر..." v-model="email"/>
    </div>
    <label>
      تکرار ایمیل :
    </label>
    <div class="form-group">

      <VueInputUi autocomplete="off" type="array" label="شماره همراه کاربر..." v-model="confirm_email"/>
    </div>
    <label>
      رمز عبور پیش فرض :
    </label>
    <div class="form-group">

      <VueInputUi autocomplete="off" type="array" label="شماره همراه کاربر..." v-model="password"/>
    </div>
    <label>
      تکرار رمز عبور:
    </label>
    <div class="form-group">

      <VueInputUi autocomplete="off" type="array" label="شماره همراه کاربر..." v-model="confirm_password"/>
    </div>

    <div style="margin-bottom: 40px">
      <vs-select
          placeholder="انتخاب نقش..."
          class="selectExample"
          label="انتخاب نقش :"
          v-model="role_id"

      >
        <vs-select-item :key="index" :value="item.value" :text="item.text" v-for="(item,index) in role_list"/>
      </vs-select>
    </div>


    <label>
      عکس پروفایل(الزامی) :
    </label>
    <file-upload></file-upload>

    <div class="form-group">
            <span @click="submit" class="submit_button">
                ثبت
            </span>
    </div>

    <div style="height: 300px"></div>
  </div>
</template>

<script>
import RoleService from "@/services/Roles/RoleService";
import FileUpload from "@/components/FileUpload";
import HelperClass from "@/services/HelperClass";
import UserService from "@/services/User/UserService";

const VueInputUi = () => import('vue-input-ui');
export default {
  name: "CreateArticleCategory",
  data() {
    return {
      name: '',
      family: '',
      cell: '',
      email: '',
      password: '',
      confirm_password: '',
      confirm_email: '',
      confirm_cell: "",
      role_id: '',
      role_list: [],
    }
  },
  created() {
    this.$store.state.pageTitle = 'ایجاد کاربر جدید';
    this.getRoles()
  },
  components: {
    VueInputUi,
    FileUpload,
  },
  computed: {
    statusCondition() {
      return this.status ? 'فعال' : 'غیر فعال'
    }
  },
  methods: {
    getRoles() {
      RoleService.getListOfTheRoles('select_box')
          .then(res => {
            if (res.status === 204) {
              this.role_list.push({text: "هیچ نقشی در سیستم ثب نشده است", value: 0});
              this.role_id = 0;
              return
            }
            res.data.data.forEach(item => {
              this.role_list.push({text: item.name, value: item.id})
            })
            this.role_id = this.role_list[0].value;
          }).catch(error => {
        HelperClass.showErrors(error, this.$noty)
      })
    },

    makeEmptyValues() {
      this.getRoles();
      this.email = '';
      this.cell = '';
      this.confirm_email = '';
      this.confirm_cell = '';
      this.confirm_password = '';
      HelperClass.removeAllImagePreviews();
      this.name='';
      this.family='';
      this.password='';
    },
    getValues() {
      let formData = new FormData();
      formData.append('name', this.name);
      formData.append('family', this.family);
      formData.append('email', this.email);
      formData.append('confirm_email', this.confirm_email);
      formData.append('cell', this.cell);
      formData.append('confirm_cell', this.confirm_cell);
      formData.append('password', this.password);
      formData.append('confirm_password', this.confirm_password);
      formData.append('file', this.$store.state.file)
      formData.append('role_id', this.role_id)
      return formData;
    },
    submit() {
      this.$store.state.loading = true;

      let data = this.getValues()

      UserService.storeNewUser(data)
          .then(() => {
            HelperClass.showSuccess(this.$noty);
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

</style>