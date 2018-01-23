<template lang="html">
  <v-footer fixed app style="height:48px;">
    <v-toolbar>
      <v-flex xs11>
        <v-text-field
          label="Enter your Message"
          single-line
          hide-details
          v-model="message"
          @keyup.enter="sendMessage"
        />
      </v-flex>
      <v-flex xs1>
        <v-btn color="primary" @click="sendMessage" icon>
          <v-icon style="font-size:18px;">send</v-icon>
        </v-btn>
      </v-flex>
    </v-toolbar>
  </v-footer>
</template>

<script type="text/javascript">
export default {
  name: 'chat-input',
  computed: {
    message: {
      get () {
        return this.$store.getters.message
      },
      set (v) {
        this.$store.commit('SET_MESSAGE', v)
      }
    }
  },
  methods: {
    sendMessage () {
      this.$emit('sendMessage')
    }
  }
}
</script>
