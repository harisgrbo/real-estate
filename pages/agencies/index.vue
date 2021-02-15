<template>
  <div class="account-wrapper-a">
    <Navbar></Navbar>
    <div class="account-wrapper-inner">
      <div class="sidenav">
        <h1>Izdvojene agencije</h1>
        <div class="swiper-container-main">
          <swiper class="swiper" :options="swiperOption">
            <swiper-slide v-for="item in 10">
              <div>
                <AgencyCard></AgencyCard>
              </div>
            </swiper-slide>
            <div class="swiper-pagination" slot="pagination"></div>
          </swiper>
        </div>
        <h1 class="heading-account">56 agencija za nekretnine</h1>


         <div class="grid-layout">
         <AgencyCard v-for="card in 16" />
       </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Component, Vue} from "nuxt-property-decorator";
import Navbar from "@/components/includes/Navbar";
import AgencyCard from "@/components/AgencyCard"

@Component({
  components: { Navbar, AgencyCard }
})

export default class Agencies extends Vue {
  swiperOption = {
    pagination: {
      el: '.swiper-pagination',
      clickable: true
    },
    setWrapperSize: true,
    spaceBetween: 14,
    slidesPerColumnFill: 'row',
    // centeredSlides: true,
    // slidesOffsetBefore: '100px',
    // slidesOffsetAfter: '100px',
    // slidesOffsetBefore: '0px',
    loop: true,
    autoplay: {
      delay: 2500,
    },
    slidesPerGroup: 4,
    slidesPerView: 4,
    touchRatio: 0.2,
    slideToClickedSlide: true,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    }
  }
}
</script>

<style lang="scss" scoped>
.account-wrapper-a {
  padding-top: 126px !important;
  height: calc(100vh - 126px);

  .account-wrapper-inner {
    display: flex;
    justify-content: space-between;
    height: 100%;
    width: 1280px;
    margin: 0 auto;
    box-sizing: border-box;

    .sidenav {
      display: flex;
      flex: 2;
      background: #fff;
      padding: 24px;
      box-sizing: border-box;
      border-radius: 10px;
      flex-direction: column;

      h1 {
        font-size: 22px !important;
        font-weight: 500;
        margin-bottom: 24px;

      }

      .info {
        display: flex;
        align-items: center;
        height: 60px;
        justify-content: flex-start;
        margin-bottom: 32px;
        p {
          margin-right: 12px;

          &:first-child {
            font-weight: 600;
          }
        }

        a {
          &:hover {
            text-decoration: underline;
          }
        }
      }


      h2 {
        //font-family: 'Roboto', sans-serif;
        font-weight: 500;
        font-size: 20px;
        margin-bottom: 36px;
      }

      ul {
        padding: 0;
        width: 100%;
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        grid-gap: 12px;
        row-gap: 12px;

        li {
          display: flex;
          height: fit-content;
          padding: 24px;
          line-height: 40px;
          font-weight: 400;
          box-shadow: rgba(0, 0, 0, 0.16) 0px 2px 8px !important;
          border-radius: 8px;
          box-sizing: border-box;
          cursor: pointer;

          a {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            justify-content: flex-start;
          }

          img {
            height: 50px;
          }

          h4 {
            font-size: 18px;
            color:rgb(72, 72, 72) !important;
            margin-top: 12px;
            font-weight: 600;
          }

          p {
            font-size: 17px;
            font-weight: 300;
            line-height: 1.375em !important;
            height: 50px;
            color:rgb(72, 72, 72) !important;
          }
        }
      }
    }

    .main-wrapper {
      display: flex;
      flex: 8;
      padding: 24px;
      background: #fff;
      margin-left: 24px;
      box-sizing: border-box;
      border-radius: 10px;
      position: relative;
      height: calc(100vh - 117px);
      overflow: scroll;
    }
  }
}

.heading {
  word-wrap: break-word !important;
  font-size: 32px !important;
  font-weight: 600 !important;
  line-height: 1.125em !important;
  color: #484848 !important;
  margin-bottom: 36px !important;
}

a {
  transition: 0.3s all ease;
  color: #9BAABD;
}

.icon {
  margin-right: 12px;
  font-size: 18px;
  color: #9BAABD;
}

.swiper-container {
  //padding: 0 0 24px 0;
  padding: 8px 8px;
  width: 1324px;
  margin: 0 auto;
  box-sizing: border-box;
  padding-bottom: 36px;

}


.grid-layout {
  padding: 0 !important
}

.swiper-wrapper {
  box-sizing: border-box;
}

.swiper-pagination-bullet.swiper-pagination-bullet-active {
  background: #d63946 !important;
}

</style>

