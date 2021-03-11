<template>
  <div class="listing-card-wrapper">
    <label class="type">{{ listing.listing_type.title }}</label>
    <nuxt-link :to="{ path: '/artikal/' + listing.id }">
      <img src="/stan.jpg" alt="">
      <div class="listing-card-content">
        <div class="column">
          <div class="title-price">
            <div class="title-box">
              <p>{{ listing.title }}</p>
            </div>
          </div>

          <!-- Potrebno u responsu vratitit ime grada, category slug i korisnika -->
          <div class="address">
            <p>{{ listing.address }}</p>
          </div>
        </div>
        <div class="description" v-if="!$device.isMobile">
          {{ listing.description }}
        </div>
        <div class="price">
            <h1>{{ listing.user.name }}</h1>
          <div class="price-div">
            <p class="price-label">{{ parseInt(listing.price) }} KM</p>
            <b>{{ listing.is_rent? '/mj' : '' }}</b>
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

  sliceAddress(address) {
    return address.slice(0, 10) + '...'
  }
}
</script>

<style scoped lang="scss">
@mixin for-phone-only {
  @media (max-width: 599px) {
    @content;
  }
}
a {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: row;
  padding: 24px 0;
  transition: 0.3s all ease;
  border-bottom: 1px solid #f1f1f1;
  height: 200px;

  @include for-phone-only {
    height: fit-content;
    flex-direction: column;
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
    top: 32px;
    border-radius: 5px;
    background: #fff;
    color: #000;
    font-weight: 500;
    display: flex;
    align-items: center;
    justify-content: center;
    width: fit-content;
    height: 24px;
    padding: 0 8px;
    font-size: 12px;
    text-transform: none;
    z-index: 2;
    box-shadow: rgb(0 0 0 / 12%) 0px 6px 5px;
  }

  img {
    height: 200px;
    width: 300px;
    min-width: 300px;
    border-radius: 10px;

    @include for-phone-only {
      height: 194px;
      width: 100%;
      max-width: 100%;
      min-width: 100%;
      margin-bottom: 16px;
    }
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

    @include for-phone-only {
      padding: 0;
    }

    .description {
      font-size: 14px;
      line-height: 21px;
      padding: 29px 0;
      height: 100%;
    }

    .price {
      display: flex;
      width: 100%;
      justify-content: space-between;
      align-items: center;

      h1 {
        font-size: 16px;
        font-weight: 600;

      }

      .price-div {
        display: flex;
        align-items: center;
        p {
          font-weight: 500;
        }

        b {
          margin-left: 12px;

        }
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

      .title-box {
        max-width: 100%;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        position: relative;

        p {
          position: relative;
          padding: 0 8px;
          color: #434343;
          font-weight: 400;
          font-size: 20px;
          margin-bottom: 8px;

          @include for-phone-only {
            font-size: 16px;
            font-weight: 500;
          }

          &:first-child {
            padding-left: 0;
            &::after {
              display: none;
            }
          }

          &::after {
            position: absolute;
            content: "";
            height: 4px;
            width: 4px;
            border-radius: 2px;
            background: #444;
            top: 9px;
            left: -1px
          }
        }
      }

      svg {
        font-size: 22px;
        color: #dcdcdc;
      }

      > div {
        display: flex;
        flex-direction: row;
        align-items: center;
      }

      .price {
        font-weight: 600;
      }
    }

      .address {
        max-width: 100%;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        position: relative;

        &::after {
          position: absolute;
          content: "";
          bottom: -16px;
          width: 100px;
          border-bottom: 1px solid #ddd;
          left: 0;

          @include for-phone-only {
            display: none
          }
        }

        p {
          position: relative;
          padding: 0 8px;
          color: #434343;
          font-weight: 500;
          font-size: 15px;

          @include for-phone-only {
            font-weight: 400;
            margin-bottom: 12px;
          }

          &:first-child {
            padding-left: 0;
            &::after {
              display: none;
            }
          }

          &::after {
            position: absolute;
            content: "";
            height: 4px;
            width: 4px;
            border-radius: 2px;
            background: #444;
            top: 6px;
            left: -1px;

          }
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
