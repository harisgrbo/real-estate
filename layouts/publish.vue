<template>
    <div class="publish-wrapper">
        <Navbar></Navbar>
        <div class="nuxt-wrap">
            <Nuxt/>
        </div>
    </div>
</template>

<script>
import {Component, Vue} from "nuxt-property-decorator";
import Navbar from "@/components/includes/Navbar";

@Component({
    components: {Navbar}
})

export default class Publish extends Vue {
}
</script>

<style lang="scss">
.publish-wrapper {
    padding-top: 106px !important;
    height: 100vh;

    .nuxt-wrap {
        box-sizing: border-box;
        height: 100%;
    }
}
</style>

