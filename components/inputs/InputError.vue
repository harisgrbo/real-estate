<template>
    <div class="error" v-if="error && error.error">
        <label>{{ error.message }}</label>
    </div>
</template>

<script>
import {Component, Prop, Vue} from 'nuxt-property-decorator'

@Component({})
export default class InputError extends Vue {
    @Prop({
        type: Object
    }) error;
}
</script>

<style scoped>
.error {
    color: red;
    position: absolute;
    top: -10px;
    left: 0;
    z-index: 3;
}
</style>
