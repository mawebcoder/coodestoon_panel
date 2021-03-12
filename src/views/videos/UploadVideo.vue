<template>
  <div>
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
      this.width=0;
      this.with = await axios.post('/v1/videos/upload/' + this.$route.params.id, formData, {
        onUploadProgress:  (e)=> {
          let percent = Math.floor(e.loaded / e.total) * 100;
          this.width=percent
          if (this.width===100){
            this.$noty.success('آپلود با موفقیت انجام شد')
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
</style>