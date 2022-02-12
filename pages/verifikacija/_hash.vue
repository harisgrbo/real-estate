<template>
  <div v-if="success">
    Uspjesno ste verifikovali email
  </div>
</template>

<script>
import { Component, Vue} from "nuxt-property-decorator";
import Navbar from "@/components/includes/Navbar";
import Footer from "@/components/Footer"

@Component({
  middleware: ['auth'],
  components: {Navbar, Footer},
  layout: (ctx) => ctx.$device.isMobile ? 'mobile' : 'settings',
})

export default class Verifikacija extends Vue {
  success = false;

  async mounted() {
    await this.verify();
  }

  async verify() {
    this.success = false;

    try {
      const hash = this.$route.params.hash;
      const expires = this.$route.query.expires || '';
      const signature = this.$route.query.signature || '';
      const id = this.$auth.user.id;

      await this.$axios.get(`/email/verify/${id}/${hash}?signature=${signature}&expires=${expires}`);

      this.success = true;
    } catch (e) {
      alert("Nismo u mogućnosti da vam verifikujemo email");
    }
  }
}
</script>
