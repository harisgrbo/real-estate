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
  margin-top: 60px;
  min-height: calc(100vh - 60px);
}

::v-deep .px-20 {
  padding-left: 24px;
  padding-right: 24px;
}

</style>

