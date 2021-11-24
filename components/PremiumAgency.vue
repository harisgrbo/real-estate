<template>
  <div class="most-visited-card">
    <img src="/newlogo.png" alt="">

    <div class="info-wrap">
      <p>Nekretnine d.o.o</p>
      <span>
        <b>164</b>
        <small>oglasa</small>
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

export default class PremiumAgency extends Vue {
  @Prop({}) img
  @Prop({}) city
  @Prop({ type: String, default: '123.000' }) aproxPrice
}
</script>

<style scoped lang="scss">
@mixin for-phone-only {
  @media (max-width: 599px) {
    @content;
  }
}
.most-visited-card {
  display: flex;
  box-sizing: border-box;
  height: 100%;
  border: 1px solid #dcdcdc;
  border-radius: 10px;
  padding: 12px;

  @include for-phone-only {
    flex-direction: column;
  }

  img {
    height: 120px;
    width: 160px;
    border-radius: 10px;
    margin-right: 24px;
    object-fit: contain;
    padding: 12px;
    box-sizing: border-box;

    @include for-phone-only {
      width: 100%;
    }
  }

  .info-wrap {
    display: flex;
    flex-direction: column;
    justify-content: center;


    p {
      font-size: 18px;
      font-weight: 500;
      margin-bottom: 12px;
    }

    span {
      display: flex;
      flex-direction: row;
      align-items: center;

      small {
        font-size: 16px;
        font-weight: 500;
      }

      b {
        font-family: 'Outfit', sans-serif;
        font-size: 16px;
        font-weight: 600;
        margin-right: 12px;
      }
    }
  }
}
</style>
