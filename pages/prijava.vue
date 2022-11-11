<template>
    <div class="flex flex-row">
        <LoginForm></LoginForm>
    </div>
</template>

<script>
import {Component, Vue} from "nuxt-property-decorator";
import LoginForm from "@/components/auth/LoginForm";

@Component({
    components: {LoginForm},
    layout() {
        return "auth"
    }
})
export default class Login extends Vue {

}
</script>

<style scoped lang="scss">

</style>
