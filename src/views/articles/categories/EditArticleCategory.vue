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
            توضیحات تکمیلی :
        </label>
        <div class="form-group" style="min-height: 200px">
            <vs-textarea height="300" label="اینجا وارد کنید..." v-model="description"/>
        </div>
        <label>
            عکس کاور(الزامی) :
        </label>
        <file-upload :src="image_url"></file-upload>
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
            <Button link="article-category-active" icon="chevron-left"></Button>
        </template>
        <template v-else-if="$route.query.from_de_actives">
            <Button link="article-category-deactive" icon="chevron-left"></Button>
        </template>
        <template v-else>
            <Button link="article-category-list" icon="chevron-left"></Button>
        </template>
        <div style="height: 300px"></div>
    </div>
</template>

<script>
    import HelperClass from "@/services/HelperClass";
    import FileUpload from "@/components/FileUpload";
    import Button from "@/components/Button";
    import CategoryService from "@/services/articles/CategoryService";
    const VueInputUi = () => import('vue-input-ui');

    export default {
        name: "ActiveArticleCategories",
        data() {
            return {
                image_url: '',
                fa_title: '',
                en_title: '',
                description: '',
                status: '',
                cover_file_name: '',
                parents: [],
                parent: 0,
                categories: [],
                is_show_parent: true
            }
        },
        created() {
            this.$store.state.pageTitle = 'ویرایش دسته بندی مقالات'
            this.$store.state.loading = true;
            this.getInfo();
        },
        methods: {
            getInfo() {

                CategoryService.editArticleCategory(parseInt(this.$route.params.articleCategory))
                    .then(res => {
                        let data = res.data.data;
                        let parents = data.categories;
                        if (!parents.length) {
                            this.is_show_parent = false
                        }
                        this.fa_title = data.category.fa_title;
                        this.en_title = data.category.en_title;
                        this.description = data.category.description;
                        this.status = data.category.status;
                        // this.parent = data.category.parent;
                        this.cover_file_name = data.category.cover_file_name;
                        this.$store.state.loading = false;
                        parents.forEach(item => {
                            this.categories.push({value: item.id, text: item.fa_title})
                        })
                        this.categories.push({text: 'بدون والد', value: 0})
                        this.image_url = `${this.$store.state.baseUrl}/storage/images/articles/categories/${this.$route.params.articleCategory}/${this.cover_file_name}`
                        if (data.category.parent) {
                            this.parent = data.category.parent
                            return
                        }
                    }).catch(error => {
                    HelperClass.showErrors(error, this.$noty)
                })
            },
            submit() {
                this.$store.state.loading = true;
                let formData = new FormData();
                formData.append('fa_title', this.fa_title);
                formData.append('en_title', this.en_title);
                formData.append('status', this.status);
                formData.append('description', this.description);
                formData.append('file', this.$store.state.file);
                formData.append('parent', this.parent)
                let id = this.$route.params.articleCategory;
                CategoryService.UpdateArticleCategory(id, formData)
                    .then(() => {
                        HelperClass.showSuccess(this.$noty)
                        if (this.$route.query.from_actives) {
                            this.$router.push({name: 'article-category-active'})
                        } else if (this.$route.query.from_de_actives) {
                            this.$router.push({name: 'article-category-deactive'})
                        } else {
                            this.$router.push({name: 'article-category-list'})
                        }
                    }).catch(err => {
                    HelperClass.showErrors(err, this.$noty)
                })
            }
        },
        computed: {
            statusCondition() {
                return this.status ? 'فعال' : 'غیر فعال'
            }
        },
        components: {
            FileUpload,
            VueInputUi,
            Button
        }

    }
</script>

<style scoped>

</style>