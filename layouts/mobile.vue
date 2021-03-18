<template>
  <div ref="home" class="home-wrapper">
    <div
        ref="header"
      :class="['header', hide ? 'hideTop' : '', shader ? 'shader' : '', sticky ? '' : 'not-sticky']"
      class="md:p-md md:pt-0 lg:p-md xl:p-md up:p-md"
    >
      <Navbar v-if="$route.name !== 'artikal-id'"></Navbar>
    </div>
      <Nuxt />
    <div
      :class="[hide ? 'hideBot' : '', 'botnav', shader ? 'shader' : '']"
      class="md:hidden g:hidden xl:hidden up:hidden"
    >
      <MobileBottomNavbar></MobileBottomNavbar>
    </div>
  </div>
</template>

<script>
import { Component, Vue} from "nuxt-property-decorator";
import Navbar from "@/components/includes/Navbar";
import MobileBottomNavbar from "@/components/includes/MobileBottomNavbar"

@Component({
  components: {Navbar, MobileBottomNavbar}
})

export default class Mobile extends Vue {
  hide = false;
  lastScrollPosition = 0;
  shader = false;
  toggleHideBottomNavbar = false;
  headerHeight = 0;
  windowWidth = null;
  notSticky = false;
  scrollToTop = false;
  sticky = false;

  mounted() {
    document.addEventListener('scroll', this.onScroll, true)
  }

  onScroll(e) {
    console.log('sadasdasd')
    this.headerHeight = this.$refs.header.offsetHeight || this.headerHeight;
    let h = this.$refs.home.offsetHeight;
    const currentScrollPosition =
      window.pageYOffset || document.documentElement.scrollTop;

    if (currentScrollPosition <= 0) {
      this.shader = false;
      return;
    } else {
      this.shader = true;
    }
    if (
      Math.abs(currentScrollPosition - this.lastScrollPosition) <
      this.headerHeight
    ) {
      return;
    }
    this.hide = currentScrollPosition > this.lastScrollPosition;
    this.lastScrollPosition = currentScrollPosition;
    if (h - currentScrollPosition <= 500) {
      this.hide = true;
    }
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
  height: 100%;
  overflow: scroll;
  &.artikal-page {
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
  z-index: 1;
  position: sticky;
  background-color: #fff;
  top: 0;
  right: 0;
  left: 0;
  transition: 0.2s all ease-in-out;
}

.hideTop {
  top: -66px;
  z-index: 0;
  @include for-desktop-up {
    top: 0;
  }
  @include for-laptop {
    top: 0;
  }
}

.shader {
  -webkit-box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.5);
  -moz-box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.5);
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.5);
  z-index: 4;
  @include for-desktop-up {
    background-color: #fff;
  }
  @include for-laptop {
    background-color: #fff;
  }
}
.not-sticky {
  position: static;
}

.botnav {
  position: fixed;
  bottom: 0;
  height: 70px;
  bottom: 0;
  transition: 0.2s all ease-in-out;
  width: 100%;
}

.botnav.hideBot {
  bottom: -70px;
}
</style>

