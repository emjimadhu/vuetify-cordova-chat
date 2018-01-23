<template>
  <v-app dark>
    <v-content>
      <router-view/>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  created () {
    const authUser = JSON.parse(localStorage.getItem('authUser'))
    if (authUser) {
      this.$store.commit('SET_AUTHUSER', authUser)
    }
  }
}
</script>

<style>
.v-center {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
