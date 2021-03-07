<template>
  <div style="width: 90%;margin: auto">
    <label>
      نام فصل به فارسی:
    </label>
    <div class="form-group">
      <VueInputUi type="array" label="نام فصل به فارسی..." v-model="fa_title"/>
    </div>
    <label>
      نام فصل به انگلیسی:
    </label>
    <div class="form-group">
      <VueInputUi type="array" label="نام فصل به انگلیسی..." v-model="en_title"/>
    </div>
    <div style="margin-bottom: 40px">
      <vs-select
          class="selectExample"
          label="عنوان دوره :"
          v-model="course_id"
      >
        <vs-select-item :key="index" :value="item.value" :text="item.text"
                        v-for="(item,index) in courses_list"/>
      </vs-select>
    </div>

    <editor
        placeholder="توضیحات ..."
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

    <label>
      توضیحات متا:
    </label>
    <div class="form-group" style="display: block;margin-top: 5px">
      <VueInputUi type="array" label="توضیحات متا..." v-model="meta"/>
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
    <template v-if="$route.query.where==='list'">
      <Button link="course-section-list" icon="chevron-left"></Button>
    </template>

  </div>
</template>

<script>
import Button from "@/components/Button";
import HelperClass from "@/services/HelperClass";
import CourseService from "@/services/Course/CourseService";
import CourseSectionService from "@/services/Course/CourseSectionService";
import Editor from '@tinymce/tinymce-vue'

const VueInputUi = () => import('vue-input-ui');
export default {
  name: "CreateTag",
  created() {
    this.$store.state.pageTitle = 'ایجاد تگ جدید برای مقالات';
    this.getActiveCourses();
    this.getCourseSectionInformation();
  },
  data() {
    return {
      en_title: '',
      fa_title: '',
      status: false,
      courses_list: [],
      course_id: '',
      description: '',
      meta: ''
    }
  },
  methods: {
    getActiveCourses() {
      CourseService.getCourses('select_box')
          .then(res => {
            this.courses_list = [];
            if (res.status === 204) {
              this.courses_list.push({text: 'هیچ دوره ای در سیستم ثبت نشده است', value: 0})
              this.course_id = 0
              return;
            }
            res.data.data.forEach(item => {
              this.courses_list.push({text: item.fa_title, value: item.id})
            })
            this.course_id = this.courses_list[0].value;
          }).catch(error => {
        HelperClass.showErrors(error, this.$noty)
      })
    },
    getValues() {
      let data = {
        fa_title: this.fa_title,
        en_title: this.en_title,
        status: this.status ? 1 : 0,
        course_id: this.course_id,
        description: this.description,
        meta: this.meta
      }
      return data
    },
    getCourseSectionInformation() {
      CourseSectionService.getCourseInformation(this.$route.params.id)
          .then(res => {
            let data=res.data.data;
            this.fa_title=data.fa_title;
            this.status=data.status;
            this.course_id=data.course_id;
            this.description=data.description;
            this.meta=data.meta;
            this.en_title=data.en_title
          }).catch(error => {
        HelperClass.showErrors(error, this.$noty)
      })
    },
    submit() {
      this.$store.state.loading = true
      let data = this.getValues();
      CourseSectionService.updateCourseSection(this.$route.params.id,data)
          .then(() => {
            HelperClass.showSuccess(this.$noty);
            HelperClass.scrollTop();
            if (this.$route.query.where==='list'){
              this.$router.push({name:'course-section-list'})
            }
          }).catch(error => {
        HelperClass.showErrors(error, this.$noty)
      })

    }
  },
  components: {
    VueInputUi,
    Editor,
    Button
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