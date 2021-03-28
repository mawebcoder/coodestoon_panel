import store from "../store/vuex";
import swal from "sweetalert2";

class HelperClass {

    numberFormat(num) {
        var str = num.toString().split('.');
        if (str[0].length >= 5) {
            str[0] = str[0].replace(/(\d)(?=(\d{3})+$)/g, '$1,');
        }
        if (str[1] && str[1].length >= 5) {
            str[1] = str[1].replace(/(\d{3})/g, '$1 ');
        }
        return str.join('.');
    }

    // show the server errors
    showErrors(error, noty) {
        store.state.loading = false
        if (error.response) {
            let errors = error.response.data.errors
            if (typeof (errors) != "undefined") {
                for (let key in errors) {
                    noty.error(errors[key], {
                        timeout: 2000,
                        progressBar: true,
                    })
                }
            } else {
                let status_code = error.response.status;
                let object = {
                    '403': 'دسترسی غیر مجاز',
                    '404': 'صفحه مورد نظر یافت نشد',
                    '500': 'خطای سرور رخ داده است',
                    '503': 'سرور در حال به روزر رسانی است',
                    '401': 'ابتدا باید وارد شوید',
                    '429': 'تعداد دفعات درخواست به سرور بیش از حد مجاز',
                    '410': 'صفحه مورد نظر ناپدید شده است',
                    '405': 'متد ارسالی نامعتبر است'
                }
                noty.error(object['' + status_code], {
                    timeout: 2000,
                    progressBar: true,
                })
            }

        }
    }


    // show success message
    showSuccess(noty) {
        store.state.loading = false;
        noty.success('عملیات با موفقیت انجام شد');
        this.scrollTop()
    }


    //scroll page top
    scrollTop() {
        let scrollTop = window.pageYOffset;
        let scrollTopSetInterval = setInterval(() => {
            scrollTop = scrollTop - 30;
            if (scrollTop <= 0) {
                clearInterval(scrollTopSetInterval)
            }
            window.scrollTo(0, scrollTop);
        }, 20)
    }


    //check is array empty?
    checkIsEmpty(data) {
        if (data.length === 0) {
            swal.fire({
                text: 'حداقل یک مورد را انتخاب کنید',
                icon: 'warning'
            })
            return true;
        }
        return false;
    }


    // swal asking modal
    showSwalAsking() {
        return swal.fire({
            text: 'آیا اطمینان دارید؟',
            icon: 'warning',
            showConfirmButton: true,
            showCancelButton: true,
            cancelButtonText: 'خیر',
            confirmButtonColor: 'red',
            cancelButtonColor: 'green',
            confirmButtonText: 'بله'
        })
    }

    // images methods
    validateFileUpload(inputElement, formElement, size = null, validTypes = null) {
        let file = inputElement.files[0];
        let file_size = file['size'];
        let file_type = file['type'];
        if (file_size > size * 1024 * 1024) {
            swal.fire({
                text: 'سایز فایل بیشتر از ' + size + ' مگابایت نمیتواند باشد',
                icon: 'warning'
            })
            formElement.reset();
            return false;
        }
        if (!validTypes.includes(file_type)) {
            swal.fire({
                text: 'فرمت فایل نادرست است',
                icon: 'warning'
            })
            formElement.reset();
            return false
        }
        return true;
    }

    // show image preview and store the file in store
    showImagePreview(inputElement, formElement) {
        store.state.file = null;
        let fileReader = new FileReader();
        let img = formElement.querySelector('img');
        if (img) {
            img.remove();
        }
        fileReader.onload = function (e) {
            let src = e.target.result;
            let img = document.createElement('img');
            formElement.insertAdjacentElement('beforeend', img);
            img.src = src
        }
        fileReader.readAsDataURL(inputElement.files[0]);
        store.state.file = inputElement.files[0];
        formElement.querySelector('i.remove').style.display = 'block'
    }

    // remove  image previews in system
    removeImagePreview(inputElement, formElement) {
        store.state.file = null;
        formElement.querySelector('img').remove();
        formElement.querySelector('i.remove').style.display = 'none'
        formElement.reset()
    }

    // remove all images previews in system
    removeAllImagePreviews() {
        store.state.file = null;
        let forms = document.querySelectorAll('form');
        forms.forEach(item => {
            item.reset();
            item.querySelector('img').remove();
            item.querySelector('i.remove').style.display = 'none'
        })

    }

    checkNumberValidation(event) {
        let keyCode = event.keyCode;
        if (!event.target.value.length) {
            if (keyCode === 48) {
                event.preventDefault()
            }
        }
        if (keyCode === 189 || keyCode === 187 || keyCode === 69) {
            event.preventDefault();
        }
    }

    spliceTeacherName(teacher_name) {
        return teacher_name.length < 20 ? teacher_name : teacher_name.slice(0, 20) + "..."
    }

    uploadVideoValidation(file) {
        let file_size = file['size'];
        if (file_size > 419430400) {
            return false;
        }
        return true;
    }

}

export default new HelperClass();