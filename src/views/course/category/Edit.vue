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
          <vs-select-item :key="index" :value="item.value" :text="item.text"
                          v-for="(item,index) in categories"/>
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
      توضیحات تگ متا :
    </label>
    <div class="form-group">
      <VueInputUi type="array" label="توضیحات تگ متا..." v-model="meta"/>
    </div>


    <label>
      توضیحات :
    </label>
    <div class="form-group" style="min-height: 200px">
      <vs-textarea height="300" label="اینجا وارد کنید..." v-model="description"/>
    </div>
    <label>
      توضیحات کوتاه :
    </label>
    <div class="form-group" style="min-height: 200px">
      <vs-textarea height="300" label="اینجا وارد کنید..." v-model="short_description"/>
    </div>

    <label>
      عکس کاور(الزامی) :
    </label>
    <file-upload :src="img_url"></file-upload>


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
    <template v-if="$route.query.from_actives">
      <Button link="course-category-active" icon="chevron-left"></Button>
    </template>
    <template v-else-if="$route.query.from_de_actives">
      <Button link="course-category-de-active" icon="chevron-left"></Button>
    </template>
    <template v-else>
      <Button link="course-category-list" icon="chevron-left"></Button>
    </template>

    <div style="height: 300px"></div>
  </div>
</template>

<script>
import HelperClass from "@/services/HelperClass";
import FileUpload from "@/components/FileUpload";
import CourseCategoryService from "@/services/Course/CourseCategoryService";
import Button from "@/components/Button";

const VueInputUi = () => import('vue-input-ui');
export default {
  name: "CreateArticleCategory",
  data() {
    return {
      status: 0,
      description: '',
      short_description: '',
      fa_title: '',
      en_title: '',
      meta: '',
      categories: [],
      is_show_parent: true,
      parent: 0,
      cover_file_name: '',
      img_url: ''
    }
  },
  created() {
    this.$store.state.pageTitle = 'ایجاد دسته بندی دوره ها';
    this.getCourseCategories();
    this.getInfo((this.$route.params.courseCategory_id));
  },
  components: {
    VueInputUi,
    FileUpload,
    Button
  },
  computed: {
    statusCondition() {
      return this.status ? 'فعال' : 'غیر فعال'
    }
  },
  methods: {
    getCourseCategories() {
      CourseCategoryService.getCourseCategories('select_box')
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
      this.$store.state.loading = true;
      let formData = new FormData();
      formData.append('fa_title', this.fa_title);
      formData.append('en_title', this.en_title);
      formData.append('description', this.description);
      formData.append('short_description', this.short_description);
      formData.append('status', this.status);
      formData.append('parent', this.parent);
      formData.append('meta', this.parent);
      formData.append('parent', this.parent);
      formData.append('file', this.$store.state.file)
      CourseCategoryService.updateCourseCategory(this.$route.params.courseCategory_id, formData)
          .then(() => {
            HelperClass.scrollTop();
            HelperClass.showSuccess(this.$noty)

          }).catch(error => {
        HelperClass.showErrors(error, this.$noty)
      })
    },
    getInfo(courseCategory_id) {
      CourseCategoryService.getSpecificCourseCategoryInfo(courseCategory_id)
          .then(res => {
            let data = res.data.data.category;
            this.fa_title = data.fa_title;
            this.en_title = data.en_title;
            this.description = data.description;
            this.short_description = data.short_description;
            this.meta = data.meta;
            this.cover_file_name = data.cover_file_name;
            this.parent = data.parent;
            this.status = data.status
            this.img_url = this.$store.state.baseUrl + '/storage/images/courses/categories/cover/' + data.id + '/' + this.cover_file_name;
          }).catch(error => {
        HelperClass.showErrors(error, this.$noty)
      })
    }
  }
}
</script>

<style scoped>

</style>