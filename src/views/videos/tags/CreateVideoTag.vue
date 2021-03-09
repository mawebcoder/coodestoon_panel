<template>
  <div style="width: 90%;margin: auto">
    <label>
      نام تگ به فارسی:
    </label>
    <div class="form-group">
      <VueInputUi type="array" label="نام تگ به فارسی..." v-model="fa_tag_name"/>
    </div>
    <label>
      نام تگ به انگلیسی:
    </label>
    <div class="form-group">
      <VueInputUi type="array" label="نام تگ به انگلیسی..." v-model="en_tag_name"/>
    </div>
    <label>
      وضعیت :
    </label>
    <div class="form-group" dir="ltr" style="height: 19px">
      <p-check color="success" v-model="status" class="p-switch p-fill"></p-check>
    </div>
    <span :class="[status ? 'active_color' : 'de_active_color']">{{ statusCondition }}</span>
    <div class="form-group">
            <span @click="submit" class="submit_button">
                ثبت
            </span>
    </div>


  </div>
</template>

<script>
import VideosTagService from "@/services/Videos/VideosTagService";
import HelperClass from "@/services/HelperClass";

const VueInputUi = () => import('vue-input-ui');
export default {
  name: "CreateTag",
  created() {
    this.$store.state.pageTitle = 'ایجاد تگ جدید برای مقالات'
  },
  data() {
    return {
      fa_tag_name: '',
      en_tag_name: '',
      status: false
    }
  },
  methods: {
    submit() {
      this.$store.state.loading = true
      let data = {
        'fa_title': this.fa_tag_name,
        'en_title': this.en_tag_name,
        'status': this.status
      }
      VideosTagService.storeVideoTag(data).then(() => {
        HelperClass.showSuccess(this.$noty)
        this.makeEmptyValues()
        HelperClass.scrollTop();
      }).catch(error => {
        HelperClass.scrollTop();
        HelperClass.showErrors(error, this.$noty);
      })
    },
    makeEmptyValues() {
      this.en_tag_name = '';
      this.fa_tag_name = '';
      this.status = false;
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