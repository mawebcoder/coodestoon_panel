<template>
    <div>
        <modal title="ویرایش تگ">
            <div slot="content">
                <label style="color: #fff;margin:4px 0">
                    نام فارسی تگ :
                </label>
                <div class="form-group">
                    <VueInputUi type="array" label="نام تگ به فارسی..." v-model="fa_title"/>
                </div>
                <label style="color: #fff;margin:4px 0">
                    نام انگلیسی تگ :
                </label>
                <div class="form-group">
                    <VueInputUi type="array" label="نام تگ به فارسی..." v-model="en_title"/>
                </div>
                <div class="form-group">
                    <div @click="update" class="submit_button">
                        ثبت
                    </div>
                </div>
            </div>
        </modal>
        <span @click="deleteItems" class="delete_button">
            <box-icon color="#fff" name='trash'></box-icon>
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
        <div dir="ltr" style="margin-top: 20px;margin-bottom: 100px">
            <vs-pagination :total="last_page" v-model="current"></vs-pagination>
        </div>
    </div>
</template>

<script>
    import ArticleService from "@/services/articles/ArticleService";
    import HelperClass from "@/services/HelperClass";
    import Modal from "@/layouts/Modal";
    const VueInputUi = () => import('vue-input-ui');
    export default {
        name: "ActiveTagsList",
        data() {
            return {
                columns: [
                    {
                        label: 'عنوان فارسی',
                        field: 'fa_title',
                    },
                    {
                        label: 'عنوان لاتین',
                        field: 'en_title',
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
                    }, {
                        label: 'تغییر وضعیت',
                        field: 'switch_condition',
                        html: true
                    },
                    {
                        label: 'ویرایش',
                        field: 'edit',
                        html: true
                    },
                    {
                        label: 'انتخاب',
                        field: 'delete',
                        html: true
                    }
                ],
                rows: [],
                selected: [],
                fa_title: '',
                en_title: '',
                status: '',
                id: '',
                current: 1,
                search_value: '',
                last_page: 0,
            }
        },
        watch: {
            current(value) {
                this.$store.state.loading = true;
                ArticleService.paginateDeActiveTags(value)
                    .then(res => {
                        let list = [];
                        res.data.data.data.forEach(item => {
                            list.push(
                                {
                                    id: item.id,
                                    fa_title: item.fa_title,
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
        created() {
            this.$store.state.pageTitle = 'لیست تگ های غیر فعال مقالات';
            this.getDeActiveTags()
        },
        methods: {
            searchInTable() {
                if (this.search_value.trim() === '') {
                    this.getDeActiveTags()
                    return
                }
                this.$store.state.loading = true;
                ArticleService.searchInDeActives(this.search_value)
                    .then((res) => {
                        let list = [];
                        if (res.status === 204) {
                            this.rows = [];
                            this.$store.state.loading = false;
                            return
                        }

                        res.data.data.data.forEach(item => {

                            list.push(
                                {
                                    id: item.id,
                                    fa_title: item.fa_title,
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
                    HelperClass.showErrors(error, this.$noty);
                })
            },
            update() {
                this.$store.state.loading = true;
                let data = {
                    fa_title: this.fa_title,
                    en_title: this.en_title,
                    status: this.status
                }
                ArticleService.updateTag(this.id, data)
                    .then(() => {
                        this.getDeActiveTags()
                        HelperClass.showSuccess(this.$noty);
                        this.$store.state.modal_show = false;
                    }).catch(error => {
                    HelperClass.showErrors(error, this.$noty);
                    this.$store.state.modal_show = false;
                })
            },
            getDeActiveTags() {
                this.$store.state.loading = true;
                ArticleService.getDeActiveTags(this.current)
                    .then(res => {
                        let list = [];
                        if (res.status === 204) {
                            this.rows = list;
                            this.$store.state.loading = false;
                            this.last_page = 0;
                            return
                        }
                        this.last_page = res.data.data.last_page;

                        res.data.data.data.forEach(item => {

                            list.push(
                                {
                                    id: item.id,
                                    fa_title: item.fa_title,
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
                    if (error.response) {
                        HelperClass.showErrors(error, this.$noty)
                    }
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
            showEditModal(row) {
                this.fa_title = row.fa_title;
                this.en_title = row.en_title;
                this.status = row.condition;
                this.$store.state.modal_show = true;
                this.id = row.id;
            },
            onCellClick(params) {
                let tagName = params.event.target.tagName;
                let column_name = params.column.field;
                let row_object = params.row
                switch (tagName) {
                    case ("BOX-ICON"):
                        if (column_name === 'edit') {
                            this.showEditModal(row_object)
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
                        ArticleService.deleteTags(data)
                            .then(() => {
                                this.selected = [];
                                if (this.current > 1) {
                                    this.current = this.current - 1;
                                }

                                this.getDeActiveTags()
                                HelperClass.scrollTop();
                                HelperClass.showSuccess(this.$noty)
                            }).catch(error => {
                            HelperClass.scrollTop();
                            HelperClass.showErrors(error, this.$noty)
                        });
                    }
                })

            },
            switchCondition(row) {
                this.$store.state.loading = true;
                let data = {
                    fa_title: row.fa_title,
                    en_title: row.en_title,
                    status: row.condition ? 0 : 1
                }

                ArticleService.switchActivation(row.id, data)
                    .then(() => {
                        this.getDeActiveTags()
                        HelperClass.showSuccess(this.$noty)
                    }).catch(error => {
                    HelperClass.showErrors(error, this.$noty)
                    this.$store.state.loading = false;
                })
            },
        },
        components: {
            Modal,
            VueInputUi
        }
    }
</script>

<style scoped>

</style>