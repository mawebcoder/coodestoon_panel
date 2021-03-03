<template>
    <div>
           <span style="display: inline-block" @click="deleteItems" class="delete_button">
            <box-icon color="#fff" name='trash'></box-icon>
        </span>
        <span title="بازیابی موارد انتخابی" style="display: inline-block;background-color:rgba(54,166,184,0.95);"
              @click="restoreItems" class="delete_button">
            <box-icon color="#fff" name='recycle'></box-icon>
        </span>
        <div class="form-group">
            <VueInputUi @keyup="searchInTable" type="array" label="جستجو..." v-model="search_value"/>
        </div>
        <vue-good-table mode="remote"
                        :line-numbers="true"
                        :rtl="true"
                        :columns="columns"
                        :rows="rows"
                        @on-cell-click="onCellClick"
        />
        <template v-if="show_pagination">
            <div dir="ltr" style="margin-top: 20px;margin-bottom: 100px">
                <vs-pagination :total="last_page" v-model="current"></vs-pagination>
            </div>
        </template>
    </div>
</template>

<script>

    import HelperClass from "@/services/HelperClass";
    import CategoryService from "@/services/articles/CategoryService";
    const VueInputUi = () => import('vue-input-ui');
    export default {
        name: "ArticleCategoryList",
        created() {
            this.$store.state.loading = true;
            this.$store.state.pageTitle = 'سطل زباله دسته بندی های مقالات';
            this.getListOfTheTrashesArticleCategories();
        },
        data() {
            return {
                show_pagination: true,
                current: 1,
                search_value: '',
                selected: [],
                columns: [
                    {
                        label: 'عنوان فارسی',
                        field: 'fa_title',
                    },
                    {
                        label: 'عنوان لاتین',
                        field: 'en_title_show',
                        html: true
                    },
                    {
                        label: 'en_title',
                        field: 'en_title',
                        hidden: true
                    },
                    {
                        label: 'condition',
                        field: 'condition',
                        hidden: true
                    },
                    {
                        label: 'وضعیت',
                        field: 'status',
                        html: true,
                        hidden: true
                    }, {
                        label: 'تغییر وضعیت',
                        field: 'switch_condition',
                        html: true,
                        hidden: true
                    },
                    {
                        label: 'ویرایش',
                        field: 'edit',
                        html: true,
                        hidden: true
                    },
                    {
                        label: 'نام والد',
                        field: 'father',
                        html: true,
                        hidden: true
                    },
                    {
                        label: 'description',
                        field: 'description',
                        hidden: true
                    },
                    {
                        label: 'انتخاب',
                        field: 'delete',
                        html: true
                    }
                ],
                rows: [],
                ArticleCategoriesList: [],
                last_page: 0
            }
        },
        watch: {
            current(value) {
                this.$store.state.loading = true;
                CategoryService.paginateTrashesArticleCategories(value)
                    .then(res => {
                        let list = [];
                        res.data.data.data.forEach(item => {
                            list.push(
                                {
                                    id: item.id,
                                    fa_title: item.fa_title,
                                    en_title_show: item.en_title ? item.en_title : '<span class="deactive_button">ندارد</span>',
                                    en_title: item.en_title,
                                    condition: item.status,
                                    status: item.status ? '<span class="active_button">فعال</span>' : '<span class="deactive_button">غیر فعال</span>',
                                    switch_condition: item.status ? "<i class='active_it' title='غیر فعال کن'> <box-icon color='red' name='x'></box-icon></i>" : "<i title='فعال کن' class='active_it'><box-icon color='green' name='check'></box-icon></i>",
                                    edit: '<i  title="ویرایش" class="active_it"><box-icon color="green" type=\'solid\' name=\'message-edit\'></box-icon></i>',
                                    delete: '<input type="checkbox"  value="' + item.id + '">'
                                })
                        })
                        this.rows = list;
                        this.$store.state.loading = false;
                    }).catch(error => {
                    HelperClass.showErrors(error, this.$noty)
                })
            }
        },
        methods: {
            getListOfTheTrashesArticleCategories() {
                CategoryService.getListOfTheTrashesArticleCategories(1)
                    .then(res => {
                        let list = [];
                        if (res.status === 204) {
                            this.rows = list;
                            this.$store.state.loading = false;
                            this.last_page = 0;
                            return;
                        }
                        this.last_page = res.data.data.last_page;
                        let result = res.data.data.data;
                        result.forEach(item => {
                            list.push(
                                {
                                    id: item.id,
                                    fa_title: item.fa_title,
                                    en_title_show: item.en_title ? item.en_title : '<span class="deactive_button">ندارد</span>',
                                    en_title: item.en_title,
                                    condition: item.status,
                                    status: item.status ? '<span class="active_button">فعال</span>' : '<span class="deactive_button">غیر فعال</span>',
                                    father: item.father ? item.father.fa_title : '<span class="deactive_button">ندارد</span>',
                                    switch_condition: item.status ? "<i class='active_it' title='غیر فعال کن'> <box-icon color='red' name='x'></box-icon></i>" : "<i title='فعال کن' class='active_it'><box-icon color='green' name='check'></box-icon></i>",
                                    edit: '<i  title="ویرایش" class="active_it"><box-icon color="green" type="solid" name="message-edit"></box-icon></i>',
                                    description: item.description,
                                    delete: '<input type="checkbox"  value="' + item.id + '">'
                                })
                        })
                        this.rows = list;
                        this.$store.state.loading = false;
                    }).catch(error => {
                    HelperClass.showErrors(error, this.$noty)
                });
            },
            searchInTable() {
                this.show_pagination = false
                if (this.search_value.trim() === '') {
                    this.show_pagination = true;
                    this.getListOfTheTrashesArticleCategories();
                    return
                }
                this.$store.state.loading = true;
                CategoryService.searchInTrashesArticleCategories(this.search_value)
                    .then((res) => {
                        let list = [];
                        if (res.status === 204) {
                            this.rows = [];
                            this.$store.state.loading = false;
                            return
                        }
                        let result = res.data.data;
                        result.forEach(item => {
                            list.push(
                                {
                                    id: item.id,
                                    fa_title: item.fa_title,
                                    en_title_show: item.en_title ? item.en_title : '<span class="deactive_button">ندارد</span>',
                                    en_title: item.en_title,
                                    condition: item.status,
                                    status: item.status ? '<span class="active_button">فعال</span>' : '<span class="deactive_button">غیر فعال</span>',
                                    father: item.father ? item.father.fa_title : '<span class="deactive_button">ندارد</span>',
                                    switch_condition: item.status ? "<i class='active_it' title='غیر فعال کن'> <box-icon color='red' name='x'></box-icon></i>" : "<i title='فعال کن' class='active_it'><box-icon color='green' name='check'></box-icon></i>",
                                    edit: '<i  title="ویرایش" class="active_it"><box-icon color="green" type="solid" name="message-edit"></box-icon></i>',
                                    description: item.description,
                                    delete: '<input type="checkbox"  value="' + item.id + '">'
                                })
                        })
                        this.rows = list;
                        this.$store.state.loading = false;
                    }).catch(error => {
                    HelperClass.showErrors(error, this.$noty);
                })
            },
            switchCondition(row) {
                this.$store.state.loading = true;
                let data = {
                    fa_title: row.fa_title,
                    en_title: row.en_title,
                    status: row.condition ? 0 : 1,
                    description: row.description
                }

                CategoryService.switchArticleCategoryStatus(row.id, data)
                    .then(() => {
                        this.getListOfTheTrashesArticleCategories();
                        HelperClass.showSuccess(this.$noty)
                    }).catch(error => {
                    HelperClass.showErrors(error, this.$noty)
                })
            },
            selectItems(inputElement) {
                let value = inputElement.value;
                if (inputElement.checked) {
                    this.selected.push(parseInt(value))
                } else {
                    const index = this.selected.indexOf(value);
                    this.selected.splice(index, 1);
                }

            },
            deleteItems() {
                if (HelperClass.checkIsEmpty(this.selected)) {
                    return
                }
                HelperClass.showSwalAsking().then(result => {

                    if (result.value) {
                        this.$store.state.loading = true
                        let data = {
                            ids: this.selected
                        }
                        CategoryService.forceDeleteArticleCategory(data)
                            .then(() => {
                                this.selected = [];
                                if (this.current > 1) {
                                    this.current = this.current - 1;
                                }
                                this.getListOfTheTrashesArticleCategories();
                                HelperClass.scrollTop();
                                HelperClass.showSuccess(this.$noty)
                            }).catch(error => {
                            HelperClass.scrollTop();
                            HelperClass.showErrors(error, this.$noty)
                        });
                    }
                })

            },
            onCellClick(params) {
                let tagName = params.event.target.tagName;
                let column_name = params.column.field;
                let row_object = params.row
                switch (tagName) {
                    case ("BOX-ICON"):

                        if (column_name === 'edit') {
                            this.$router.push({
                                name: 'article-category-edit',
                                params: {articleCategory: row_object.id},
                                query: {from_de_actives: true}
                            })
                        } else if (column_name === 'switch_condition') {
                            this.switchCondition(row_object)
                        }
                        break
                    case ('INPUT'):
                        this.selectItems(params.event.target)
                        break
                    default:
                        break
                }
            },
            restoreItems() {
                if (HelperClass.checkIsEmpty(this.selected)) {
                    return
                }
                HelperClass.showSwalAsking().then(result => {

                    if (result.value) {
                        this.$store.state.loading = true
                        let data = {
                            ids: this.selected
                        }
                        CategoryService.restoreArticleCategories(data)
                            .then(() => {
                                this.selected = [];
                                if (this.current > 1) {
                                    this.current = this.current - 1;
                                }

                                this.getListOfTheTrashesArticleCategories()
                                HelperClass.scrollTop();
                                HelperClass.showSuccess(this.$noty)
                            }).catch(error => {
                            HelperClass.scrollTop();
                            HelperClass.showErrors(error, this.$noty)
                        });
                    }
                })
            }
        },
        components: {
            VueInputUi
        }
    }
</script>

<style scoped>

</style>