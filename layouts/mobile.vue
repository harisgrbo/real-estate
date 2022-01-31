<template>
  <div ref="home" :class="['home-wrapper', $route.name === 'objava' || $route.name === 'artikal-id' || $route.name === 'pretraga' || $route.name === 'index' ? 'objava' : '']">
    <div
      class="header"
      :class="{ 'navbar--hidden': !showNavbar }"
      v-if="$route.name !== 'artikal-id' && $route.name !== 'objava.vue'"
    >
      <Navbar></Navbar>
    </div>
      <Nuxt />
    <div
      class="navbar"
      :class="{ 'bottom--hidden': !showBottom }"
      v-show="$route.name !== 'objava' && $route.name !== 'artikal-id' && $route.name !== 'pretraga'"
    >
      <MobileBottomNavbar @open-sidenav="handleOpenSidebar"></MobileBottomNavbar>
    </div>
    <client-only>
      <modal @before-open="beforeOpen" @before-close="beforeClose" name="sidebar" :adaptive="true" height="100%">
        <div class="modal-inner">
<!--          <i class="material-icons" @click.prevent="$modal.hide('sidebar')">close</i>-->
          <div class="modal-content">
            <sidenav @close-sidenav="$modal.hide('sidebar')"></sidenav>
          </div>
        </div>
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

  beforeOpen() {
    document.body.style.overflow = 'hidden';
  }

  beforeClose() {
    document.body.style.overflow = 'auto';
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
  padding-top: 82px !important;
  background: #f9f9f9;

  @include for-phone-only {
    background: #fff;
    padding-bottom: 100px;
  }
  &.artikal-page {
    padding-top: 0 !important;
    background: #fff;
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

.objava {
  padding-top: 0 !important;
  background: #fff;

  @include for-phone-only {
    background: #fff;
  }
}

::v-deep .vm--modal {
  @include for-phone-only {
    top: 40px !important;
    border-top-left-radius: 7px !important;
    border-top-right-radius: 7px !important;
    height: calc(100vh - 20px) !important;
    padding-bottom: 50px !important;
  }
}

</style>

