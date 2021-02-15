<template>
  <div class="mobile-bottom-navbar">
      <font-awesome-icon icon="th-large"></font-awesome-icon>
      <font-awesome-icon icon="envelope"></font-awesome-icon>
      <font-awesome-icon icon="plus"></font-awesome-icon>
      <font-awesome-icon icon="user"></font-awesome-icon>
      <font-awesome-icon icon="bars"></font-awesome-icon>
  </div>
</template>
b
<script>
export default {
name: "MobileBottomNavbar"
}
</script>

<style scoped lang="scss">
  .mobile-bottom-navbar {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: white;
    z-index: 5;
    padding: 0 24px;
    box-shadow: rgb(0 0 0 / 8%) 12px -1px 12px;

    svg {
      font-size: 20px;
      color: #dcdcdc;

      &.fa-plus {
        color: #D63946;
      }
    }
  }
</style>
