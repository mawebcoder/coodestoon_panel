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
            >
                <vs-select-item :key="index" :value="item.value" :text="item.text" v-for="(item,index) in categories"/>
            </vs-select>
        </div>

        <div style="margin-bottom: 40px">
            <vs-select
                    placeholder="انتخاب تگ..."
                    multiple
                    class="selectExample"
                    label="انتخاب تگ(ها)"
                    v-model="tag"

            >
                <vs-select-item :key="index" :value="item.value" :text="item.text" v-for="(item,index) in tags"/>
            </vs-select>
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
                'searchreplace codesample wordcount visualblocks visualchars code fullscreen insertdatetime media nonbreaking',
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
        <file-upload
                :src="`${$store.state.baseUrl}/storage/images/articles/covers/${$route.params.article}/${cover_file_name}`"></file-upload>

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
        <template v-if="$route.query.from_actives">
            <Button link="article-actives" icon="chevron-left"></Button>
        </template>
        <template v-else-if="$route.query.from_de_actives">
            <Button link="article-de-actives" icon="chevron-left"></Button>
        </template>
        <template v-else>
            <Button link="article-list" icon="chevron-left"></Button>
        </template>
        <div style="height: 300px"></div>
    </div>
</template>

<script>
    import Editor from '@tinymce/tinymce-vue'
    import CategoryService from "@/services/articles/CategoryService";
    import HelperClass from "@/services/HelperClass";
    import FileUpload from "@/components/FileUpload";
    import Button from "@/components/Button";
    import TagService from "@/services/articles/TagService";
import ArticleService from "@/services/articles/ArticleService";
    const VueInputUi = () => import('vue-input-ui');
    export default {
        name: "CreateArticleCategory",
        data() {
            return {
                status: 0,
                image_url: '',
                meta_description: '',
                short_description: '',

                writer: '',

                fa_title: '',
                en_title: '',

                categories: [],
                category: '',

                content: '',

                tags: [],
                tag: [],
                cover_file_name: '',
            }
        },
        created() {
            this.$store.state.loading = true;
            this.$store.state.pageTitle = 'ایجاد دسته بندی مقالات';
            this.getCategories();
            this.getActiveTagsList()
            this.getArticleInfo();
        },
        components: {
            VueInputUi,
            FileUpload,
            Editor,
            Button
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
                        let list = [];
                        res.data.data.forEach(item => {
                            list.push({value: item.id, text: item.fa_title})
                        })
                        this.categories = list
                    }).catch(error => {
                    HelperClass.showErrors(error, this.$noty)
                })
            },
            getActiveTagsList() {
              TagService.getActiveTags('select_box')
                    .then(res => {
                        let list = [];
                        res.data.data.forEach(item => {
                            list.push({text: item.fa_title, value: item.id})
                        })
                        this.tags = list;
                    }).catch(error => {
                    if (error.response) {
                        HelperClass.showErrors(error, this.$noty)
                    }
                })
            },
            setDefaultTags(tags) {
                tags.forEach(item => {
                    this.tag.push(item.id)
                })
            },
            setInfo(result) {
                let article_tags = result.article_tags
                this.setDefaultTags(article_tags);
                this.category = result.article.articleCategory_id;
                this.content = result.article.content;
                this.en_title = result.article.en_title;
                this.fa_title = result.article.fa_title;
                this.short_description = result.article.short_description;
                this.writer = result.article.writer;
                this.meta_description = result.article.meta;
                this.status = result.article.status;
                this.cover_file_name = result.article.cover_file_name;
            },
            getArticleInfo() {
              ArticleService.getArticleInformation(this.$route.params.article)
                    .then((res) => {
                        let result = res.data.data
                        this.setInfo(result);
                        this.$store.state.loading = false
                    }).catch(error => {
                    HelperClass.showErrors(error, this.$noty)
                })
            },
            makeEmptyValues() {
                this.status = 0
                this.meta_description = ''
                this.short_description = ''
                this.writer = ''
                this.fa_title = ''
                this.en_title = ''
                this.categories = []
                this.category = ''
                this.content = ''
                this.tags = []
                this.tag = []
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
                formDate.append('article_tags', JSON.stringify(this.tag))
                return formDate;
            },
            submit() {
                this.$store.state.loading = true;
                let formDate = this.getValues()
              ArticleService.updateArticle(this.$route.params.article, formDate)
                    .then(() => {
                        HelperClass.showSuccess(this.$noty);
                        if (this.$route.query.from_list) {
                            this.$router.push({name: 'article-list'})
                        } else if (this.$route.query.from_actives) {
                            this.$router.push({name: 'article-actives'})
                        } else if (this.$route.query.from_de_actives) {
                            this.$router.push({name: 'article-de-actives'})
                        }
                    }).catch(error => {
                    HelperClass.showErrors(error, this.$noty)
                });
            }
        }
    }
</script>

<style scoped>

</style>