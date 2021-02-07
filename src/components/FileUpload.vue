<template>
    <div>
        <div class="upload_image_box">
            <form enctype="multipart/form-data" ref="form">
                <i @click="removePreview($event)" class="remove">
                    <box-icon color="red" type='solid' name='minus-circle'></box-icon>
                </i>
                <img>
                <input @change="showPreview($event)" type="file" accept="image/jpeg,image/png,image/gif,image/jpg">
            </form>
            <i class="plus">
                <box-icon size="lg" color="orange" type="solid" name='plus-square'></box-icon>
            </i>
        </div>
    </div>
</template>

<script>
    import HelperClass from "@/services/HelperClass";

    export default {
        name: "FileUpload",
        methods: {
            showPreview(e) {
                let inputElement = e.target;
                let formElement = this.$refs.form;
                let valid_formats = ['image/jpeg', 'image/jpg', 'image/gif', 'image/png']

                let validation_result = HelperClass.validateFileUpload(inputElement, formElement, 2, valid_formats)

                if (!validation_result) {
                    return;
                }
                HelperClass.showImagePreview(inputElement, formElement)
            },
            removePreview(e) {
                let formElement = e.target.closest('form');
                let inputElement = formElement.querySelector('input');
                HelperClass.removeImagePreview(inputElement, formElement)
            }
        }
    }
</script>

<style scoped>

</style>