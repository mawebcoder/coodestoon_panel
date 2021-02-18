<template>
    <div style="width: 90%;margin: auto">
        <label>
            نام نقش به فارسی:
        </label>
        <div class="form-group">
            <VueInputUi type="array" label="نام نقش به فارسی..." v-model="fa_name"/>
        </div>
        <label>
            نام نقش به انگلیسی:
        </label>
        <div class="form-group">
            <VueInputUi type="array" label="نام نقش به انگلیسی..." v-model="en_name"/>
        </div>
        <div class="form-group">
            <span @click="submit" class="submit_button">
                ثبت
            </span>
        </div>

    </div>
</template>

<script>
    import HelperClass from "@/services/HelperClass";
    import RoleService from "@/services/Roles/RoleService";

    const VueInputUi = () => import('vue-input-ui');
    export default {
        name: "CreateTag",
        created() {
            this.$store.state.pageTitle='ایجاد نقش جدید'
        },
        data() {
            return {
                fa_name: '',
                en_name: '',
            }
        },
        methods: {
            submit() {
                this.$store.state.loading=true
                let data = {
                    'fa_name': this.fa_name,
                    'name': this.en_name,
                }
                RoleService.StoreNewRole(data).then(() => {
                    HelperClass.showSuccess(this.$noty)
                    this.en_name = '';
                    this.fa_name = '';
                    this.$store.state.loading=false
                    HelperClass.scrollTop();
                }).catch(error => {
                    HelperClass.scrollTop();
                    HelperClass.showErrors(error, this.$noty);
                    this.$store.state.loading=false
                })
            }
        },
        components: {
            VueInputUi,
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