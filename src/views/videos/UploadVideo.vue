<template>
  <div>
    <div style="margin:40px 0">
      <vs-alert color="rgb(231, 154, 23)" active="true">
        در صورت آپلود ویدیو جدید ویدیو قبل حذف خواهد شد و ویدیو جدید جایگزین ویدیو قبل خواهد شد
      </vs-alert>
    </div>
    <form enctype="multipart/form-data">
      <label>
        انتخاب کنید :
      </label>
      <div class="form-group">
        <input type="file" ref="file">
      </div>
    </form>
    <progress-bar :width="width" :show_progress="show_progress"></progress-bar>

    <span @click="upload" class="submit_button">
            آپلود
          </span>

    <div style="margin:40px 0">
      <vs-alert color="rgb(231, 154, 23)" active="true">
        در صورت آپلود ویدیو در کادر زیر میتوانید آن را مشاهده کنید
      </vs-alert>
    </div>
    <template v-if="show_video" >
      <div class="d-flex justify-content-center position-relative">

        <video class="position-absolute" controls name="media">
          <source type="video/mp4" :src="`${$store.state.baseUrl}/api/v1/video-stream/${$route.params.id}`">
        </video>
        <div  class="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
      </div>
    </template>
  </div>
</template>

<script>
import VideosService from "@/services/Videos/VideosService";
import HelperClass from "@/services/HelperClass";
import ProgressBar from "@/components/ProgressBar";
import axios from "axios";

export default {
  name: "UploadVideo",
  created() {
    this.getVideoInformation()
  },
  data() {
    return {
      video_title: '',
      video_id: '',
      file: '',
      width: 0,
      show_progress: false,
      myVideos: [],
      show_video: false,

    }
  },
  components: {
    ProgressBar
  },
  methods: {
    getVideoInformation() {
      VideosService.getVideoInformation(this.$route.params.id)
          .then(res => {
            this.video_id = res.data.data.id;
            if(res.data.data.video_url_name){
              this.show_video=true
            }else{
              this.show_video=false;
            }
            this.$store.state.pageTitle = `آپلود ویدیو برای قسمت ${res.data.data.fa_title}`
          }).catch(error => {
        HelperClass.showErrors(error, this.$noty)
      })
    },
    async upload() {
      let file_input = this.$refs.file;
      let file_information = file_input.files[0];
      if (typeof file_information === 'undefined') {
        this.$noty.error('یک ویدیو انتخاب کنید', {
          timer: 2000,
          progressBar: true
        })
        return;
      }
      if (!HelperClass.uploadVideoValidation(file_information)) {
        this.$noty.error('حجم فایل نمیتواند بزرگتر از ۴۰۰ مگابایت باشد')
        return;
      }
      let formData = new FormData();
      formData.append('file', file_information)
      this.show_progress = true;
      this.width = 0;
      this.with = await axios.post('/v1/videos/upload/' + this.$route.params.id, formData, {
        onUploadProgress: (e) => {
          let percent = Math.floor(e.loaded / e.total) * 100;
          this.width = percent
          if (this.width === 100) {
            this.$noty.success('آپلود با موفقیت انجام شد')
            this.getVideoInformation();
          }

        }
      })
    },
  },
}
</script>

<style scoped>
input[type='file'] {
  line-height: 45px;
  cursor: pointer;

}

form {
  height: 100px;
  border: 1px solid #9f9f9f;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
}
.lds-spinner {
  color: official;
  display: inline-block;
  position: absolute;
  z-index: 1;
  width: 80px;
  height: 80px;
}
.lds-spinner div {
  transform-origin: 40px 40px;
  animation: lds-spinner 1.2s linear infinite;
}
.lds-spinner div:after {
  content: " ";
  display: block;
  position: absolute;
  top: 3px;
  left: 37px;
  width: 6px;
  height: 18px;
  border-radius: 20%;
  background: #4aebff;
}
.lds-spinner div:nth-child(1) {
  transform: rotate(0deg);
  animation-delay: -1.1s;
}
.lds-spinner div:nth-child(2) {
  transform: rotate(30deg);
  animation-delay: -1s;
}
.lds-spinner div:nth-child(3) {
  transform: rotate(60deg);
  animation-delay: -0.9s;
}
.lds-spinner div:nth-child(4) {
  transform: rotate(90deg);
  animation-delay: -0.8s;
}
.lds-spinner div:nth-child(5) {
  transform: rotate(120deg);
  animation-delay: -0.7s;
}
.lds-spinner div:nth-child(6) {
  transform: rotate(150deg);
  animation-delay: -0.6s;
}
.lds-spinner div:nth-child(7) {
  transform: rotate(180deg);
  animation-delay: -0.5s;
}
.lds-spinner div:nth-child(8) {
  transform: rotate(210deg);
  animation-delay: -0.4s;
}
.lds-spinner div:nth-child(9) {
  transform: rotate(240deg);
  animation-delay: -0.3s;
}
.lds-spinner div:nth-child(10) {
  transform: rotate(270deg);
  animation-delay: -0.2s;
}
.lds-spinner div:nth-child(11) {
  transform: rotate(300deg);
  animation-delay: -0.1s;
}
.lds-spinner div:nth-child(12) {
  transform: rotate(330deg);
  animation-delay: 0s;
}
@keyframes lds-spinner {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}

video {
  width: 300px;
  height: 300px;
  border: 1px solid #eee;
  z-index: 2;
  background-color: #fff;
}
</style>