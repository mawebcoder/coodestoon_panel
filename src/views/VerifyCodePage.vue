<template>
  <div>
    <div id="login_box">
      <div class="head">
        ورود به پنل
      </div>
      <div class="box">
        <label>
          شماره تلفن :
        </label>
        <div class="form-group">

          <VueInputUi type="array" label="شماره تلفن خود را وارد کنید..." v-model="cell"/>
        </div>

        <label>
          رمز عبور :
        </label>
        <div class="form-group">
          <VueInputUi type="password" label="رمز عبور خود را وارد کنید..." v-model="password"/>
        </div>
        <div dir="ltr" id="button_box">
                    <span @click="submit" style="width: 100%;border-radius: 0" class="submit_button">
                        ورود
                    </span>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
const VueInputUi = () => import('vue-input-ui');
import AuthService from "@/services/Auth/AuthService";
import HelperClass from "@/services/HelperClass";

export default {
  name: "AuthPage",
  data() {
    return {
      cell: '',
      password: ''
    }
  },
  methods: {
    submit() {
      let data = this.getValues();
      this.$store.state.loading=true
      AuthService.login(data)
          .then(res => {
            localStorage.setItem('cell', res.data.data.username)
            this.$router.push({name:'auth-verify-code'})

          }).catch(error => {
        if (error.response.status==401){
          this.$store.state.loading=false
          this.$noty.error('اطلاعات وارد شده صحیح نمیباشد')
        }else{
          HelperClass.showErrors(error,this.$noty)
        }
      })
    },
    getValues() {
      return {
        username: this.cell,
        password: this.password
      }
    }
  },
  components: {
    VueInputUi
  }
}
</script>

<style scoped lang="scss">
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