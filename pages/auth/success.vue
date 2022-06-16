<template>
</template>

<script>

import {Component, Vue} from "nuxt-property-decorator";

@Component({})
export default class Success extends Vue {
  async created() {
    let token = this.$route.query.token;

    if (token) {
      await this.$auth.setUserToken(token);
    }

    await this.$router.push('/');
  }
}

</script>
