<template>
    <div v-if="override || loading" class="loading-page">
        <img src="/loader.svg" alt="" />
    </div>
</template>

<script>
export default {
    name: 'LoadingBar',
    props: ['override'],
    data: () => ({
        loading: false
    }),
    methods: {
        start() {
            this.loading = true
        },
        finish() {
            this.loading = false
        }
    }
}
</script>

<style scoped lang="scss">
.loading-page {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    background: rgba(255, 255, 255, 0.8);
    text-align: center;
    font-size: 30px;
    font-family: sans-serif;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
    height: 100vh;

    img {
        height: 40px;
    }
}
</style>
