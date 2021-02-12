<template>
    <div class="listing-card-wrapper">
      <label class="type">{{ listingType }}</label>
      <label class="rating">4.9
        <i class="material-icons">star</i>
      </label>
      <nuxt-link :to="{ path: '/artikal/' + listing.id }">
        <img src="/stan.jpg" alt="">
        <div class="listing-card-content">
          <div class="title-price">
            <p class="title">{{ listing.category.title }}</p>
            <p class="title">{{ listing.city.name }}</p>
          </div>
          <p class="address">{{ listing.address }}</p>
          <div class="icons-date">
            <div>
              <p class="price">{{ listing.price }} KM</p>
              <p v-if="listingType === 'rent'">/ nocenje</p>
            </div>
            <div class="icons">
              <p>{{ listing.created_at }}</p>
            </div>
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

export default class ListingCard extends Vue{
  @Prop({ type: Object }) listing

  // Translate listing type
  types = {
    rent: 'Iznajmljivanje',
    sell: 'Prodaja',
    buy: 'Potraznja'
  }
  saved = false;

  get listingType() {
    return this.types[this.listing.listing_type.shortname];
  }

  created() {
    console.log(this.listing)
  }

}
</script>

<style scoped lang="scss">
  a {
    position: relative;
    z-index: 1;
  }
  .listing-card-wrapper {
    display: flex;
    flex-direction: column;
    height: 100%;
    position: relative;

    label {
      position: absolute;
      left: 8px;
      top: 8px;
      border-radius: 5px;
      background: #00000080;
      color: #fff;
      font-weight: 400;
      display: flex;
      align-items: center;
      justify-content: center;
      width: fit-content;
      height: 24px;
      padding: 0 8px;
      font-size: 12px;
      font-weight: 500;
      text-transform: capitalize;
      z-index: 2;

      &.rating {
        right: 8px !important;
        left: inherit;

        i {
          font-size: 13px;
          margin-left: 5px;
        }
      }
    }

    img {
      height: 194px;
      width: 100%;
      border-radius: 10px;
    }

    .listing-card-content {
      display: flex;
      flex-direction: column;
      padding-top: 8px;

      .title-price {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        color: #434343;
        margin-bottom: 10px;
        position: relative;

        > div {
          display: flex;
          flex-direction: row;
          align-items: center;
        }

        .title {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          font-weight: 500 !important;
          font-size: 18px !important;
          line-height: 20px !important;

          &::after {
            content: "";
            height: 2px;
            width: 2px;
            border-radius: 50%;
            position: absolute;
            top: 10px;
            margin: 0 8px;
            background: #444;
          }

          &:last-child {
            margin-left: 17px;

            &::after {
              display: none;
            }
          }
        }

      }

      .address {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        max-width: 100%;
        font-size: 16px;
        color: #434343;
        font-weight: 400;
      }

      .icons-date {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;

        .price {
          font-weight: 600;
          font-size: 16px;
          color: #444;
          line-height: 20px;
          margin-top: 10px;
        }

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
          font-size: 14px;
          color: #434343;
          font-weight: 500;
          margin-top: 10px;
        }
      }
    }
  }

  .icons {
    display: flex;
    align-items: center;
    svg {
      font-size: 16px;
      margin-right: 8px;
    }

    p {
      margin-right: 10px;
      margin-top: 0 !important;
      font-weight: 500;
    }
  }
</style>
