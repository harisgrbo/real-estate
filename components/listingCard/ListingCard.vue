<template>
    <div class="listing-card-wrapper">
      <label class="publisher">
        <font-awesome-icon icon="bullhorn"></font-awesome-icon>
        <span>Agencija</span>
      </label>
      <label class="type" v-if="listingType">
        <button>
          {{ listingType }}
        </button>
        <button>
          <font-awesome-icon icon="vector-square"></font-awesome-icon>
          <span>22 m2</span>
        </button>
        <button>
          <font-awesome-icon icon="door-closed"></font-awesome-icon>
          <span>4</span>
        </button>
      </label>
      <label class="rating" v-if="listing.is_rent">4.9
        <i class="material-icons">star</i>
      </label>


      <nuxt-link :to="{ path: '/artikal/' + listing.id }">
        <img src="/stan.jpg" alt="">
        <div class="listing-card-content">
          <div class="address title">
            <p>stan</p>
            <p>{{ listing.city.name }}</p>
            <p>Dolac Malta</p>
          </div>
          <div class="address">
            <p>{{ sliceAddress(listing.address) }}</p>
          </div>
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

  sliceAddress(address) {
    return address.slice(0, 20) + '...'
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

      &.type {
        background: none;
        top: 162px;
        left: 0px;

        button {
          border: none;
          margin-right: 8px;
          border-radius: 5px;
          background: #00000080;
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          width: fit-content;
          height: 24px;
          padding: 0 8px;
          font-size: 12px;
          font-weight: 500;
          text-transform: capitalize;

          span {
            text-transform: none;
          }

          svg {
            margin-right: 8px;
          }
        }
      }

      &.rating {
        right: 8px !important;
        left: inherit;

        i {
          font-size: 13px;
          margin-left: 5px;
        }
      }

      &.publisher {
        top: 8px;

        svg {
          margin-right: 8px;
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
          font-size: 16px !important;
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
        }

      }

      .address {
        max-width: 100%;
        display: flex;
        align-items: center;
        justify-content: flex-start;


        &.title {
         p {
           white-space: nowrap;
           overflow: hidden;
           text-overflow: ellipsis;
           font-weight: 600 !important;
           font-size: 16px !important;
           line-height: 20px !important;
           margin-bottom: 8px;
         }
        }

        p {
          position: relative;
          padding: 0 8px;
          color: #434343;
          font-weight: 500;
          font-size: 15px;
          padding-left: 11px;

          &:first-child {
            padding-left: 0;
            &::before {
              display: none;
            }
          }

          &::before {
            position: absolute;
            content: "";
            height: 4px;
            width: 4px;
            border-radius: 2px;
            background: #444;
            top: 8px;
            left: 0px;
          }
        }
      }

      .icons-date {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;

        .price {
          font-weight: 600;
          font-size: 17px;
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
