<template>
  <div>
    <label>
      عنوان دوره به فارسی(الزامی) :
    </label>
    <div class="form-group">
      <VueInputUi type="array" label="عنوان دسته بندی به فارسی..." v-model="fa_title"/>
    </div>
    <label>
      عنوان دوره به انگلیسی :
    </label>
    <div class="form-group">

      <VueInputUi type="array" label="عنوان دسته بندی به انگلیسی..." v-model="en_title"/>
    </div>

    <div style="margin-bottom: 40px">
      <vs-select
          class="selectExample"
          label="سطح دوره :"
          v-model="level"
      >
        <vs-select-item :key="index" :value="item.value" :text="item.text"
                        v-for="(item,index) in levels"/>
      </vs-select>
    </div>
    <div style="margin-bottom: 40px">
      <vs-select
          class="selectExample"
          label="مدرس دوره:"
          v-model="teacher_id"
          :disabled="show_active_teachers_select_box"
      >
        <vs-select-item :key="index" :value="item.value" :text="item.text"
                        v-for="(item,index) in teachers"/>
      </vs-select>
    </div>
    <div style="margin-bottom: 40px">
      <vs-alert title="توجه!" color="rgb(231, 154, 23)" active="true">
        صرفا دسته های فعال در لیست زیر نمایش داده میشوند
      </vs-alert>
    </div>
    <div style="margin-bottom: 40px">
      <vs-select
          class="selectExample"
          label="دسته(الزامی):"
          v-model="category"
          :disabled="show_active_categories_select_box"
      >
        <vs-select-item :key="index" :value="item.value" :text="item.text"
                        v-for="(item,index) in categories"/>
      </vs-select>
    </div>
    <div style="margin-bottom: 40px">
      <vs-select
          class="selectExample"
          label="انتخاب تگ(ها):"
          multiple
          v-model="selected_tags"
          :disabled="show_active_tags_select_box"
      >
        <vs-select-item :key="index" :value="item.value" :text="item.text"
                        v-for="(item,index) in tags"/>
      </vs-select>
    </div>
    <label style="margin:30px 0">
      توضیحات(الزامی)
    </label>
    
    <editor
        v-model="description"
        api-key="214siyv4hmul2xqvhali31m8ox5kxrskd3g1k5b6an2ft09l"
        :init="{
                menubar: true,
                plugins: [
                'advlist codesample autolink link image lists charmap print preview hr anchor pagebreak',
                'searchreplace wordcount visualblocks visualchars code fullscreen insertdatetime media nonbreaking',
                'table emoticons template paste help'
                 ],
                width: 1000,
                height: 300,
                images_upload_url:$store.state.baseUrl+'/api/v1/upload-article-images',
                // image_upload_base_path:$store.state.baseUrl,
                toolbar: 'undo redo | styleselect | codesample | bold italic | alignleft aligncenter alignright alignjustify | ' +
                'bullist numlist outdent indent | link image | print preview media fullpage | ' +
                'forecolor backcolor emoticons | help',
                 }"
    />

    <label style="display: block;margin: 20px 0">
      توضیحات کوتاه(الزامی) :
    </label>
    <div class="form-group" style="min-height: 200px">
      <vs-textarea height="300" label="اینجا وارد کنید..." v-model="short_description"/>
    </div>
    <label>
      توضیحات تگ متا(الزامی) :
    </label>
    <div class="form-group">
      <VueInputUi type="array" label="توضیحات تگ متا..." v-model="meta"/>
    </div>
    <label>
      قیمت به تومان(الزامی):
    </label>
    <div class="form-group">
      <VueInputUi @keydown="checkPriceValidation($event)" type="number"
                  label=" " v-model="price"/>
    </div>
    <label>
      درصد تخفیف :
    </label>
    <div class="form-group">
      <VueInputUi @keyup="checkDiscountValidationKeyUp($event)" @keydown="checkDiscountValidation($event)"
                  type="number" label=" " v-model="discount_value"/>
    </div>

    <label>
      وضعیت :
    </label>
    <div class="form-group" dir="ltr" style="height: 19px">
      <p-check color="success" v-model="status" class="p-switch p-fill"></p-check>
    </div>
    <span :class="[status ? 'active_color' : 'de_active_color']">{{ statusCondition }}</span>


    <br>
    <br>

    <label>
      امکان تهیه برای اعضای ویژه :
    </label>
    <div class="form-group" dir="ltr" style="height: 19px">
      <p-check color="success" v-model="sell_to_special_memberships" class="p-switch p-fill"></p-check>
    </div>
    <span
        :class="[sell_to_special_memberships ? 'active_color' : 'de_active_color']">{{
        sellToSpecialMembershipCondition
      }}</span>

    <br>
    <br>
    <label>
      عکس کاور(الزامی) :
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
import HelperClass from "@/services/HelperClass";
import FileUpload from "@/components/FileUpload";
import CourseCategoryService from "@/services/Course/CourseCategoryService";
import Editor from '@tinymce/tinymce-vue'
import TagService from "@/services/Course/TagService";
import TeacherService from "@/services/Teachers/TeacherService";
import CourseService from "@/services/Course/CourseService";

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
      category: '',
      meta: '',
      categories: [],
      sell_to_special_memberships: false,
      parent: 0,
      discount_value: '',
      show_active_categories_select_box: false,
      show_active_tags_select_box: false,
      show_active_teachers_select_box: false,
      tags: [],
      teachers: [],
      teacher_id: '',
      level: 'advanced',
      levels: [
        {value: 'beginner', text: 'مبتدی'},
        {value: 'medium', text: 'متوسط'},
        {value: 'advanced', text: 'حرفه ای'}
      ],
      selected_tags: [],
      price: '',

    }
  },
  created() {
    this.$store.state.pageTitle = 'ایجاد دوره جدید';
    this.getCourseCategories();
    this.getTags();
    this.getActiveTeachers();
  },
  components: {
    VueInputUi,
    FileUpload,
    Editor
  },
  computed: {
    statusCondition() {
      return this.status ? 'فعال' : 'غیر فعال'
    },
    sellToSpecialMembershipCondition() {
      return this.sell_to_special_memberships ? 'بله' : 'خیر'
    }
  },
  methods: {
    getCourseCategories() {
      CourseCategoryService.getCourseCategories('select_box')
          .then(res => {
            let categories = res.data.data;
            this.categories=[];
            if (res.status === 204) {
              this.categories.unshift({value: 0, text: 'دسته فعالی وجود ندارد'})
              this.category = this.categories[0].value
              this.show_active_categories_select_box = true;
              return;
            }

            categories.forEach(item => {
              this.categories.push({value: item.id, text: item.fa_title})
            })
            this.category = this.categories[0].value
          }).catch(error => {
        HelperClass.showErrors(error, this.$noty)
      })
    },
    getTags() {
      TagService.getListOfTheTags('select_box')
          .then(res => {
            this.tags=[];
            this.selected_tags = [];
            if (res.status === 204) {
              this.tags.unshift({value: 0, text: 'هیچ تگی فعالی ثب نشده است'})
              this.selected_tags.push(0)
              this.show_active_tags_select_box = true;
              return;
            }
            let tags = res.data.data;
            tags.forEach(item => {
              this.tags.push({value: item.id, text: item.fa_title})
            })
            this.selected_tags.push(this.tags[0].value)
          }).catch(error => {
        HelperClass.showErrors(error, this.$noty)
      })
    },
    getActiveTeachers() {
      TeacherService.getActiveTeachers()
          .then(res => {
            this.teachers=[];
            this.teacher_ids = [];
            if (res.status === 204) {
              this.teachers.push({text: 'هیچ مدرس فعالی در سیستم موجود نیست', value: 0})
              this.teacher_id = 0;
              this.show_active_teachers_select_box = true;
              return;
            }
            res.data.data.forEach(item => {
              this.teachers.push({text: item.name, value: item.id})
            })
            this.teacher_id = this.teachers[0].value
          }).catch(error => {
        HelperClass.showErrors(error, this.$noty)
      })
    },

    checkPriceValidation(event) {
      HelperClass.checkNumberValidation(event);
    },
    checkDiscountValidation(event) {
      HelperClass.checkNumberValidation(event);
    },
    getValues() {
      let formData = new FormData();
      formData.append('fa_title', this.fa_title);
      formData.append('en_title', this.en_title);
      formData.append('courseCategory_id', this.category);
      formData.append('description', this.description);
      formData.append('short_description', this.short_description);
      formData.append('meta', this.meta);
      if (this.selected_tags[0] !== 0) {
        formData.append('tag_ids', JSON.stringify(this.selected_tags));
      }
      formData.append('discount_value', this.discount_value);
      formData.append('price', this.price);
      formData.append('file', this.$store.state.file)
      formData.append('is_active', this.status)
      formData.append('level', this.level);
      formData.append('is_special_subscription', this.sell_to_special_memberships)
      formData.append('teacher_id', this.teacher_id)
      return formData;
    },
    makeEmptyValues() {
      this.fa_title = '';
      this.en_title = '';
      this.getTags();
      this.meta = '';
      HelperClass.removeAllImagePreviews();
      this.status = 0;
      this.level = 'beginner';
      this.sell_to_special_memberships = false;
      this.getActiveTeachers();
      this.short_description = '';
      this.description = '';
      this.getCourseCategories();
      this.discount_value = '';
    },
    checkDiscountValidationKeyUp(event) {
      if (event.target.value > 100) {
        event.target.value = 100
        this.discount_value = 100;
      }
    },
    submit() {
      let data = this.getValues()
      CourseService.StoreNewCourse(data)
          .then(() => {
            HelperClass.showSuccess(this.$noty)
            HelperClass.scrollTop();
            this.makeEmptyValues();
            this.getCourseCategories();
            this.getActiveTeachers();
            this.getTags();
          }).catch(error => {
        HelperClass.showErrors(error, this.$noty)
      })
    }
  }
}
</script>

<style scoped>

</style>