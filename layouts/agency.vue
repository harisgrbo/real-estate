<template>
    <div class="agency-wrapper">
        <Navbar></Navbar>
        <Nuxt/>
        <Footer></Footer>
    </div>
</template>

<script>
import {Component, Vue} from "nuxt-property-decorator";
import Navbar from "@/components/includes/Navbar";
import Footer from "@/components/Footer"

@Component({
    components: {Navbar, Footer}
})

export default class Agencija extends Vue {
}
</script>

<style lang="scss">
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

.agency-wrapper {
    padding-top: 120px !important;
}
</style>

