<template>
  <div class="search-wrapper">
    <SearchNavbar></SearchNavbar>
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

<style lang="scss">
.search-wrapper {
  padding-top: 0;
}
</style>

