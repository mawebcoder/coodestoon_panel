<template>
  <div style="display: flex;justify-content: center;margin-top: 100px">
    <input placeholder="123456" type="text" v-mask="'#-#-#-#-#-#'" v-model="myInputModel" style="width: 80%;height: 100px">
  </div>
</template>

<script>
export default {
  name: "test",
  data(){
    return {
      myInputModel:''
    }
  }
}
</script>

<style scoped>
input{
  direction: ltr;
  text-align: center;
  font-size: 20px;
}
</style>