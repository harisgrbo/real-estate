<template>
  <div class="preview-wrapper-inner">
    <div class="credit-inner">
        <div class="flex mob-credit flex-row w-full justify-between mb-8">
          <div class="flex flex-row items-center">
            <img src="/credit-card.svg" alt="" class="mr-4">
            <p class="text-xl text-gray-800 font-medium">Dopuna kredita karticom</p>
          </div>
          <div class="actual flex flex-col p-4 bg-gray-50 rounded-md">
            <h3 class="text-lg text-gray-800 font-normal">Trenutno stanje kredita</h3>
            <div class="flex flex-row items-center mt-2">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
              </svg>
              <b>{{ $auth.user.credits }}</b>
            </div>
          </div>
        </div>
        <div class="content-inner">
          <div v-if="currentTab === 0" div="buy-options-wrap">
            <h2 class="section-title">Izaberite jednu od ponuđenih opcija za dopunu kredita</h2>
            <div class="buy-options">
              <button v-for="(option, index) in options" :key="index" @click="selectCard(option)" :class="[ selectedCardOption !== null && selectedCardOption.id === option.id ? 'bg-gray-800 text-white selected' : '' ]">
                <div class="value">{{ option.value + ' kredita' }}</div>
                <div class="price">
                  <img src="/coins.png" alt="">
                  <p>{{ option.price }}</p>
                </div>
              </button>
            </div>
            <h2 v-if="selectedCardOption !== null">Izaberite način kartičnog plaćanja</h2>
            <ul v-if="selectedCardOption !== null" class="cards">
              <li v-for="(tab, index) in cards" @click="currentCard = index" :key="index" :class="[ currentCard === index ? 'bg-gray-800 text-white selected-card' : '' ]">
                <img :src="tab.img" alt="">
                <p v-if="!$device.isMobile">{{ tab.type }}</p>
              </li>
            </ul>
            <TextField v-model="credits"></TextField>
            <ActionButton placeholder="Dopuni kredit" @action="handleAction"></ActionButton>
          </div>
        </div>
    </div>
    <Snackbar></Snackbar>
  </div>
</template>

<script>
import { Component, Vue, Prop} from "nuxt-property-decorator";
import TextField from "@/components/inputs/TextField"
import ActionButton from "@/components/actionButtons/ActionButton"
import Snackbar from "@/components/global/Snackbar"

@Component({
  components: {
    TextField,
    Snackbar,
    ActionButton
  },
  layout: (ctx) => ctx.$device.isMobile ? 'mobile' : 'settings'
})
export default class Kredit extends Vue {
  tabs = [
    {
      type: 'Karticom',
      img: '/credit-card.svg'
    },
    {
      type: 'SMS porukom',
      img: '/sms.svg'
    },
    {
      type: 'Žiralno (uplatnicom)',
      img: '/invoice.svg'
    },
  ]

  operaters = [
    {
      type: 'BH Telecom',
      img: '/bhTelecom.svg'
    },
    {
      type: 'M:tel',
      img: '/mtel.svg'
    },
    {
      type: 'HTEronet)',
      img: '/HTeronet.svg'
    },
  ]

  cards = [
    {
      type: 'Monri',
      img: '/monri.png'
    },
    {
      type: 'PayPal',
      img: '/paypal.png'
    },
  ]

  options = [
    {
      id: 1,
      value: '100',
      price: '5 KM'
    },
    {
      id: 2,
      value: '200',
      price: '8 KM'
    },
    {
      id: 3,
      value: '400',
      price: '14 KM'
    },
    {
      id: 4,
      value: '800',
      price: '30 KM'
    },
    {
      id: 5,
      value: '1600',
      price: '55 KM'
    },
    {
      id: 6,
      value: '3200',
      price: '80KM'
    },
    {
      id: 7,
      value: '6400',
      price: '112 KM'
    },
    {
      id: 8,
      value: '10000',
      price: '200 KM'
    },
  ]
  smsOptions = [
    {
      id: 1,
      value: '100 kredita',
      price: '5 KM',
      number: '0611122',
      word: 'DOPUNA5'
    },
    {
      id: 2,
      value: '200 kredita',
      price: '8 KM',
      number: '0611167',
      word: 'DOPUNA8'
    },
    {
      id: 3,
      value: '400 kredita',
      price: '14 KM',
      number: '0611145',
      word: 'DOPUNA14'
    },
    {
      id: 4,
      value: '800 kredita',
      price: '30 KM',
      number: '0611133',
      word: 'DOPUNA30'
    },
  ]

  currentTab = 0;
  currentCard = null;
  selectedCardOption = null;
  selectedSmsOption = null;
  currentOperater = 0;
  credits = 0;

  selectCard(c) {
    this.selectedCardOption = c;

    this.credits = c.value;
  }

  selectSmsOption(c) {
    this.selectedCardOption = c;
  }

