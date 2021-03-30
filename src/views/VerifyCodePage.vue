<template>
  <div>
    <div id="login_box">
      <div class="head">
        تایید کد ارسال شده :
      </div>
      <div class="box">
        <label>
          کد تایید ۶ رقمی :
        </label>
        <div class="form-group">
          <VueInputUi dir="ltr"  v-mask="'######'" class="justify-content-center d-flex"  type="array" label="123456" v-model="code"/>
        </div>
        <span id="time-box">
          <div id="timer" class="row" dir="ltr">
          <div class="days timer_view d-none col-2"></div>
          <div class="hours timer_view d-none col-2"></div>
          <div class="minutes timer_view col-2"></div>
          <div class="seconds timer_view col-2"></div>
        </div>
        </span>

        <div v-if="show_resend_code" class="resend-code" @click="resendCode">ارسال مجدد کد</div>
        <div dir="ltr" id="button_box">
                    <span @click="submit" style="width: 100%;border-radius: 0" class="submit_button">
                        تایید
                    </span>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import Timer from "@/services/Timer";

const VueInputUi = () => import('vue-input-ui');
import AuthService from "@/services/Auth/AuthService";
import HelperClass from "@/services/HelperClass";

export default {
  name: "AuthPage",
  data() {
    return {
      code: '',
      show_resend_code: false,
      expire_date: localStorage.getItem('expire_date')
    }
  },
  methods: {
    submit() {
      if (localStorage.getItem('pass') === null || localStorage.getItem('cell') === null) {
        this.$router.push({name: 'login'})
      }
      let data = this.getValues();
      this.$store.state.loading = true
      AuthService.verifyCode(data)
          .then(res => {

            localStorage.setItem('token', res.data.data.token)

            this.$store.state.loading = false
            this.$noty.success('خوش آمدید')
            this.$router.push({name: 'article-tag-list'})

          }).catch(error => {
        if (error.response.status == 401) {
          this.$store.state.loading = false
          this.$noty.error('اطلاعات وارد شده صحیح نمیباشد')
        } else {
          HelperClass.showErrors(error, this.$noty)
        }
      })
    },
    removePreviousTimer() {
      let timer_box = document.querySelector('#time-box');
      timer_box.querySelector('#timer').remove();
      let timer = document.createElement('div');
      timer.setAttribute('id', 'timer');
      timer.setAttribute('dir', 'ltr')
      timer.setAttribute('class', 'row')
      timer.style.paddingLeft = '29px';
      timer_box.insertAdjacentElement('beforeend', timer)

      let days = document.createElement('div');
      days.setAttribute('class', 'days d-none col-2')


      let hours = document.createElement('div');
      hours.setAttribute('class', 'hours d-none col-2')


      let minutes = document.createElement('div');
      minutes.setAttribute('class', 'minutes col-2')
      minutes.classList.add('timer_view')

      let seconds = document.createElement('div');
      seconds.setAttribute('class', 'seconds col-2')
      seconds.classList.add('timer_view')

      timer.insertAdjacentElement('beforeend', days)
      timer.insertAdjacentElement('beforeend', hours)
      timer.insertAdjacentElement('beforeend', minutes)
      timer.insertAdjacentElement('beforeend', seconds)
    },
    showTimer() {
      Timer.init({
        element: '#timer',
        date: this.expire_date,
        callback: () => {
          this.show_resend_code = true
        }
      })
    },
    getValues() {
      return {
        code: this.code,
      }
    },
    resendCode() {
      let cell = localStorage.getItem('cell');
      let pass = localStorage.getItem('pass');
      let data = {
        'cell': cell,
        'pass': pass
      }
      this.$store.state.loading = true
      AuthService.resendVerificationCode(data)
          .then(res => {
            localStorage.setItem('expire_date', res.data.data.expire_date);
            this.expire_date = localStorage.getItem('expire_date')
            this.removePreviousTimer();
            this.showTimer()
            this.show_resend_code=false;
            this.$store.state.loading = false
          }).catch(error => {
        if (error.response.status === 401) {
          this.$store.state.loading = false
          this.$noty.error('اطلاعات نامعتبر است')
          return;
        }
        HelperClass.showErrors(error, this.$noty);
      })
    }
  },
  components: {
    VueInputUi
  },
  mounted() {
    this.showTimer();
  }
}
</script>

<style scoped lang="scss">
.resend-code {
  display: inline-block;
  padding-right: 10px;
  margin-top: 10px;
  color: rgba(54, 166, 184, 0.88);
  cursor: pointer;
  text-decoration: underline;
}

#timer {
  padding-left: 29px;
}

.timer_view {

}
.vue-input-ui__input{
  text-align: center !important;
}
#login_box {
  height: 350px;
  width: 300px;
  margin: 30px auto;
  box-shadow: 0 0 5px rgba(89, 86, 84, 0.4);
  border-radius: 4px;
  overflow: hidden;
  position: relative;
}

.head {
  height: 50px;
  background-color: rgba(54, 166, 184, 0.88);
  text-align: center;
  line-height: 45px;
}

.box {
  margin-top: 30px;

}

label {
  display: block;
  padding-right: 10px;
}

.form-group {
  padding-right: 10px;
}

#button_box {
  position: absolute;
  display: block;
  bottom: 0;
  right: 0;
  width: 100%;
}
</style>