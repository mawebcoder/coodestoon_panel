<template>
  <div>
    <div class="row">
      <div class="col-6 row justify-content-center">
        نام ارسال کننده : {{ user_name }}
      </div>
      <div class="col-6 row justify-content-center">
        شماره تیکت : {{ ticket_code }}
      </div>
    </div>
    <div class="row">
      <div class="col-6 row justify-content-center">
        تاریخ ایجاد : <span dir="ltr">{{ date }}</span>
      </div>
      <div class="col-6 row justify-content-center">
        عنوان :{{ origin_title }}
      </div>
    </div>
    <div class="row">
      <div class="col-6 row justify-content-center">
        اولویت : {{ priority }}
      </div>
      <div class="col-6 row justify-content-center">
        دپارتمان : {{ department_name }}
      </div>
    </div>

    <div class="row">
      <div class="col-6 row justify-content-center">
        وضعیت : <span v-if="!is_closed" class="active_button">باز</span><span v-else class="deactive_button">بسته</span>
      </div>
      <div class="col-6 row justify-content-center">
        آخرین پاسخ : {{ isAnswered }}
      </div>
    </div>
    <div class="row">
      <div class="col-4">
        <span @click="show_editor=!show_editor" class="active_button">
          پاسخ
        </span>
      </div>
    </div>
    <div class="editor-box" v-if="show_editor">
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
      <div v-bind:key="value.id" v-for="value in children" class="row_section">
        <div class="row first-row">
          <div v-if="value.admin!==null" class="col-3">نام مدیر : {{value.admin.name+' '+ value.admin.family}}</div>
          <div v-else class="col-3">{{user_name}}</div>
          <div class="col-6"></div>
          <div class="col-3">تاریخ : {{value.date}}</div>
        </div>
        <div class="ticket-content">
         {{value.text}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TicketService from "@/services/Ticket/TicketService";
import HelperClass from "@/services/HelperClass";
import Editor from '@tinymce/tinymce-vue'

export default {
  name: "TicketPage",
  data() {
    return {
      description: '',
      show_editor: false,
      title: '',
      origin_text: '',
      date: '',
      user_name: '',
      ticket_code: '',
      is_closed: 0,
      department_name: '',
      children: [],
      origin_title: '',
      priority: '',
      is_answered: 0,
    }
  },
  computed: {
    isAnswered() {
      return this.is_answered ? 'پاسخ مدیر' : 'پاسخ کاربر';
    }
  },
  methods: {
    getValues(res) {
      let data = res.data.data;
      let origin_ticket = data.origin_ticket;

      let children = data.children;

      let user = data.origin_user;
      let department = data.department;
      this.department_name = department.fa_name;
      this.is_closed = origin_ticket.is_closed;
      this.user_name = user.name + ' ' + user.family;
      this.date = data.date;
      this.origin_text = origin_ticket.text;
      this.children = children;
      this.is_answered = data.is_answered;
      this.ticket_code = origin_ticket.ticket_code;
      this.origin_title = origin_ticket.title;
      this.priority = data.priority;
    }
  },
  created() {
    TicketService.getTicketInformation(this.$route.params.ticket_id)
        .then(res => {
          this.getValues(res)
        }).catch(error => {
      HelperClass.showErrors(error, this.$noty)
    })
  },
  components: {
    Editor
  }
}
</script>

<style scoped lang="scss">
.row {
  margin-bottom: 10px;
}

.editor-box {
  margin-bottom: 30px;
  overflow: hidden;
}

#submit_button {
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

  .ticket-content {
    padding: 30px;
    direction: rtl;
    text-align: justify;
  }
}


</style>