<template>
  <div>
    <input type="text" @keydown="isTyping">
    <div v-if="typing">is typing...</div>
  </div>
</template>
<script>
import {echo} from "@/main";
import axios from "axios";
export default {
  data() {
    return {
      typing: false,
      user_name: '',
    }
  },
  mounted() {
    window.addEventListener('online', () => {
      axios.post('/change-online-status',{online:1})
    })
    window.addEventListener('offline', () => {
      axios.post('/change-online-status',{online:0})
    })
  },
  methods: {

    isTyping() {
      let channel = echo.private('chat');
      setTimeout(() => {
        channel.whisper('typing', {
          user_name: 'mohammad amiri',
          typing: true
        });
      }, 300);
    }

  },
}
</script>