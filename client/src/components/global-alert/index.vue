<template lang="html">
  <v-snackbar
    :timeout="timeout"
    :color="alertColor"
    top
    right
    v-model="alert"
  >
    {{ alertMSG }}
  </v-snackbar>
</template>

<script type="text/javascript">
export default {
  name: 'global-alert',
  props: ['alertColor', 'alert', 'alertMSG'],
  data: () => ({
    timeout: 6000
  })
}
</script>
