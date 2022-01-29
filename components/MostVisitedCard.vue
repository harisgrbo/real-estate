<template>
  <div class="most-visited-card">
    <img :src="img" alt="">

    <div class="info-wrap">
      <p>{{ city }}</p>
      <span>
        <small>prosj. cijena nekretnine</small>
        <b>200000 KM</b>
      </span>
    </div>
  </div>
</template>

<script>
import { Component, Vue, Prop} from "nuxt-property-decorator";

@Component({
  components: {
  },
})

export default class MostVisitedCard extends Vue {
  @Prop({}) img
  @Prop({}) city
  @Prop({ type: String, default: '123.000' }) aproxPrice
}
</script>

<style scoped lang="scss">
  .most-visited-card {
    display: flex;
    padding: 0;
    box-sizing: border-box;
    height: 60px;

    img {
      height: 60px;
      width: 60px;
      border-radius: 6px;
      margin-right: 12px;
    }

    .info-wrap {
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      p {
        font-size: 17px;
        font-weight: 500;
      }

      span {
        display: flex;
        flex-direction: column;

        b {
          margin-top: 8px;
          font-family: 'Outfit', sans-serif;
          font-size: 16px;
          font-weight: 600;
        }
      }
    }
  }
</style>
