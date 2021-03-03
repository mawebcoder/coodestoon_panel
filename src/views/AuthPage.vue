<template>
    <div>
        <div id="login_box">
            <div class="head">
                ورود به پنل
            </div>
            <div class="box">
                <label>
                    ایمیل :
                </label>
                <div class="form-group">

                    <VueInputUi type="array" label="ایمیل خود را وارد کنید..." v-model="fa_title"/>
                </div>

                <label>
                    رمز عبور :
                </label>
                <div class="form-group">

                    <VueInputUi  type="array" label="رمز عبور خود را وارد کنید..." v-model="fa_title"/>
                </div>
                <div dir="ltr" id="button_box">
                    <span style="width: 100%;border-radius: 0" class="submit_button">
                        ورود
                    </span>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
    const VueInputUi = () => import('vue-input-ui');

    export default {
        name: "AuthPage",
        components:{
            VueInputUi
        }
    }
</script>

<style scoped lang="scss">
    #login_box {
        height: 350px;
        width: 300px;
        margin: 30px auto;
        box-shadow: 0 0 5px rgba(89,86,84,0.4);
        border-radius: 4px;
        overflow: hidden;
        position: relative;
    }
    .head{
        height: 50px;
        background-color: rgba(54,166,184,0.88);
        text-align: center;
        line-height: 45px;
    }
    .box{
        margin-top: 30px;

    }
    label{
        display: block;
        padding-right: 10px;
    }
    .form-group{
        padding-right: 10px;
    }
    #button_box{
        position: absolute;
        display: block;
        bottom: 0;
        right: 0;
        width: 100%;
    }
</style>