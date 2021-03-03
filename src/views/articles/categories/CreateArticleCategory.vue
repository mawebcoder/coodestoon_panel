<template>
  <div>
    <template v-if="is_show_parent">
      <div style="margin-bottom: 40px">
        <vs-alert title="توجه!" color="rgb(231, 154, 23)" active="true">
          صرفا دسته های فعال در لیست زیر نمایش داده میشوند
        </vs-alert>
      </div>
      <div style="margin-bottom: 40px">
        <vs-select
            class="selectExample"
            label="دسته والد:"
            v-model="parent"
        >
          <vs-select-item :key="index" :value="item.value" :text="item.text" v-for="(item,index) in categories"/>
        </vs-select>
      </div>
    </template>

    <label>
      عنوان دسته بندی به فارسی(الزامی) :
    </label>
    <div class="form-group">

      <VueInputUi type="array" label="عنوان دسته بندی به فارسی..." v-model="fa_title"/>
    </div>


    <label>
      عنوان دسته بندی به انگلیسی :
    </label>
    <div class="form-group">

      <VueInputUi type="array" label="عنوان دسته بندی به انگلیسی..." v-model="en_title"/>
    </div>


    <label>
      توضیحات تکمیلی :
    </label>
    <div class="form-group" style="min-height: 200px">
      <vs-textarea v-model="description" placeholder="اینجا وارد کنید..."></vs-textarea>
    </div>

    <label>
      عکس کاور(الزامی) :
    </label>
    <file-upload></file-upload>


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
    <!--      <vs-pagination :total="40" v-model="currentx"></vs-pagination>-->

    <div style="height: 300px"></div>
  </div>
</template>

<script>
import HelperClass from "@/services/HelperClass";
import FileUpload from "@/components/FileUpload";
import CategoryService from "@/services/articles/CategoryService";

const VueInputUi = () => import('vue-input-ui');
export default {
  name: "CreateArticleCategory",
  data() {
    return {
      status: 0,
      description: '',
      fa_title: '',
      en_title: '',
      categories: [],
      is_show_parent: true,
      parent: 0,
    }
  },
  created() {
    this.$store.state.pageTitle = 'ایجاد دسته بندی مقالات';
    this.getCategories();
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
  methods: {
    getCategories() {
      CategoryService.getAllCategories('select_box')
          .then((res) => {
            if (res.status === 204) {
              this.is_show_parent = false;
              return
            }
            this.is_show_parent = true;
            let list = [];
            res.data.data.forEach(item => {
              list.push({value: item.id, text: item.fa_title})
            })
            list.unshift({text: 'بدون والد', value: 0})
            this.categories = list
            this.parent = list[0].value
          }).catch(error => {
        HelperClass.showErrors(error, this.$noty)
      })
    },
    submit() {
      this.$store.state.loading = true;
      let formData = new FormData();
      formData.append('fa_title', this.fa_title);
      formData.append('en_title', this.en_title);
      formData.append('description', this.description);
      formData.append('status', this.status);
      formData.append('parent', this.parent);
      formData.append('file', this.$store.state.file)
      CategoryService.storeArticleCategory(formData)
          .then(() => {
            HelperClass.removeAllImagePreviews();
            this.fa_title = '';
            this.en_title = '';
            this.parent = 0;
            this.description = '';
            this.status = 0;

            this.getCategories();

            HelperClass.scrollTop();

            HelperClass.showSuccess(this.$noty)

          }).catch(error => {
        HelperClass.showErrors(error, this.$noty)
      })
    },
  }
}
</script>

<style scoped>

</style>