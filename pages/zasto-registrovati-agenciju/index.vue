<template>
  <div class="static-wrapper">
    <div class="static-inner">
      <div class="block-1">
        <div class="left">
          <h2>Zašto registrovati agenciju?</h2>
          <p>Komercijalni profil sa promocijom, izvještajima, statistikom i još mnogo toga. Idealno za sva pravna lica koja se bave trgovinom nekretninama. Prvih 30 dana korištenja je potpuno besplatno!</p>
        </div>
        <div class="right">
          <img src="/grupisana.png" alt="">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Component, Vue, Prop} from "nuxt-property-decorator";

@Component({
  components: {},
  layout: (ctx) => ctx.$device.isMobile ? 'mobile' : 'home'
})
export default class ZastoRegistrovatiAgenciju extends Vue {
}
</script>

<style scoped lang="scss">
  .static-wrapper {
    background-image: url(/background.svg);
    height: 100%;
    width: 100%;
    min-height: 100%;
    background-position: left;
    background-repeat: no-repeat;
    background-position-y: center;
    background-size: cover;

    .static-inner {
      width: 1280px;
      margin: 0 auto;
      display: flex;
      flex-direction: column;

      .block-1 {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        height: fit-content;
        font-family: 'Montserrat', sans-serif;

        .left {
          display: flex;
          flex-direction: column;
          flex: 1;
          justify-content: center;

          h2 {
            font-size: 35px;
            color: #444;
          }

          p {
            font-size: 20px;
            line-height: 30px;
            padding-top: 36px;
          }
        }

        .right {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          flex: 1;

          img {
            width: 800px;
          }
        }
      }
    }
  }
</style>
