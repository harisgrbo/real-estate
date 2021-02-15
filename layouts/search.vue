<template>
  <div class="search-wrapp">
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

export default class Search extends Vue {
}
</script>

<style lang="scss" scoped>
.search-wrapp {

  ::v-deep .navbar-wrapper {
    padding: 0 24px 0 24px !important;
  }
}
</style>