  async handleAction() {
    try {
      await this.$axios.post('/profile/credit_top_up', {
        credits: this.credits
      });

      let updatedUser = {...this.$auth.user}
      updatedUser.credits += this.credits.toString();
      this.$auth.setUser(updatedUser)

      this.$snackbar.show({
        text: "Uspješno ste dopunili kredit",
        timeout: 1000,
        type: "success"
      });
    } catch(e) {
      console.log(e)
    }
  }
}
</script>

<style scoped lang="scss">

@mixin for-phone-only {
  @media (max-width: 599px) {
    @content;
  }
}

.preview-wrapper-inner {
  margin-top: 32px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
  border-radius: 4px;
  padding: 24px;

  @include for-phone-only {
    padding-top: 20px;
    padding-bottom: 120px;
  }

  h2 {
    font-size: 18px;
    font-weight: 500;
    margin-bottom: 36px;
  }

  .credit-inner {
    display: flex;
    flex-direction: column;
    width: 100%;

    @include for-phone-only {
      width: 100%;
      padding: 0 12px;
    }
    .row {
      display: flex;
      flex-direction: row;
    }

    .types {
      display: flex;
      flex-direction: column;
      flex: 2;

      li {
        display: flex;
        flex-direction: row;
        align-items: center;
        padding: 8px;
        width: 100%;
        box-sizing: border-box;
        cursor: pointer;

        &:first-child {
          padding: 0;
        }


        img {
          margin-right: 24px;
          height: 50px;
          width: 50px;
        }
        &.selected {
          background: #f1f1f1;
          border-radius: 10px;
        }

      }
    }

    .content-inner {
      display: flex;
      flex: 5;

      @include for-phone-only {
        flex: 1;
        width: 100%;
      }

      > div {
        width: 100%;
        min-width: 100%;
      }

      .buy-options {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        grid-row-gap: 12px;
        grid-column-gap: 12px;
        min-width: 100%;
        margin-bottom: 36px;

        @include for-phone-only {
          grid-template-columns: repeat(1, 1fr);
        }

        button {
          height: 100px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          border-radius: 7px;
          border: 1px solid #dcdcdc;
          width: 100%;
          padding: 24px;
          box-sizing: border-box;
          cursor: pointer;

          &.selected {

            img {
              filter: invert(1)
            }
          }

          &:focus {
            outline: none;
          }

          .value {
            font-size: 20px;
            font-weight: 500;
            font-family: 'Outfit', sans-serif;
            margin-bottom: 16px;
          }

          .price {
            display: flex;
            align-items: center;

            p {
              font-size: 18px;
              font-weight: 500;
              font-family: 'Outfit', sans-serif;
            }

            img {
              height: 20px;
              margin-right: 12px;
            }
          }
        }
      }

      .cards {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        width: 100%;
        margin-top: 36px;

        li {
          display: flex;
          flex-direction: row;
          align-items: center;
          box-sizing: border-box;
          cursor: pointer;
          width: fit-content;
          padding: 8px 24px;

          @include for-phone-only {
            padding: 8px 12px;
            width: 100%;
            display: flex;
            justify-content: center;
          }

          p {
            font-weight:500;
            font-size: 15px;
          }

          img {
            margin-right: 24px;
            height: 50px;

          }

          &:last-child {
            img {
              height: 30px;
            }
          }
          &.selected-card {
            border-radius: 7px;
            img[src$='.png'] {
              filter: invert(1) brightness(100);
            }
          }
        }
      }

      .operaters {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        width: 100%;
        margin-top: 36px;

        li {
          display: flex;
          flex-direction: row;
          align-items: center;
          box-sizing: border-box;
          cursor: pointer;
          flex: 1;
          padding: 8px 24px;

          p {
            font-weight:500;
            font-size: 15px;
          }

          img {
            margin-right: 24px;
            height: 50px;

          }

          &.selected-card {
            background: #f1f1f1;
            border-radius: 10px;
          }
        }
      }

      .buy-options-sms {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        grid-row-gap: 12px;
        grid-column-gap: 12px;
        min-width: 100%;
        margin-top: 36px;
        margin-bottom: 32px;

        button {
          height: 100px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          border-radius: 10px;
          border: 1px solid #dcdcdc;
          width: 100%;
          background: transparent;
          padding: 24px;
          box-sizing: border-box;
          cursor: pointer;

          &.selected {
            border: none;
            background: #f1f1f1;
          }

          &:focus {
            outline: none;
          }

          .value {
            font-size: 20px;
            font-weight: 500;
            font-family: 'Outfit', sans-serif;
            margin-bottom: 15px;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            width: 100%;
          }

          .price {
            display: flex;
            align-items: center;
            display: flex;
            flex-direction: row;
            justify-content: space-between;

            p {
              font-size: 14px;
              font-weight: 500;
              font-family: 'Outfit', sans-serif;
            }

            img {
              height: 20px;
              margin-right: 12px;
            }
          }
        }
      }

    }
  }
}

.buy-options-wrap {
  width: 100%;
  min-width: 100%;
}

.actual {

  @include for-phone-only {
    margin-top: 12px;
  }

  img {
    height: 25px;
    margin-right: 12px;
  }
}

.mob-credit {
  @include for-phone-only {
    display: flex;
    flex-direction: column;
  }
}
</style>
