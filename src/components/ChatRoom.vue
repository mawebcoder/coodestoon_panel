<template>
  <div>
    <div class="chat_box_room" dir="ltr">
      <basic-vue-chat @newOwnMessage="onNewOwnMessage" :initial-feed="feed" title="ali is typing..."></basic-vue-chat>
    </div>
  </div>
</template>

<script>
import BasicVueChat from 'basic-vue-chat'

export default {
  name: "ChatRoom",
  props: ['new_message'],
  data() {
    return {
      feed: [
        {
          id: 1,
          author: 'jafar',
          contents: 'hi there',
          date: '16:30'
        },
        {
          id: 2,
          author: 'ali',
          contents: 'i am here lorem dsljflsdfldsjfdsfsa;dfasd;fds;f;safiglsjd;lfsdofg;rfjoasdfsdf',
          date: '16:30'
        },
        {
          id: 0,
          author: 'Me',
          contents: 'hello',
          date: '16:30'
        }
      ]
    }
  },
  methods: {
    onNewOwnMessage(message) {
      this.new_message = message
    }
  },
  components: {
    BasicVueChat
  }
}
</script>

<style scoped lang="scss">

</style>