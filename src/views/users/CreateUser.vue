<template>
    <div>
        <label>
            نام کاربر :
        </label>
        <div class="form-group">

            <VueInputUi autocomplete="off" type="array" label="نام کاربر..." v-model="en_title"/>
        </div>
        <label>
            نام خانوادگی کاربر :
        </label>
        <div class="form-group">

            <VueInputUi autocomplete="off" type="array" label="نام خانوادگی کاربر..." v-model="en_title"/>
        </div>
        <label>
            شماره تماس کاربر :
        </label>
        <div class="form-group">

            <VueInputUi autocomplete="off" type="array" label="شماره همراه کاربر..." v-model="en_title"/>
        </div>
        <label>
            تکرا شماره تماس کاربر :
        </label>
        <div class="form-group">

            <VueInputUi autocomplete="off" type="array" label="شماره همراه کاربر..." v-model="en_title"/>
        </div>
        <label>
            ایمیل کاربر :
        </label>
        <div class="form-group">

            <VueInputUi autocomplete="off" type="array" label="شماره همراه کاربر..." v-model="en_title"/>
        </div>
        <label>
            تکرار ایمیل :
        </label>
        <div class="form-group">

            <VueInputUi autocomplete="off" type="array" label="شماره همراه کاربر..." v-model="en_title"/>
        </div>
        <label>
            رمز عبور پیش فرض :
        </label>
        <div class="form-group">

            <VueInputUi autocomplete="off" type="array" label="شماره همراه کاربر..." v-model="en_title"/>
        </div>
        <label>
            تکرار رمز عبور:
        </label>
        <div class="form-group">

            <VueInputUi autocomplete="off" type="array" label="شماره همراه کاربر..." v-model="en_title"/>
        </div>

        <div style="margin-bottom: 40px">
            <vs-select
                    placeholder="انتخاب نقش..."
                    class="selectExample"
                    label="انتخاب نقش :"
                    v-model="tag"

            >
                <vs-select-item :key="index" :value="item.value" :text="item.text" v-for="(item,index) in tags"/>
            </vs-select>
        </div>


        <label>
            عکس پروفایل(الزامی) :
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
    import ArticleService from "@/services/articles/ArticleService";
    import HelperClass from "@/services/HelperClass";
    import FileUpload from "@/components/FileUpload";

    const VueInputUi = () => import('vue-input-ui');
    export default {
        name: "CreateArticleCategory",
        data() {
            return {
                name: '',
                family: '',
                cell: '',
                email: '',
                password: '',
            }
        },
        created() {
            this.$store.state.pageTitle = 'ایجاد کاربر جدید';
            this.getCategories();
            this.getActiveTagsList()
        },
        components: {
            VueInputUi,
            FileUpload,
        },
        computed: {
            statusCondition() {
                return this.status ? 'فعال' : 'غیر فعال'
            }
        },
        methods: {
            getCategories() {
                ArticleService.getAllCategories('select_box')
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
                        this.parent = list[0].value
                    }).catch(error => {
                    HelperClass.showErrors(error, this.$noty)
                })
            },
            getActiveTagsList() {
                ArticleService.getActiveTags(this.current)
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