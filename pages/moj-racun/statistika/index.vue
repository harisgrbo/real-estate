<template>
    <div class="account-wrapper">
        <ul class="breadcrumbs">
            <li>
                <nuxt-link to="/moj-racun">Moj račun</nuxt-link>
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24"
                     stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                </svg>
                <p>Statistika</p>
            </li>
        </ul>
        <h1 class="heading">
            Statistika
        </h1>
    </div>
</template>

<script>
import {Component, Vue} from "nuxt-property-decorator";

@Component({
    components: {},
    layout() {
        return "home"
    }
})

export default class promjenaSifre extends Vue {
}
</script>

<style scoped lang="scss">
h1 {
    color: rgb(72, 72, 72) !important;
}
</style>
