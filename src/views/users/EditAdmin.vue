<template>
  <div style="width: 90%;margin: auto">
    <label>
      نام کاربر:
    </label>
    <div class="form-group">
      <VueInputUi type="array" label="نام تگ به فارسی..." v-model="name"/>
    </div>
    <label>
      نام خانوادگی:
    </label>
    <div class="form-group">
      <VueInputUi type="array" label="نام تگ به انگلیسی..." v-model="family"/>
    </div>  <div class="form-group">
    <vs-select
        class="selectExample"
        label="نقش مورد نظر را انتخاب کنید:"
        v-model="role_id"
    >
      <vs-select-item :key="index" :value="item.value" :text="item.text" v-for="(item,index) in roles_list"/>
    </vs-select>
  </div>

    <label>
      ایمیل:
    </label>
    <div class="form-group">
      <VueInputUi type="array" label="نام تگ به انگلیسی..." v-model="email"/>
    </div>
    <label>
      شماره تلفن:
    </label>
    <div class="form-group">
      <VueInputUi dir="ltr" v-mask="'(####) ###-####'" type="array" label="(0912) 712-4321" v-model="cell"/>
    </div>
    <label>
      رمز عبور:
    </label>
    <div class="form-group">
      <VueInputUi type="array" label="نام تگ به انگلیسی..." v-model="password"/>
    </div>
    <label>
      تکرار رمز عبور:
    </label>
    <div class="form-group">
      <VueInputUi type="array" label="نام تگ به انگلیسی..." v-model="confirm_password"/>
    </div>

    <template v-if="profile_image_name">
      <file-upload :src="profile_image_name">
      </file-upload>
    </template>

    <template v-else>
      <file-upload>
      </file-upload>
    </template>


    <div class="form-group">
            <span @click="submit" class="submit_button">
                ثبت
            </span>
    </div>


  </div>
</template>

<script>
import UserService from "@/services/User/UserService";
import FileUpload from "@/components/FileUpload";
import HelperClass from "@/services/HelperClass";
import RoleService from "@/services/Roles/RoleService";
const VueInputUi = () => import('vue-input-ui');
export default {
  name: "CreateTag",
  created() {
    this.$store.state.pageTitle = 'ویرایش مدیر';
    this.getRoles();
    this.getUserInfo()
  },
  data() {
    return {
      name: '',
      family: '',
      email: '',
      cell: '',
      role_id:'',
      roles_list:[],
      password: '',
      confirm_password: '',
      profile_image_name: false
    }
  },

  methods: {
    getRoles() {
      RoleService.getListOfTheRoles('')
          .then(res => {
            this.roles_list = [];
            if (res.status === 204) {
              this.roles_list.push({text: 'نقشی تعریف نشده است', value: 0})
              this.role_id = 0
              return;
            }
            res.data.data.forEach(item => {
              this.roles_list.push({text: item.fa_name, value: item.id})
            })
          }).catch(error => {
        HelperClass.showErrors(error, this.$noty)

      })
    },
    getValues() {
      let value_one=this.cell.replace('(','');
      let value_two=value_one.replace(')','');
      let value_three=value_two.replace(' ','');
      let value_four=value_three.replace('-','')
      this.cell=value_four;
      let formData = new FormData();
      formData.append('cell', this.cell);
      formData.append('email', this.email);
      formData.append('password', this.password.trim() === '' ? 0 : this.password)
      formData.append('confirm_password', this.confirm_password);
      formData.append('name', this.name);
      formData.append('family', this.family);
      formData.append('role_id',this.role_id)
      formData.append('file', this.$store.state.file===null?0 :this.$store.state.file)
      return formData;
    },
    submit() {
      this.$store.state.loading=true;
      let values = this.getValues();

      UserService.updateAdmin(this.$route.params.id, values)
          .then(() => {

            this.$router.push({name: 'users-admin-list'})

          }).catch(error => {

        HelperClass.showErrors(error, this.$noty)

      })

    },
    getUserInfo() {
      UserService.getUserInfo(this.$route.params.id)
          .then(res => {
            this.cell = res.data.data.cell;
            this.email = res.data.data.email;
            this.name = res.data.data.name;
            this.family = res.data.data.family;
            this.role_id=res.data.role.id;

            if (res.data.data.profile_image_name != null) {
              this.profile_image_name = `${this.$store.state.baseUrl}/storage/images/users/profile-image/${this.$route.params.id}/${res.data.data.profile_image_name}`;
            }

          }).catch(error => {
        if (error.response.status === 404) {
          this.$router.push({name: 'not-found'})
        }
        HelperClass.showErrors(error, this.$noty)
      })
    }
  },
  components: {
    VueInputUi,
    FileUpload
  },
  computed: {
    statusCondition() {
      return this.status ? 'فعال' : 'غیر فعال'
    }
  },
  mounted() {

  }
}
</script>

<style scoped>

</style>