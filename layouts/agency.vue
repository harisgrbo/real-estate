<template>
  <div class="agency-wrapper">
    <Navbar></Navbar>
    <Nuxt />
  </div>
</template>

<script>
import { Component, Vue} from "nuxt-property-decorator";
import Navbar from "@/components/includes/Navbar";

@Component({
  components: {Navbar}
})

export default class Agency extends Vue {
}
</script>

<style lang="scss">
.agency-wrapper {
  padding-top: 120px !important;
}
</style>

