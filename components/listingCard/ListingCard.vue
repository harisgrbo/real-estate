<template>
  <div class="listing-card-wrapper">
    <label class="type">{{ listingType }}</label>
    <img src="/stan.jpg" alt="">
    <div class="listing-card-content">
      <div class="title-price">
        <p class="title">{{title}}</p>
        <div>
          <p class="price">{{ price }} KM</p>
          <p v-if="type === 'rent'">/mj</p>
        </div>
      </div>
      <p class="address">{{ address }}</p>
      <div class="icons-date">
        <div>
          <i class="material-icons">hotel</i>
          2
        </div>
        <p>{{ $moment(updated).startOf('hour').fromNow() }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { Component, Vue, Prop} from "nuxt-property-decorator";

@Component({})

export default class ListingCard extends Vue{
  @Prop({ type: String }) price
  @Prop({ type: String }) title
  @Prop({ type: String }) address
  @Prop({ type: String }) type
  @Prop({ type: String }) updated

  // Translate listing type
  types = {
    rent: 'Iznajmljivanje',
    sell: 'Prodaja',
    buy: 'Potraznja'
  }
  get listingType() {
    return this.types[this.type];
  }
}
</script>

<style scoped lang="scss">
  .listing-card-wrapper {
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
    position: relative;

    label {
      position: absolute;
      left: 12px;
      top: 12px;
      border-radius: 8px;
      background: #757B9A;
      color: #fff;
      font-weight: 500;
      display: flex;
      align-items: center;
      justify-content: center;
      width: fit-content;
      height: 30px;
      padding: 0 8px;
      font-size: 13px;
      text-transform: capitalize;
    }

    img {
      height: 180px;
      width: 100%;
      border-radius: 10px;
    }

    .listing-card-content {
      display: flex;
      flex-direction: column;
      padding-top: 12px;

      .title-price {
        display: flex;
        align-items: center;
        justify-content: space-between;
        color: #434343;
        font-weight: 400;
        font-size: 15px;
        margin-bottom: 10px;

        > div {
          display: flex;
          flex-direction: row;
          align-items: center;
        }

        .title {
          font-size: 17px;
          font-weight: 300;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          max-width: 50%;
        }

        .price {
          font-weight: 600;
        }
      }

      .address {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        max-width: 100%;
        font-size: 13px;
        color: #434343;
        font-weight: 400;
      }

      .icons-date {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        margin-top: 10px;
        padding-top: 10px;
        border-top: 1px solid #e9e9e9;
        > div {
          display: flex;
          align-items: center;
          flex-direction: row;
          justify-content: flex-start;
          font-size: 13px;
          font-weight: 500;
          i {
            color: #434343;
            margin-right: 8px;
          }
        }

        p {
          font-size: 13px;
          color: #434343;
          font-weight: 500;
        }
      }
    }
  }
</style>
