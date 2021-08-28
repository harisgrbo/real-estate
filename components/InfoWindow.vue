<template>
  <div class="listing-card-wrapper">
    <label class="publisher">
      <font-awesome-icon icon="bullhorn"></font-awesome-icon>
      <span>Agencija</span>
    </label>
    <label class="type" v-if="listingType">
      <button>
        Novogradnja
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

    <a @click="$router.push('/artikal/' + listing.id)">
      <img src="/hotel.webp" alt="">
      <div class="listing-card-content">
        <div class="address title">
          <p>
            {{ listing.title }}
          </p>
        </div>
        <div class="address">
          <p>{{ listing.address}}</p>
        </div>
        <div class="icons-date">
          <div>
            <p class="price">{{ listing.price }} KM</p>
            <p v-if="listingType === 'rent'">/ nocenje</p>
          </div>
          <div>
<!--            <p class="time">{{ $moment(listing.published_at).fromNow() }}</p>-->
          </div>
        </div>
      </div>
    </a>
<!--    <Snackbar />-->
  </div>
</template>

<script>
import { Component, Vue, Prop} from "nuxt-property-decorator";
// import Snackbar from "@/components/global/Snackbar";

@Component({
  components: {}
})

export default class InfoWindow extends Vue{
  @Prop({ type: Object }) listing

  // Translate listing type
  types = {
    rent: 'Iznajmljivanje',
    sell: 'Prodaja',
    buy: 'Potraznja'
  }

  get listingType() {
    return this.types[this.listing.listing_type.shortname];
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
  max-width: 270px;

  label {
    position: absolute;
    left: 8px;
    top: 8px;
    border-radius: 5px;
    background: #fff;
    color: #444;
    display: flex;
    align-items: center;
    justify-content: center;
    width: fit-content;
    height: 24px;
    padding: 0 8px;
    font-size: 12px;
    font-weight: 500;
    text-transform: capitalize;
    box-shadow: rgb(0 0 0 / 12%) 0px 6px 5px;

    z-index: 2;

    &.type {
      background: none;
      top: 162px;
      left: 0px;
      box-shadow: none;
      border-radius: 0px;

      button {
        font-family: 'Montserrat', sans-serif;
        border: none;
        margin-right: 8px;
        border-radius: 5px;
        background: #fff;
        box-shadow: rgb(0 0 0 / 12%) 0px 6px 5px;
        color: #444;
        display: flex;
        align-items: center;
        justify-content: center;
        width: fit-content;
        height: 24px;
        padding: 0 8px;
        font-size: 12px;
        font-weight: 500;
        text-transform: capitalize;
        box-shadow: rgb(0 0 0 / 12%) 0px 6px 5px;

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
    padding: 8px 8px 0 8px;

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
          font-weight: 500 !important;
          font-size: 16px !important;
          line-height: 20px !important;
          margin-bottom: 8px;
        }
      }

      p {
        position: relative;
        padding: 0 8px;
        color: #434343;
        font-weight: 400;
        font-size: 14px;
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

      .icons {
        display:flex;
        align-items: center;
      }

      .price {
        font-weight: 600;
        font-size: 15px;
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

.blured-background {
  display: none;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 6;
  border-radius: 10px;
  box-shadow: 0px 8px 20px rgba(0,0,0,0.15);
  padding: 24px;
  box-sizing: border-box;
  align-items: center;
  justify-content: center;
  transition: 0.3s all ease;

  button {
    height: 53px;
    background: #D63946;
    border-radius: 4px;
    border: none;
    width: 100%;
    display: flex;
    align-items: center;
    font-size: 15px;
    font-weight: 500;
    padding: 0 24px;
    color: #fff;
    cursor: pointer;
    justify-content: center;
    transition: 0.3s all ease;
  }
}

@supports ((-webkit-backdrop-filter: blur(2em)) or (backdrop-filter: blur(2em))) {
  .blur:hover {
    .blured-background {
      display: flex;
      background-color: rgba(255, 255, 255, .5);
      -webkit-backdrop-filter: blur(0.2em);
      backdrop-filter: blur(2px);
    }
  }
}

.time {
  font-size: 12px !important;
  font-weight: 400;
}

.gm-style.gm-style-iw-c {
  padding-right: 0px;
  padding-bottom: 0px;
  max-width: 270px !important;
  max-height: 356px;
  min-width: 0px;
  padding: 0 !important;
}
</style>
