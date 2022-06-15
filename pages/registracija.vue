<template>
    <div>
        <RegisterForm></RegisterForm>
    </div>
</template>

<script>

import {Component, Vue} from "nuxt-property-decorator";
import RegisterForm from "@/components/auth/RegisterForm";

@Component({
    components: {RegisterForm},
    layout() {
        return "auth"
    }
})

export default class Register extends Vue {
}
</script>

<style scoped lang="scss">

</style>
