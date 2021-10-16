<template>
  <div class="credit-wrapper">
    <div class="credit-inner">
      <div class="row">
        <ul class="types">
          <li>
            <h2>Izaberite način kupovine kredita</h2>
          </li>
          <li v-for="(tab, index) in tabs" @click="currentTab = index" :key="index" :class="[ currentTab === index ? 'selected' : '' ]">
            <img :src="tab.img" alt="">
            <p>{{ tab.type }}</p>
          </li>
          <li class="actual">
            <h2>Trenutno stanje kredita</h2>
            <b>{{ $auth.user.credits }}</b>
            <img src="/coinicon.svg" alt="">
          </li>
        </ul>
        <div class="content">
          <div v-if="currentTab === 0" div="buy-options-wrap">
            <h2>Izaberite jednu od ponuđenih opcija za dopunu kredita</h2>
            <div class="buy-options">
              <button v-for="(option, index) in options" :key="index" @click="selectCard(option)" :class="[ selectedCardOption !== null && selectedCardOption.id === option.id ? 'selected' : '' ]">
                <div class="value">{{ option.value }}</div>
                <div class="price">
                  <img src="/coinicon.svg" alt="">
                  <p>{{ option.price }}</p>
                </div>
              </button>
            </div>
            <h2 v-if="selectedCardOption !== null">Izaberite način kartičnog plaćanja</h2>
            <ul v-if="selectedCardOption !== null" class="cards">
              <li v-for="(tab, index) in cards" @click="currentCard = index" :key="index" :class="[ currentCard === index ? 'selected-card' : '' ]">
                <img :src="tab.img" alt="">
                <p>{{ tab.type }}</p>
              </li>
            </ul>
          </div>
          <div v-if="currentTab === 1">
            <h2>Izaberite operatera</h2>
            <ul class="operaters">
              <li v-for="(tab, index) in operaters" @click="currentOperater = index" :key="index" :class="[ currentOperater === index ? 'selected-card' : '' ]">
                <img :src="tab.img" alt="">
                <p>{{ tab.type }}</p>
              </li>
            </ul>
            <div v-if="currentOperater === 0">
              <div class="buy-options-sms">
                <button v-for="(option, index) in smsOptions" :key="index" @click="selectSmsOption(option)" :class="[ selectedSmsOption !== null && selectedSmsOption.id === option.id ? 'selected' : '' ]">
                  <div class="value">
                    <p>{{ option.value }}</p>
                    <p>{{ option.price }}</p>
                  </div>
                  <div class="price">
                    <p>posalji {{ option.word }} </p>
                    <p>na broj {{ option.number }}</p>
                  </div>
                </button>
              </div>
              <h2>Nakon što pošaljete SMS, u roku od par sekundi ćete dobiti odgovor sa kodom. Unesite ga u polje ispod:</h2>

              <TextField v-model="credits"></TextField>
              <ActionButton placeholder="Dopuni kredit" @action="handleAction"></ActionButton>
            </div>
          </div>
          <div v-if="currentTab === 2">
            3
          </div>
          <Snackbar></Snackbar>
        </div>
      </div>
    </div>
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
  layout: (ctx) => ctx.$device.isMobile ? 'mobile' : 'home'
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
      value: '100 kredita',
      price: '5 KM'
    },
    {
      id: 2,
      value: '200 kredita',
      price: '8 KM'
    },
    {
      id: 3,
      value: '400 kredita',
      price: '14 KM'
    },
    {
      id: 4,
      value: '800 kredita',
      price: '30 KM'
    },
    {
      id: 5,
      value: '1600 kredita',
      price: '55 KM'
    },
    {
      id: 6,
      value: '3200 kredita',
      price: '80KM'
    },
    {
      id: 7,
      value: '6400 kredita',
      price: '112 KM'
    },
    {
      id: 8,
      value: '10000 kredita',
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
      updatedUser.credits += this.credits;
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
.credit-wrapper {
  height: 100%;
  width: 100%;
  min-height: 100%;
  padding-top: 36px;

  h2 {
    font-size: 18px;
    font-weight: 500;
    margin-bottom: 36px;
  }

  .credit-inner {
    display: flex;
    flex-direction: column;
    width: 1280px;
    margin: 0 auto;

    .row {
      display: flex;
      flex-direction: row;
    }

    .types {
      display: flex;
      flex-direction: column;
      flex: 2;
      margin-right: 24px;
      border-right: 1px solid #f1f1f1;
      padding-right: 24px;

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

        p {
          font-weight:500;
          font-size: 15px;
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

        &.actual {
          display: flex;
          align-items: center;
          width: 100%;
          justify-content: space-between;
          border: 1px solid #444;
          margin-top: 46px;
          border-radius: 10px;

          img {
            margin-right: 0;
          }

          h2 {
            font-size: 16px;
            margin-bottom: 0;
            margin-top: 0;
          }
        }
      }
    }

    .content {
      display: flex;
      flex: 5;

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

        button {
          height: 100px;
          display: flex;
          flex-direction: column;
          align-items: center;
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
            font-family: 'Poppins', sans-serif;
            margin-bottom: 16px;
          }

          .price {
            display: flex;
            align-items: center;

            p {
              font-size: 18px;
              font-weight: 500;
              font-family: 'Poppins', sans-serif;
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
            background: #f1f1f1;
            border-radius: 10px;
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
            font-family: 'Poppins', sans-serif;
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
              font-family: 'Poppins', sans-serif;
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
</style>
