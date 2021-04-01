<template>
  <div style="width: 90%;margin: auto">

    <vs-popup
        style="color:rgb(255,255,255)"
        dir="rtl"
        background-color="rgba(255,255,255,.6)"
        :background-color-popup="colorx" :title="popupTitle" :active.sync="popupActivo5">
      <div class="d-flex justify-content-center">
        <img class="bigger_image" :src="bigger_image">
      </div>
    </vs-popup>
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
      <file-upload :disable_file_input="true" :src="profile_image_name">
      </file-upload>
    </template>
    <template v-else>
        <file-upload>
        </file-upload>
    </template>
    <label style="display: block;margin-bottom: 20px">
      وضعیت :
    </label>
    <div class="form-group" dir="ltr" style="height: 19px">
      <p-check color="success" v-model="status" class="p-switch p-fill"></p-check>
    </div>

    <label style="display: block;margin: 20px 0">
      توضیحات کوتاه(الزامی) :
    </label>
    <div class="form-group" style="min-height: 200px">
      <vs-textarea height="300" label="اینجا وارد کنید..." v-model="description"/>
    </div>


    <label style="display: block;margin: 20px 0">
      توضیحات کوتاه(الزامی) :
    </label>
    <div class="form-group" style="min-height: 200px">
      <vs-textarea height="300" label="اینجا وارد کنید..." v-model="address"/>
    </div>

    <label>
      عکس کارت کارت ملی از جلو :
    </label>
    <template v-if="nationality_card_front">
        <file-upload :disable_file_input="true" :src="nationality_card_front">
        </file-upload>

      <span @click="showBiggerImage('front')" style="margin-bottom: 20px" title="مشاهده عکس از نزدیک" class="active_it"> <box-icon name="show-alt" type="solid" color="green"></box-icon> </span>
    </template>
    <template v-else>
      <div style="margin: 30px">عکسی آپلود نشده است</div>
    </template>


    <label>
      عکس کارت کارت ملی از پشت :
    </label>
    <template v-if="nationality_card_back">
        <file-upload :disable_file_input="true" :src="nationality_card_back">
        </file-upload>
      <span @click="showBiggerImage('back')" title="مشاهده عکس از نزدیک" style="margin-bottom: 20px" class="active_it"> <box-icon name="show-alt" type="solid" color="green"></box-icon> </span>
    </template>
    <template v-else>
      <div style="margin: 30px">عکسی آپلود نشده است</div>
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

const VueInputUi = () => import('vue-input-ui');
export default {
  name: "CreateTag",
  created() {
    this.$store.state.pageTitle = 'ویرایش مدیر';
    this.getUserInfo()
  },
  data() {
    return {
      colorx: "#4a5153",
      popupActivo5: false,
      name: '',
      family: '',
      email: '',
      bigger_image:'',
      cell: '',
      description: '',
      password: '',
      popupTitle:'',
      status: false,
      confirm_password: '',
      profile_image_name: false,
      address: '',
      resume: '',
      nationality_card_front: false,
      nationality_card_back: false,
    }
  },

  methods: {
    showBiggerImage(image_type){
      this.popupActivo5=true;
      if (image_type=='back'){
        this.bigger_image=this.nationality_card_back
        this.popupTitle='عکس کارت ملی از پشت'
        return;
      }
      this.popupTitle='عکس کارت ملی از جلو'
      this.bigger_image=this.nationality_card_front
    },
    getValues() {
      let value_one = this.cell.replace('(', '');
      let value_two = value_one.replace(')', '');
      let value_three = value_two.replace(' ', '');
      let value_four = value_three.replace('-', '')
      this.cell = value_four;
      let formData = new FormData();
      formData.append('cell', this.cell);
      formData.append('email', this.email);
      formData.append('password', this.password.trim() === '' ? 0 : this.password)
      formData.append('confirm_password', this.confirm_password);
      formData.append('name', this.name);
      formData.append('family', this.family);
      formData.append('role_id', this.role_id)
      formData.append('file', this.$store.state.file === null ? 0 : this.$store.state.file)
      return formData;
    },
    submit() {
      this.$store.state.loading = true;
      let values = this.getValues();

      UserService.updateAdmin(this.$route.params.id, values)
          .then(() => {

            this.$router.push({name: 'users-admin-list'})

          }).catch(error => {

        HelperClass.showErrors(error, this.$noty)

      })

    },
    getUserInfo() {
      UserService.getTeacherInfo(this.$route.params.teacher_id)
          .then(res => {
            let user_basic_info = res.data.data.user_info;
            let teacher_info = res.data.data.teacher_information;
            this.cell = user_basic_info.cell;
            this.email = user_basic_info.email;
            this.name = user_basic_info.name;
            this.family = user_basic_info.family;
            if (user_basic_info.profile_image_name != null) {
              this.profile_image_name = `${this.$store.state.baseUrl}/storage/images/users/profile-image/${this.$route.params.teacher_id}/${user_basic_info.profile_image_name}`;
            }

            this.status = teacher_info.status === 'active';

            this.description = teacher_info.description;

            if (teacher_info.nationality_card_front != null) {
              this.nationality_card_front = `${this.$store.state.baseUrl}/api/v1/users/show/teachers_document_file/card_front/${this.$route.params.teacher_id}?token=` + localStorage.getItem('token');
            }
            if (teacher_info.nationality_card_back != null) {
              this.nationality_card_back = `${this.$store.state.baseUrl}/api/v1/users/show/teachers_document_file/card_back/${this.$route.params.teacher_id}?token=` + localStorage.getItem('token');
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
.bigger_image{
  max-height: 200px;
  max-width: 300px;
  transform: scale(1.9);
}
</style>