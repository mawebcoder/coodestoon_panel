<template>
  <div>
    <div class="row">
      <div class="col-6 row justify-content-center">
        نام ارسال کننده : محمد امیری
      </div>
      <div class="col-6 row justify-content-center">
        شماره تیکت : ۷۶۵۴۳
      </div>
    </div>
    <div class="row">
      <div class="col-6 row justify-content-center">
        تاریخ ایجاد :۱۳۶۵/۸۷/۶۵
      </div>
      <div class="col-6 row justify-content-center">
        عنوان : عنوان تیکتعنوان تیکتعنوان تیکتعنوان تیکتعنوان تیکت
      </div>
    </div>
    <div class="row">
      <div class="col-6 row justify-content-center">
        اولویت : بالا
      </div>
      <div class="col-6 row justify-content-center">
        دپارتمان : مالی
      </div>
    </div>

    <div class="row">
      <div class="col-6 row justify-content-center">
        وضعیت :    <span class="deactive_button">بسته</span>
      </div>
      <div class="col-6 row justify-content-center">
        آخرین پاسخ : پاسخ کاربر
      </div>
    </div>
    <div class="row">
      <div class="col-4">
        <span @click="show_editor=!show_editor" class="active_button">
          پاسخ
        </span>
      </div>
    </div>
    <div class="editor-box"  v-if="show_editor" >
      <editor
          v-model="description"
          api-key="214siyv4hmul2xqvhali31m8ox5kxrskd3g1k5b6an2ft09l"
          :init="{
                menubar: true,
                plugins: [
                'advlist codesample autolink link image lists charmap print preview hr anchor pagebreak',
                'searchreplace wordcount visualblocks visualchars code fullscreen insertdatetime media nonbreaking',
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

      <div id="submit_button">
        <span class="submit_button">
          ثبت
        </span>
      </div>

    </div>
    <div>
      <div class="row_section">
        <div class="row first-row">
          <div class="col-3">نام مدیر : نام مدیر</div>
          <div class="col-6"></div>
          <div class="col-3">تاریخ : ۱۴۰۰/۱/۱</div>
        </div>
        <div class="ticket-content">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. At distinctio dolorum eligendi esse, expedita hic inventore laudantium minus modi molestiae quaerat reprehenderit repudiandae. Alias in incidunt iure reprehenderit rerum saepe.
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab accusantium, autem corporis debitis dolore dolorem doloribus eius esse excepturi harum illum ipsum iste itaque libero molestias nihil quibusdam reiciendis reprehenderit!
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Editor from '@tinymce/tinymce-vue'
export default {
  name: "TicketPage",
  data(){
    return {
      description:'',
      show_editor:false
    }
  },
  components:{
    Editor
  }
}
</script>

<style scoped lang="scss">
.row {
  margin-bottom: 10px;
}
.editor-box{
  margin-bottom: 30px;
  overflow: hidden;
}
#submit_button{
  margin-top: 10px;
}
.row_section {
  min-height: 100px;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(108, 110, 111, 0.3);

  .first-row {
    height: 50px;
    background-color: rgba(209, 212, 214, 0.81);

    > div {
      padding-right: 10px;
      line-height: 49px;
    }
  }
  .ticket-content{
    padding: 30px;
    direction: rtl;
    text-align: justify;
  }
}


</style>