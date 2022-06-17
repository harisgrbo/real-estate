<template>
    <div class="search-wrapper">
        <Navbar :class="[$route.name === 'moj-racun-poruke' ? 'px-2' : '']"></Navbar>
        <Nuxt/>
        <Footer v-if="$route.name !== 'moj-racun-poruke'"></Footer>
    </div>
</template>

<script>
import {Component, Vue} from "nuxt-property-decorator";
import Navbar from "@/components/includes/Navbar";
import Footer from "@/components/Footer"

@Component({
    components: {Navbar, Footer}
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
    margin-top: 60px !important;
    min-height: calc(100vh - 80px);

    @include for-phone-only {
        min-height: 100%;
    }

    &.no-padding {
        padding-top: 0;
    }

    ::v-deep .navbar-wrapper {
        background: #fff;
        border-bottom: 0;
        box-shadow: none;

    }

    ::v-deep .navbar-wrapper .second-row {
        background: transparent;

    }
}
</style>

