<template>
  <div class="listing-card-wrapper">
<!--    <label class="type">{{ listing.user.user_type }}</label>-->
    <nuxt-link :to="{ path: '/artikal/' + listing.id }">
      <img src="/stan.jpg" alt="">
      <div class="listing-card-content">
        <div class="column">
          <div class="title-price">
            <p class="title">{{ listing.title }}</p>
            <font-awesome-icon icon="heart"></font-awesome-icon>
          </div>
          <p class="address">{{ listing.address }}</p>
        </div>
        <div class="description">
          {{ listing.description }}
        </div>
        <div class="price">
          <p class="price">{{ listing.price }} KM</p>
          <p v-if="listing.listing_type === 'rent'">/ mj</p>
        </div>
      </div>
    </nuxt-link>
    <Snackbar />
  </div>
</template>

<script>
import { Component, Vue, Prop} from "nuxt-property-decorator";
import Snackbar from "@/components/global/Snackbar";

@Component({
  components: {Snackbar}
})

export default class HorizontalCard extends Vue{
  @Prop({ type: Object }) listing

  // Translate listing type
  types = {
    rent: 'Iznajmljivanje',
    sell: 'Prodaja',
    buy: 'Potraznja'
  }
  saved = false;

  get listingType() {
    return this.types[this.listing.listing_type];
  }

  saveListing() {
    this.$axios
      .post('/listings/save/' + this.listing.id)
      .then(() => {
        this.saved = true;
        this.$snackbar.show({
          text: "Uspjesno ste se spasili artikal!",
          timeout: 3000,
          type: "success"
        });
      })
      .catch(error => {
        console.log(error)
        this.$snackbar.show({
          text: "Test",
          timeout: 3000,
          type: "danger"
        });
      })
  }
}
</script>

<style scoped lang="scss">
a {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: row;
  padding: 24px 0;
  transition: 0.3s all ease;
  border-bottom: 1px solid #f1f1f1;
  height: 200px;
}
.listing-card-wrapper {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  position: relative;

  label {
    position: absolute;
    left: 8px;
    top: 32px;
    border-radius: 5px;
    background: #757B9A;
    color: #fff;
    font-weight: 400;
    display: flex;
    align-items: center;
    justify-content: center;
    width: fit-content;
    height: 24px;
    padding: 0 8px;
    font-size: 13px;
    text-transform: capitalize;
    z-index: 2;
  }

  img {
    height: 200px;
    width: 300px;
    min-width: 300px;
    border-radius: 10px;
  }
  .column {
    display: flex;
    width: 100%;
    flex-direction: column;
  }

  .listing-card-content {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
    padding: 0 16px;

    .description {
      font-size: 14px;
      line-height: 21px;
      padding: 8px 0;
    }

    .price {
      display: flex;
      width: 100%;
      justify-content: flex-end;

      p {
        font-weight: 600;
      }
    }

    .title-price {
      display: flex;
      align-items: center;
      justify-content: space-between;
      color: #434343;
      font-weight: 400;
      font-size: 15px;
      margin-bottom: 10px;

      svg {
        font-size: 22px;
        color: #dcdcdc;
      }

      > div {
        display: flex;
        flex-direction: row;
        align-items: center;
      }

      .title {
        font-size: 20px;
        font-weight: 400;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        margin-bottom: 8px;
      }

      .price {
        font-weight: 600;
      }
    }

    .address {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: 250px;
      font-size: 13px;
      color: #434343;
      font-weight: 400;
      position: relative;
      padding-bottom: 12px;

      &::after {
        position: absolute;
        content: "";
        bottom: 0;
        width: 100px;
        border-bottom: 1px solid #ddd;
        left: 0;
      }
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
          color: #757B9A;
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
