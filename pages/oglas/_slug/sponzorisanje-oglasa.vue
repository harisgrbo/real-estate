<template>
    <div class="advertising-options-wrapper">
        <Advertising></Advertising>
    </div>
</template>

<script>
import {Component, Vue} from "nuxt-property-decorator";
import Advertising from "../../../components/Advertising";

@Component({
    components: {
        Advertising,
    },
    middleware: ['auth'],
    layout: (ctx) => ctx.$device.isMobile ? 'mobile' : 'settings'
})
export default class Kredit extends Vue {
}
</script>
