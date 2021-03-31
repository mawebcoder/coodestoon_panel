<template>
    <div >
        <!--        edit modal-->
        <modal title="ویرایش نقش">
            <div slot="content">
                <label style="color: #fff;margin:4px 0">
                    عنوان فارسی نقش :
                </label>
                <div class="form-group">
                    <VueInputUi type="array" label="نام نقش به فارسی..." v-model="fa_name"/>
                </div>
                <div class="form-group">
                    <div @click="update" class="submit_button">
                        ثبت
                    </div>
                </div>
            </div>
        </modal>
        <!--        end edit modal-->

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
        <template v-if="show_pagination">
            <div dir="ltr" style="margin-top: 20px;margin-bottom: 100px">
                <vs-pagination :total="last_page" v-model="current"></vs-pagination>
            </div>
        </template>

    </div>

</template>

<script>
    import HelperClass from "@/services/HelperClass";
    import Modal from "@/layouts/Modal";
    import RoleService from "../../services/Roles/RoleService";
    const VueInputUi = () => import('vue-input-ui');
    export default {
        name: "List",
        data() {
            return {
                show_pagination: true,
                columns: [
                    {
                        label: 'عنوان فارسی',
                        field: 'fa_name',
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
                fa_name: '',
                name: '',
                id: '',
                current: 1,
                search_value: '',
                last_page: 0,
            }
        },
        watch: {
            current(value) {
                this.$store.state.loading = true;
                RoleService.paginate(value)
                    .then(res => {
                        let list = [];
                        res.data.data.data.forEach(item => {
                            list.push(
                                {
                                    id: item.id,
                                    fa_name: item.fa_name,
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
            this.$store.state.pageTitle = 'لیست نقش ها';
            this.getListOfTheRoles();
        },
        methods: {
            searchInTable() {
                this.show_pagination=false
                if (this.search_value.trim() === '') {
                    this.getListOfTheRoles();
                    this.show_pagination=true
                    return
                }
                this.$store.state.loading = true;
                RoleService.search(this.search_value)
                    .then((res) => {
                        let list = [];
                        if (res.status === 204) {
                            this.rows = [];
                            this.$store.state.loading = false;
                            return
                        }
                        res.data.data.forEach(item => {

                            list.push(
                                {
                                    id: item.id,
                                    fa_name: item.fa_name,
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
                    fa_name: this.fa_name,
                }
                RoleService.update(this.id, data)
                    .then(() => {
                        this.getListOfTheRoles();
                        HelperClass.showSuccess(this.$noty);
                        this.$store.state.modal_show = false;
                    }).catch(error => {
                    HelperClass.showErrors(error, this.$noty);
                })
            },

            getListOfTheRoles() {
                this.$store.state.loading = true;
                RoleService.getListOfTheRoles()
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
                                    fa_name: item.fa_name,
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
            showEditModal(row) {
                this.fa_name = row.fa_name;
                this.name = row.name;
                this.id = row.id;
                this.$store.state.modal_show = true;
            },
            hideEditModal(){
                this.$store.state.modal_show = true;
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
                        RoleService.delete(data)
                            .then(() => {
                                this.selected = [];
                                if (this.current > 1) {
                                    this.current = this.current - 1;
                                }

                                this.getListOfTheRoles();
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
            Modal,
            VueInputUi,
        },
        mounted() {
            document.addEventListener('keyup',(e)=>{
               if (e.keyCode===27){
                   this.$store.state.modal_show=false
               }
            })
        }
    }
</script>

<style scoped lang="scss">

</style>