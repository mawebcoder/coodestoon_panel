<template>
  <div>
    <template v-if="show_progress">
      <div id="progress-bar">
        <div :style="{width:`${width}%`}">
        <span>
          <template v-if="width">

            {{ width }}%

          </template>
        </span>
        </div>
      </div>
    </template>

  </div>
</template>

<script>
export default {
  name: "ProgressBar",
  props: ['width','show_progress'],
  data() {
    return {}
  }
}
</script>

<style scoped lang="scss">
#progress-bar {
  height: 30px;
  position: relative;
  overflow: hidden;
  /*background-color: orange;*/
  border-radius: 40px;
  width: 90%;
  margin-bottom: 10px;
  border: 1px solid #9f9f9f;

  input {
    line-height: 45px;
  }

  div {
    position: absolute;
    right: 0;
    top: 0;
    transition: .1s;
    height: 100%;
    background-color: orange;
    color: #000;
    text-align: center;
  }
}
</style>