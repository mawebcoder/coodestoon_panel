<template>
  <div style="width: 90%;margin: auto">
    <label style="display: block;margin:20px 0">
      آیا تصادفی ایجاد شود؟
    </label>
    <div class="form-group" dir="ltr" style="height: 19px">
      <p-check color="success" v-model="is_random" class="p-switch p-fill"></p-check>
    </div>

    <template v-if="!is_random">
      <label>
        کد را وارد کنید:
      </label>
      <div class="form-group">
        <VueInputUi type="array" label="کد تخفیف..." v-model="code"/>
      </div>
      <label>
        تعداد مجاز استفاده:
      </label>
      <div class="form-group">
        <VueInputUi @keydown="checkNumber($event)" type="number" label="تعداد استفاده..." v-model="count_of_useable"/>
      </div>
    </template>

    <template v-if="is_random">
      <div style="margin-bottom: 20px">
        <vs-alert color="rgb(231, 154, 23)" active="true">
          پیشوند به طور اتوماتیک با dash از کد جدا خواهد شد و در ابتدا قرار خواهد گرفت.
        </vs-alert>
      </div>
      <label>
        پیشوند برای کد :
      </label>
      <div class="form-group">
        <VueInputUi type="array" label="پیشوند..." v-model="prefix"/>
      </div>
      <label>
        تعداد کد ها:
      </label>
      <div class="form-group">
        <VueInputUi @keydown="checkNumber($event)" type="number" label="تعداد..." v-model="number"/>
      </div>
    </template>
    <label>
      درصد تخفیف :
    </label>
    <div class="form-group">
      <VueInputUi @keyup="checkDiscountValidationKeyUp($event)" @keydown="checkNumber($event)" type="number" label="درصد..." v-model="percent"/>
    </div>
    <label style="display: block;margin: 10px 0">
      تاریخ انقضا:
    </label>
    <vue-persian-datetime-picker @change="changeDate" :min="min_date" v-model="date"></vue-persian-datetime-picker>
    <div class="form-group">
      <label style="color: #fff;margin:4px 0">
        تاریخ به شمسی :
      </label>
      <div class="form-group">
        <VueInputUi disabled="true" type="text" label="تاریخ به شمسی..." v-model="jalali_date"/>
      </div>
    </div>

    <label style="display: block;margin-top: 30px">
      وضعیت :
    </label>
    <div class="form-group" dir="ltr" style="height: 19px">
      <p-check color="success" v-model="status" class="p-switch p-fill"></p-check>
    </div>
    <div class="form-group">
            <span @click="submit" class="submit_button">
                ثبت
            </span>
    </div>


  </div>
</template>

<script>
let moment = require('moment-jalaali')
moment.loadPersian([
  {dialect: 'persian-modern', usePersianDigits: true}
])
import DiscountService from "@/services/DiscountServices/DiscountService";
import HelperClass from "@/services/HelperClass";
import VuePersianDatetimePicker from "vue-persian-datetime-picker";

const VueInputUi = () => import('vue-input-ui');
export default {
  name: "CreateDiscount",
  created() {
    this.$store.state.pageTitle = 'ایجاد کد تخفیف';
  },
  data() {
    return {
      code: '',
      number: '',
      prefix: '',
      count_of_useable: '',
      status: false,
      date: '',
      percent: '',
      jalali_date:'',
      min_date: new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
      is_random: false
    }
  },

  methods: {
    checkNumber(e){
      HelperClass.checkNumberValidation(e)
    },
    changeDate() {
      this.jalali_date = moment(this.date).format('jYYYY-jM-jD')
    },

    checkDiscountValidationKeyUp(event){
      if (event.target.value > 100) {
        event.target.value = 100
        this.percent = 100;
      }
    },
    getValues() {
      let values;
      if (!this.is_random) {
        values = {
          code: this.code,
          expire_date: this.date,
          percent: this.percent,
          count_of_useable: this.count_of_useable,
          status: this.status ? 1 : 0
        }
        return values;
      }
      values = {
        expire_date: this.date,
        percent: this.percent,
        prefix: this.prefix,
        count_of_useable: this.count_of_useable,
        status: this.status ? 1 : 0,
        number: this.number
      }
      return values;
    },
    submit() {
      this.$store.state.loading = true
      let data = this.getValues();
      if (!this.is_random){
        DiscountService.storeNewDiscount(data)
            .then(() => {
              HelperClass.showSuccess(this.$noty)
            }).catch(error => {
          HelperClass.showErrors(error, this.$noty)
        })
        return;
      }

      DiscountService.generateRandomCodes(data)
      .then(()=>{
        HelperClass.showSuccess(this.$noty)
      }).catch(error=>{
        HelperClass.showErrors(error, this.$noty)
      })


    }
  },
  components: {
    VueInputUi,
    VuePersianDatetimePicker
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