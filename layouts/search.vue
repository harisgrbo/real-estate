<template>
  <div class="search-wrapper">
    <Navbar></Navbar>
    <Nuxt/>
  </div>
</template>

<script>
import {Component, Vue} from "nuxt-property-decorator";
import Navbar from "@/components/includes/Navbar";

@Component({
  components: { Navbar }
})

export default class Home extends Vue {
}
</script>

<style lang="scss" scoped>
@mixin for-laptop {
  @media (min-width: 768px) and (max-width: 1023px) {
    @content;
  }
}

@mixin for-desktop-up {
  @media (min-width: 1200px) {
    @content;
  }
}

@mixin for-big-desktop-up {
  @media (min-width: 1800px) {
    @content;
  }
}

@mixin for-phone-only {
  @media (max-width: 599px) {
    @content;
  }
}

.search-wrapper {
  position: relative;
}


.search-wrapper ::v-deep .navbar-wrapper {
  position: static !important;
  top: 0;
}

</style>

