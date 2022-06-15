<template>
    <div class="packages-wrap">
        <AgencyPackages></AgencyPackages>
    </div>
</template>

<script>
import {Component, Vue} from "nuxt-property-decorator";
import AgencyPackages from "../components/AgencyPackages";

@Component({
    components: {
        AgencyPackages,
    },
    layout: (ctx) => ctx.$device.isMobile ? 'mobile' : 'home',
})

export default class Paketi extends Vue {
}
</script>

<style scoped lang="scss">
@mixin for-phone-only {
    @media (max-width: 599px) {
        @content;
    }
}

.packages-wrap {
    display: flex;
    width: 1280px;
    margin: 0 auto;
    margin-top: 120px;

    @include for-phone-only {
        padding: 24px;
        width: 100%;
        margin-top: 0;
    }

}
</style>
