<template>
    <div class="settings-wrapper">
        <Navbar></Navbar>
        <div :class="['preview-wrapper', $route.path === '/moj-racun/poruke' ? 'messages' : '']">
            <Nuxt/>
        </div>
    </div>
</template>

<script>
import {Component, Vue} from "nuxt-property-decorator";
import Navbar from "@/components/includes/Navbar";
import Footer from "@/components/Footer"

@Component({
    components: {Navbar, Footer}
})

export default class Settings extends Vue {
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

.settings-wrapper {
    min-height: 100%;
    width: 100%;
    padding-bottom: 36px;
    background: #f1f4f5;
    padding-top: 40px !important;
    margin-top: 60px;


    .preview-wrapper {
        width: 1280px;
        margin: 0 auto;
        padding-bottom: 36px;

        &.messages {
            background: transparent;
            padding-bottom: 0;
            width: 1280px;
            margin: 0 auto;
        }

        @include for-phone-only {
            width: 100%;
            padding-bottom: 36px;
        }
    }

    @include for-phone-only {
        min-height: 100%;
        background: #fff;
    }

    &.no-padding {
        padding-top: 0;
    }

}
</style>

