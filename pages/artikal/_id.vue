<template>
  <div class="listing-wrapper">
    <div class="profile-content">
      <UserProfile :user="user"></UserProfile>
    </div>
    <div class="listing-content">
      <client-only>
        <swiper class="swiper" :options="swiperOption">
          <swiper-slide><img src="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/2021-audi-s4-mmp-1-1591394223.jpg?crop=0.715xw:0.536xh;0.0673xw,0.353xh&resize=1200:*" alt=""></swiper-slide>
          <swiper-slide><img src="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/2021-audi-s4-mmp-1-1591394223.jpg?crop=0.715xw:0.536xh;0.0673xw,0.353xh&resize=1200:*" alt=""></swiper-slide>
          <swiper-slide><img src="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/2021-audi-s4-mmp-1-1591394223.jpg?crop=0.715xw:0.536xh;0.0673xw,0.353xh&resize=1200:*" alt=""></swiper-slide>
          <swiper-slide><img src="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/2021-audi-s4-mmp-1-1591394223.jpg?crop=0.715xw:0.536xh;0.0673xw,0.353xh&resize=1200:*" alt=""></swiper-slide>
          <swiper-slide><img src="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/2021-audi-s4-mmp-1-1591394223.jpg?crop=0.715xw:0.536xh;0.0673xw,0.353xh&resize=1200:*" alt=""></swiper-slide>
          <swiper-slide><img src="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/2021-audi-s4-mmp-1-1591394223.jpg?crop=0.715xw:0.536xh;0.0673xw,0.353xh&resize=1200:*" alt=""></swiper-slide>
          <swiper-slide><img src="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/2021-audi-s4-mmp-1-1591394223.jpg?crop=0.715xw:0.536xh;0.0673xw,0.353xh&resize=1200:*" alt=""></swiper-slide>
          <swiper-slide><img src="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/2021-audi-s4-mmp-1-1591394223.jpg?crop=0.715xw:0.536xh;0.0673xw,0.353xh&resize=1200:*" alt=""></swiper-slide>
          <div class="swiper-pagination" slot="pagination"></div>
          <div class="swiper-button-prev" slot="button-prev"></div>
          <div class="swiper-button-next" slot="button-next"></div>
        </swiper>
      </client-only>
      <div class="listing-content-inner">
        <div class="article-title">
          <h2>{{ listing.title }}</h2>
          <div class="buttons">
            <i class="material-icons">bookmark</i>
            <i class="material-icons">report</i>
          </div>
        </div>
        <div class="detailed-informations">
          <div class="detailed-info" v-if="listing.city">
            <span>Lokacija</span>
            <span>{{ listing.city.name }}</span>
          </div>
          <div class="detailed-info">
            <span>Vrsta oglasa</span>
            <span>{{ listingType }}</span>
          </div>
          <div class="detailed-info" v-if="listing.brandModel">
            <span>Brend</span>
            <span>{{ listing.brandModel }}</span>
          </div>
          <div class="detailed-info">
            <span>Datum objave</span>
            <span>{{ $moment(listing.createdAt).format('LL') }}</span>
          </div>
          <div class="detailed-info price">
            <span>Cijena</span>
            <span>{{ listing.price }} KM</span>
          </div>
        </div>
        <div class="separator"></div>
        <h2 class="heading">Detaljne informacije</h2>
        <div class="detailed-informations">
          <div class="detailed-info" v-for="info in listing.attributes" v-if="info">
            <span>{{ info.name }}</span>
            <span>{{ info.value }}</span>
          </div>
        </div>
        <div class="separator"></div>
        <h2 class="heading">Kratki opis</h2>
        <p>{{ listing.shortText }}</p>
        <div class="separator"></div>
        <h2 class="heading">Detaljni opis</h2>
        <p>{{ listing.longText }}</p>
        <div class="separator"></div>
        <h2 class="heading">Pitanja</h2>
      </div>
    </div>
  </div>
</template>

<script>
import { Component, Vue} from "nuxt-property-decorator";
import UserProfile from "@/components/UserProfile";

@Component({
  components: {

  },
  layout() { return "home" }
})

export default class Artikal extends Vue {
  user = {}
  types = {
    rent: 'Iznajmljivanje',
    sell: 'Prodaja',
    buy: 'Potraznja'
  }
  swiperOption = {
    loop: true,
    pagination: {
      el: '.swiper-pagination',
      type: 'progressbar'
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    }
  }
  listing = {}

  async created() {
    await this.fetchListing();
  }
  async fetchListing() {
    try {
      let response = await this.$axios.$get('/listings/' + this.$route.params.id);
      this.listing = response.data;
      this.user = response.data.user;
      console.log(response.data, 'artikal')
      console.log(response.data.user, 'user')
    } catch(e) {
      console.log(e)
    }
  }
  get listingType() {
    return this.types[this.listing.listing_type];
  }
}
</script>

<style scoped lang="scss">
.listing-wrapper {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 0 auto;
  height: calc(100vh - 100px);
  padding: 16px 80px;
  .profile-content {
    width: 20%;
    height: fit-content;
  }
  .listing-content {
    width: 78%;
    .listing-content-inner {
      display: flex;
      flex-direction: column;
      width: 100%;
      padding-bottom: 32px;
      .article-title {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        margin: 16px 0;
        > div {
          display: flex;
          align-items: center;
          justify-content: center;
        }
      }
      h2 {
        font-family: 'Lato', sans-serif;
        font-size: 26px;
      }
      h4 {
        font-size: 14px;
        color: #066450;
      }
      h2.heading {
        font-size: 20px;
        font-weight: 600;
        margin-bottom: 16px;
      }
      .detailed-informations {
        width: 100%;
        height: fit-content;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        .detailed-info {
          padding: 0 8px;
          border-radius: 5px;
          display: flex;
          flex-direction: column;
          background: rgba(220, 220, 220, 0.53);
          margin-right: 8px;
          margin-bottom: 8px;
          box-shadow: 0 2px 3px 0 rgba(0, 0, 0, 0.1);
          span {
            font-size: 14px;
            margin: 5px 0;
            &:last-child {
              font-weight: 600;
              font-size: 16px;
            }
          }
          &.exchange {
            font-weight: 600;
            font-size: 16px;
            display: flex;
            justify-content: center;
            span {
              margin: 0;
              display: flex;
              align-items: center;
            }
          }
          &.price {
            background: #757B9A !important;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            span {
              color: #fff;
              font-size: 20px;
              &:last-child {
                margin-left: 16px;
              }
            }
          }
          &.exchange-for {
            background: #757B9A !important;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            span {
              color: #fff;
              font-size: 16px;
              display: flex;
              align-items: center;
              i {
                margin-left: 8px;
              }
            }
          }
        }
      }
      .buttons {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        width: fit-content;
        i {
          margin-left: 16px;
          padding: 5px;
          border-radius: 5px;
          background: #F1F1F2;
          color: #16d0a8;
          cursor: pointer;
          transition: 0.3s all ease;
          &:hover {
            color: #5b98ff;
          }
        }
      }
      .save-article {
        font-weight: 500;
        margin-left: 16px;
        width: fit-content;
        display: flex;
        align-items: center;
        cursor: pointer;
        i {
          color: #757B9A;
          margin-left: 8px;
        }
      }
    }
  }
}

.separator {
  border-top: 1px solid #ECECEC;
  margin: 16px 0;
  height: 1px;
  width: 100%;
}

::v-deep .user-profile {
  margin-right: 0;
}
</style>

