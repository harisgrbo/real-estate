<template>
  <div ref="home" :class="['home-wrapper', $route.name === 'publish' || $route.name === 'artikal-id' ? 'publish' : '']">
    <div
      class="header"
      :class="{ 'navbar--hidden': !showNavbar }"
      v-if="$route.name !== 'artikal-id' && $route.name !== 'publish'"
    >
      <Navbar></Navbar>
    </div>
      <Nuxt />
    <div
      class="navbar"
      :class="{ 'bottom--hidden': !showBottom }"
      v-if="$route.name !== 'publish'"
    >
      <MobileBottomNavbar @open-sidenav="handleOpenSidebar"></MobileBottomNavbar>
    </div>
    <client-only>
      <modal name="sidebar" :adaptive="true" height="100%" @closed="closeModal">
        <sidenav ref="side"></sidenav>
      </modal>
    </client-only>
  </div>
</template>

<script>
import {Component, Vue, Watch} from "nuxt-property-decorator";
import Navbar from "@/components/includes/Navbar";
import MobileBottomNavbar from "@/components/includes/MobileBottomNavbar"
import sidenav from "@/components/sidenav"

@Component({
  components: {Navbar, MobileBottomNavbar, sidenav}
})

export default class Mobile extends Vue {
  showNavbar = true
  lastScrollPosition = 0
  showBottom = true;

  mounted() {
    window.addEventListener('scroll', this.handleScroll, true)
  }

  handleOpenSidebar() {
    this.$modal.show('sidebar')
  }

  @Watch('$route', { immediate: true, deep: true })
  onUrlChange() {
    this.$refs.side.closeSidebar();
  }

  handleScroll(e) {
    let currentScrollPosition = (document.documentElement && document.documentElement.scrollTop) ||
      document.body.scrollTop;
    if (currentScrollPosition < 0) {
      return
    }
    if (Math.abs(currentScrollPosition - this.lastScrollPosition) < 100) {
      return
    }
    this.showNavbar = currentScrollPosition < this.lastScrollPosition
    this.showBottom = currentScrollPosition < this.lastScrollPosition
    this.lastScrollPosition = currentScrollPosition
  }

  beforeDestroy () {
    window.removeEventListener('scroll', this.onScroll)
  }
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

.home-wrapper {
  padding-top: 62px !important;
  &.artikal-page {
    padding-top: 0 !important;
  }

  &.publish {
    padding-top: 0 !important;
  }
}

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
.header {
  height: 60px;
  width: 100vw;
  position: fixed;
  z-index: 10;
  transform: translate3d(0, 0, 0);
  top: 0px;
  transition: 0.1s all ease-out;

  &.navbar--hidden {
    box-shadow: none;
    transform: translate3d(0, -140%, 0);
  }
}

.navbar {
  height: 60px;
  width: 100vw;
  position: fixed;
  z-index: 10;
  transform: translate3d(0, 0, 0);
  bottom: 0px;
  transition: 0.1s all ease-out;

  &.bottom--hidden {
    box-shadow: none;
    transform: translate3d(0, 140%, 0);
  }
}


</style>

