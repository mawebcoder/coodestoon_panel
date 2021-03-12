<template>
  <div>

    <div style="margin-bottom: 40px">
      <vs-alert color="rgb(231, 154, 23)" active="true">
        صرفا دسته ها و تگ های فعال در لیست زیر نمایش داده میشوند
      </vs-alert>
    </div>
    <label>
      عنوان ویدیو به فارسی(الزامی) :
    </label>
    <div class="form-group">

      <VueInputUi type="array" label="عنوان دسته بندی به فارسی..." v-model="fa_title"/>
    </div>

    <label>
      عنوان ویدیو به انگلیسی :
    </label>
    <div class="form-group">

      <VueInputUi type="array" label="عنوان دسته بندی به انگلیسی..." v-model="en_title"/>
    </div>

    <div style="margin: 20px 0">
      <vs-alert color="rgb(231, 154, 23)" :active="true">
        ویدیو های تکی رایگان هستند و هیچ دوره یا فصلی به آنها تعلق نمیگیرد
      </vs-alert>
    </div>
    <label style="margin-bottom: 20px;display: block">
      آیا تک ویدیو است؟
    </label>
    <div class="form-group" dir="ltr" style="height: 19px">
      <p-check color="success" v-model="is_single_video" class="p-switch p-fill"></p-check>
    </div>


    <template v-if="!is_single_video">
      <div style="margin-bottom: 40px">
        <vs-select
            @change="getCourseSections"
            class="selectExample"
            label="عنوان دوره :"
            v-model='course_id'
            :disabled="is_disable_course_select"
        >
          <vs-select-item :key="index" :value="item.value" :text="item.text" v-for="(item,index) in course_list"/>
        </vs-select>
      </div>
    </template>

    <template v-if="!is_single_video">
      <div class="form-group" style="margin: 20px 0">
        <vs-select
            class="selectExample"
            label="برای کدام فصل است؟ :"
            v-model="course_section_id"
            :disabled="is_disable_course_section_select"
        >
          <vs-select-item :key="index" :value="item.value" :text="item.text" v-for="(item,index) in course_sections"/>
        </vs-select>
      </div>
    </template>


    <div style="margin: 30px 0">

      <label style="margin:20px 0;display: block">
        آیا رایگان است؟
      </label>
      <div class="form-group" dir="ltr" style="height: 19px">
        <p-check color="success" v-model="is_free" class="p-switch p-fill"></p-check>
      </div>
    </div>

    <label style="margin:30px 0">
      توضیحات :
    </label>
    <editor
        v-model="content"
        api-key="214siyv4hmul2xqvhali31m8ox5kxrskd3g1k5b6an2ft09l"
        :init="{
                menubar: true,
                plugins: [
                'advlist autolink link image lists charmap print preview hr anchor pagebreak',
                'searchreplace wordcount codesample visualblocks visualchars code fullscreen insertdatetime media nonbreaking',
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

    <label style="margin-top: 30px">
      توضیحات کوتاه :
    </label>
    <div class="form-group" style="min-height: 200px">
      <vs-textarea height="300" label="اینجا وارد کنید..." v-model="short_description"/>
    </div>

    <div class="form-group">
      <vs-select
          class="selectExample"
          label="انتخاب تگ(ها) :"
          v-model="tag"
          multiple
          :disabled="is_disable_tags_select"
      >
        <vs-select-item :key="index" :value="item.value" :text="item.text" v-for="(item,index) in tags"/>
      </vs-select>
    </div>


    <div style="margin-bottom: 40px">
    </div>
    <label>
      توضیحات تگ متا :
    </label>
    <div class="form-group">
      <VueInputUi type="array" label="عنوان دسته بندی به فارسی..." v-model="meta_description"/>
    </div>
    <h4 style="color: orange">زمان ویدیو:</h4>
    <div style="padding: 20px 10px;border: 1px solid #666666;border-radius: 5px">

      <div class="form-group">

        <VueInputUi @keyup="validateMinutes($event)" label="دقیقه" @keydown="validateKeyDown($event)" type="number"
                    v-model="minute"/>
      </div>
      <div style="margin-bottom: 40px">
        <vs-alert color="rgb(231, 154, 23)" :active="minutes_alert">
          {{ minutes_alert }}
        </vs-alert>
      </div>
      <div class="form-group">
        <VueInputUi @keyup="validateSeconds($event)" label="ثانیه" @keydown="validateKeyDown($event)" type="number"
                    v-model="second"/>
      </div>
      <div style="margin-bottom: 40px">
        <vs-alert color="rgb(231, 154, 23)" :active="second_alert">
          {{ second_alert }}
        </vs-alert>
      </div>
    </div>
    <label>
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


    <div style="height: 300px"></div>
  </div>
</template>

<script>
import Editor from '@tinymce/tinymce-vue'
import HelperClass from "@/services/HelperClass";
import CourseService from "@/services/Course/CourseService";
import VideosTagService from "@/services/Videos/VideosTagService";
import CourseSectionService from "@/services/Course/CourseSectionService";
import VideosService from "@/services/Videos/VideosService";

const VueInputUi = () => import('vue-input-ui');
export default {
  name: "CreateArticleCategory",
  data() {
    return {
      status: 0,

      meta_description: '',
      short_description: '',

      is_single_video: false,

      fa_title: '',
      en_title: '',

      course_list: [],
      course_id: '',
      is_disable_course_select: false,

      is_free: false,

      content: '',

      minutes_alert: false,
      second_alert: false,

      course_sections: [],
      course_section_id: '',
      is_disable_course_section_select: false,


      tag: [],
      tags: [],
      is_disable_tags_select: false,


      minute: '',
      second: ''
    }
  },
  watch: {
    is_single_video(value) {
      if (value){
        this.is_free=true

      }
    }
  },
  created() {
    this.$store.state.pageTitle = 'ایجاد ویدیو جدید';
    this.getCourses();
    this.getTags();
  },
  components: {
    VueInputUi,
    Editor
  },
  methods: {
    getCourses() {
      CourseService.getCourses('select_box')
          .then(res => {
            let result = res.data.data;
            if (res.status === 204) {
              this.course_list.push({value: 0, text: 'هیچ دوره ای در یستم وجود ندارد'})
              this.course_id = 0;
              return;
            }
            result.forEach(item => {
              this.course_list.push({value: item.id, text: item.fa_title})
            })
            this.course_id = this.course_list[0].value;
          }).catch(error => {
        HelperClass.showErrors(error, this.$noty)
      })
    },
    getTags() {
      VideosTagService.getListOfTheVideoTags('select_box')
          .then(res => {
            if (res.status === 204) {
              this.tags.push({value: 0, text: 'هیچ تگی در سیستم ثبت نشده است'})
              this.tag = [0];
              return;
            }
            res.data.data.forEach(item => {
              this.tags.push({value: item.id, text: item.fa_title})
            })
            this.tag.push(this.tags[0].value);
          }).catch(error => {

        HelperClass.showErrors(error, this.$noty)

      })
    },
    getCourseSections() {
      CourseSectionService.getCourseSection(this.course_id)
          .then(res => {
            this.course_sections = [];
            this.course_section_id = '';
            if (res.status === 204) {
              this.course_sections.push({value: 0, text: 'هیچ فصلی برای این دوره ثبت نشده است'})
              this.course_section_id = 0;
            }
            res.data.data.forEach(item => {
              this.course_sections.push({value: item.id, text: item.fa_title})
            })
            this.course_section_id = this.course_sections[0].value;
          }).catch(error => {
        HelperClass.showErrors(error, this.$noty)
      })
    },

    getValues() {
      let data= {
        fa_title: this.fa_title,
        en_title: this.en_title,
        description: this.content,
        short_description: this.short_description,
        meta: this.meta_description,
        minute: this.minute,
        second: this.second.trim().length ? this.second : 0,
        is_free: this.is_free ? 1 : 0,
        is_single_video: this.is_single_video ? 1 : 0,

        status: this.status ? 1 : 0,
        video_tag_ids: this.tag.length ? this.tag : null
      }
      if (this.is_single_video){
        Object.assign(data,{course_section_id:null,course_id:null})
      }else{
        Object.assign(data,{courseSection_id: this.course_section_id ? this.course_section_id : null, course_id: this.course_id ? this.course_id : null,})
      }
      return data;
    },
    submit() {
      let data = this.getValues();

      VideosService.storeVideo(data)
          .then((res) => {
            let video_id=res.data.data;
           HelperClass.showSuccess(this.$noty)
            this.$router.push({name:'video-upload',params:{id:video_id}})
          }).catch(error => {
        HelperClass.showErrors(error, this.$noty)
      })
    },
    validateKeyDown(event) {
      HelperClass.checkNumberValidation(event)
    },
    validateMinutes(event) {
      let value = parseInt(event.target.value);
      if (value > 45) {
        this.minutes_alert = 'تایم ویدیو نمیتواند بیشتر از ۴۵ دقیقه باشد ';
        return
      } else if (value < 5) {
        this.minutes_alert = 'تایم ویدیو نمیتواند کمتر از ۵ دقیقه باشد ';
        return;
      }
      this.minutes_alert = false;

    },
    validateSeconds(event) {
      let value = parseInt(event.target.value);
      if (value > 59) {
        this.second_alert = 'نمیتواند بیشتر از 59 ثانیه باشد'
        return
      }
      this.second_alert = false
    }

  },
}
</script>

<style scoped>

</style>