<template>
  <div style="width: 90%;margin: auto">
    <label>
      نام دپارتمان به فارسی:
    </label>
    <div class="form-group">
      <VueInputUi type="array" label="نام دپارتمان..." v-model="fa_name"/>
    </div>
    <label>
      نام دپارتمان به انگلیسی:
    </label>
    <div class="form-group">
      <VueInputUi type="array" label="نام دپارتمان..." v-model="en_name"/>
    </div>
    <label>
      وضعیت :
    </label>
    <div class="form-group" dir="ltr" style="height: 19px">
      <p-check color="success" v-model="status" class="p-switch p-fill"></p-check>
    </div>
    <span :class="[status ? 'active_color' : 'de_active_color']">{{statusCondition}}</span>
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

const VueInputUi = () => import('vue-input-ui');
export default {
  name: "CreateTag",
  created() {
    this.$store.state.pageTitle='ایجاد تگ جدید برای مقالات'
  },
  data() {
    return {
      fa_name: '',
      en_name: '',
      status: false
    }
  },
  methods: {
    makeEmptyValues(){
      this.en_name='';
      this.fa_name='';
      this.status=false;
    },
    submit() {
      this.$store.state.loading=true
      let data = {
        'fa_name': this.fa_name,
        'en_name': this.en_name,
        'status': this.status
      }
      DepartmentService.storeNewDepartment(data).then(() => {
        HelperClass.showSuccess(this.$noty)
        this.makeEmptyValues();
      }).catch(error => {
        HelperClass.showErrors(error, this.$noty);
      })
    }
  },
  components: {
    VueInputUi,
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