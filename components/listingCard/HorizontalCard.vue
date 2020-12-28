<template>
  <div class="listing-card-wrapper">
    <label class="type">{{ listingType }}</label>
    <nuxt-link :to="{ path: '/artikal/' + listing.id }">
      <img src="/stan.jpg" alt="">
      <div class="listing-card-content">
        <div class="column">
          <div class="title-price">
            <p class="title">{{ listing.title }}</p>
            <div>
              <p class="price">{{ listing.price }} KM</p>
              <p v-if="listing.listing_type === 'rent'">/ mj</p>
            </div>
          </div>
          <p class="address">{{ listing.address }}</p>
        </div>
        <div class="icons-date">
          <div>
            <i class="material-icons">hotel</i>
            2
          </div>
          <p>{{ $moment(listing.created_at).startOf('hour').fromNow() }}</p>
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
  margin-bottom: 24px;
  box-shadow: rgba(0, 0, 0, 0.08) 0px 1px 12px;
  transition: 0.3s all ease;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  &:hover {
    box-shadow: rgba(0, 0, 0, 0.18) 0px 1px 12px;
  }
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
    top: 8px;
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
    height: 160px;
    width: 240px;
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
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
    padding: 12px;

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
      max-width: 250px;
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
