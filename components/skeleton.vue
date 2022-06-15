<template>
    <div id="skeleton" :style="{ 'height': height, 'width': width, 'minWidth': width}">
        .
    </div>
</template>

<script>
export default {
    name: "skeleton",
    props: ['height', 'width']
}
</script>

<style scoped>
#skeleton {
    background: linear-gradient(
        90deg,
        #f1f1f1,
        #f1f1f1,
        #f1f1f1,
        #fff,
        #f1f1f1,
        #f1f1f1
    );
    border-radius: 7px;
    background-size: 200% 200%;
    animation: backgroundChange 3s ease infinite;
    color: transparent;
}

@keyframes backgroundChange {
    0% {
        background-position: 0% 50%;
    }
    50% {
        background-position: 100% 50%;
    }
    100% {
        background-position: 0% 50%;
    }
}
</style>
