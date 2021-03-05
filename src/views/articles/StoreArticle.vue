<template>
  <div>

    <div style="margin-bottom: 40px">
      <vs-alert title="توجه!" color="rgb(231, 154, 23)" active="true">
        صرفا دسته ها و تگ های فعال در لیست زیر نمایش داده میشوند
      </vs-alert>
    </div>
    <label>
      عنوان مقاله به فارسی(الزامی) :
    </label>
    <div class="form-group">

      <VueInputUi type="array" label="عنوان دسته بندی به فارسی..." v-model="fa_title"/>
    </div>

    <label>
      عنوان مقاله به انگلیسی :
    </label>
    <div class="form-group">

      <VueInputUi type="array" label="عنوان دسته بندی به انگلیسی..." v-model="en_title"/>
    </div>

    <div style="margin-bottom: 40px">
      <vs-select
          class="selectExample"
          label="انتخاب دسته بندی :"
          v-model="category"
          :disabled="is_disable_category_select"
      >
        <vs-select-item :key="index" :value="item.value" :text="item.text" v-for="(item,index) in categories"/>
      </vs-select>
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
    <label>
      نام نویسنده :
    </label>
    <div class="form-group">

      <VueInputUi type="array" label="عنوان دسته بندی به انگلیسی..." v-model="writer"/>
    </div>
    <label style="margin:30px 0">
      محتوای مقاله :
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

    <div style="height: 300px"></div>
  </div>
</template>

<script>
import Editor from '@tinymce/tinymce-vue'
import ArticleService from "@/services/articles/ArticleService";
import HelperClass from "@/services/HelperClass";
import FileUpload from "@/components/FileUpload";
import CategoryService from "@/services/articles/CategoryService";
import TagService from "@/services/articles/TagService";

const VueInputUi = () => import('vue-input-ui');
export default {
  name: "CreateArticleCategory",
  data() {
    return {
      status: 0,
      is_disable_category_select: false,
      is_disable_tags_select: false,
      meta_description: '',
      short_description: '',
      writer: '',

      fa_title: '',
      en_title: '',

      categories: [],
      category: '',

      content: '',

      tags: [],
      tag: []
    }
  },
  created() {
    this.$store.state.pageTitle = 'ایجاد مقاله جدید';
    this.getCategories();
    this.getActiveTagsList()
  },
  components: {
    VueInputUi,
    FileUpload,
    Editor
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
            let list = [];
            if (res.status === 204) {
              this.categories.push({value: 0, text: 'عدم وجود دسته بندی فعال'});
              this.category = 0
              this.is_disable_category_select = true;
              return
            }
            res.data.data.forEach(item => {
              list.push({value: item.id, text: item.fa_title})
            })
            this.categories = list
            this.category = list[0].value
          }).catch(error => {
        HelperClass.showErrors(error, this.$noty)
      })
    },
    getActiveTagsList() {
      TagService.getActiveTags('select_box')
          .then(res => {
            let list = [];
            if (res.status === 204) {
              list.push({value: 0, text: 'تگی وجود ندارد'})
              this.tags = list;
              this.tag=[];
              this.tag.push(list[0].value);
              this.is_disable_tags_select = true
              return
            }
            res.data.data.forEach(item => {
              this.tags.push({text: item.fa_title, value: item.id})
            })
            this.tag.push(this.tags[0].value)

          }).catch(error => {
        if (error.response) {
          HelperClass.showErrors(error, this.$noty)
        }
      })
    },
    makeEmptyValues() {
      this.status = 0
      this.meta_description = ''
      this.short_description = ''
      this.writer = ''
      this.fa_title = ''
      this.en_title = ''
      this.content = ''
      this.getActiveTagsList();
      this.getCategories()
    },
    getValues() {
      let formDate = new FormData();
      formDate.append('fa_title', this.fa_title);
      formDate.append('en_title', this.en_title);
      formDate.append('short_description', this.short_description);
      formDate.append('meta', this.meta_description);
      formDate.append('file', this.$store.state.file);
      formDate.append('text', this.content)
      formDate.append('articleCategory_id', this.category)
      formDate.append('writer', this.writer)
      formDate.append('status', this.status)
      formDate.append('article_tags', this.tag[0] === 0 ? null : JSON.stringify(this.tag))
      return formDate;
    },
    submit() {
      this.$store.state.loading = true;
      let formDate = this.getValues()
      ArticleService.storeArticle(formDate)
          .then(() => {
            HelperClass.removeAllImagePreviews();
            HelperClass.scrollTop();
            HelperClass.showSuccess(this.$noty);
            this.makeEmptyValues()
          }).catch(error => {
        HelperClass.showErrors(error, this.$noty)
      });
    }
  }
}
</script>

<style scoped>

</style>