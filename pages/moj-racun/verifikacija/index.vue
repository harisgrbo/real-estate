<template>
  <div class="account-wrapper">
    <ul class="breadcrumbs">
      <li>
        <nuxt-link to="/moj-racun">Moj račun</nuxt-link>
        <font-awesome-icon icon="angle-right"></font-awesome-icon>
        <p>Verifikacija</p>
      </li>
    </ul>
    <h1 class="heading">
      Verifikacija
    </h1>
    <div class="verify-content">
      <div class="verify-box">
        <h2>Verifikacija e-mail adrese</h2>
        <small>Nakon što kliknete dugme "pošaljite verifikacijski e-mail" na vašu e-mail adresu će biti dostavljen e-mail sa linkom koji trebate kliknuti kako bi izvršili i finalizirali verifikaciju Vašega profila putem e-maila. Ako verifikacijski e-mail ne možete pronaći u Vašem inboxu, pogledajte u folderima Junk ili Spam.</small>
        <div class="verify-info">
          <img src="/neverifikovan.svg" alt="">
          <p>Email nije verifikovan</p>
        </div>
        <ActionButton placeholder="Pošalji verifikacijski e-mail"></ActionButton>
      </div>
      <div class="verify-box">
        <h2>Verifikacija broja telefona</h2>
        <small>Nakon što kliknete dugme "pošaljite verifikacijski e-mail" na vašu e-mail adresu će biti dostavljen e-mail sa linkom koji trebate kliknuti kako bi izvršili i finalizirali verifikaciju Vašega profila putem e-maila. Ako verifikacijski e-mail ne možete pronaći u Vašem inboxu, pogledajte u folderima Junk ili Spam.</small>
        <div class="verify-info">
          <img src="/verifikovan.svg" alt="">
          <p>Broj telefona nije verifikovan</p>
        </div>
        <h3>Molimo Vas da unesete Vaš broj telefona</h3>
        <input type="text">
        <ActionButton placeholder="Pošalji verifikacijski sms" @action="handleAction"></ActionButton>
        <h5 v-if="showInfoMsg">Provjerite jeste li dobili poruku i unesite kod</h5>
      </div>
      <client-only>
        <modal name="verification" :adaptive="true" height="100%">
          <div class="modal-inner">
            <div class="modal-header">
              <h2>Unesite verifikacijski kod iz SMS poruke</h2>
              <i class="material-icons" @click="$modal.hide('verification')">close</i>
            </div>
            <div class="modal-content">
              <CodeInput ref="kod" :loading="false" class="input" @change="onChange" @complete="onComplete"/>
            </div>
          </div>
        </modal>
      </client-only>
    </div>
  </div>
</template>

<script>
import { Component, Vue} from "nuxt-property-decorator";
import ActionButton from "@/components/actionButtons/ActionButton";

@Component({
  components: {
    ActionButton
  },
  layout() { return "home" }
})

export default class Verifikacija extends Vue {
  showInfoMsg = false;
  code = ''

  handleAction() {
    this.showInfoMsg = true

    this.$modal.show('verification');
  }

  onChange(v) {
    console.log("onChange ", v);
  }

  onComplete(v) {
    console.log("onComplete ", v);
  }
}
</script>

<style scoped lang="scss">
.verify-content {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 36px;

  .verify-box {
    display: flex;
    //border: 3px solid #d1d1d1;
    flex: 1;
    flex-direction: column;
    //box-shadow: rgb(0 0 0 / 12%) 0px 6px 16px;
    //border: 1px solid #0B8489;
    height: 100%;


    &:first-child {
      margin-right: 32px;
      padding-right: 32px;
      border-right: 1px solid #ebebeb;
    }

    h2 {
      font-weight: 500;
      font-size: 18px;
    }

    small {
      font-weight: 400;
      font-size: 16px;
      line-height: 22px;
      font-family: 'Montserrat', sans-serif;
      margin-top: 36px;
      color: #565656;
    }

    h3 {
      font-size: 17px;
      font-weight: 500;
      margin-bottom: 12px;
    }

    h5 {
      font-size: 15px;
      font-style: italic;
      margin-top: 12px;
    }

    input {
      height: 48px;
      border-radius: 5px;
      width: 100%;
      padding: 0 12px;
      border: 1px solid #4AAE9B;
      box-sizing: border-box;
      margin-bottom: 24px;
      font-size: 15px;

      &:focus {
        outline: none;
      }
    }

    .verify-info {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      margin: 24px 0;
      background: #f1f1f1;
      border-radius: 10px;
      padding: 12px;
      box-sizing: border-box;

      img {
        height: 80px;
        align-self: center;
        margin-right: 24px;
      }

      p {
        font-size: 19px;
      }
    }

    ::v-deep button {
      margin-top: 0;
      background: #0B8489;
    }
  }
}

// modal

.modal-inner {
  display: flex;
  flex-direction: column;
  padding: 0 24px;
  .modal-header {
    display: flex;
    align-items: center;
    height: 70px;
    border-bottom: 1px solid #dcdcdc;
    justify-content: space-between;

    h2 {
      font-size: 20px;
      font-weight: 500;
    }

    svg {
      cursor: pointer;
    }
  }

  .modal-content {
    padding: 24px 0;
    textarea {
      height: 200px;
      width: 100%;
      border: 1px solid #ddd;
      border-radius: 8px;
      font-family: 'Montserrat', sans-serif;
      font-size: 16px;
      line-height: 21px;
      box-sizing: border-box;
      padding: 24px;

      &:focus {
        outline: none;

      }
    }
  }
}

.security-code-wrap {
  display: flex;
  align-items: center;
  justify-content: center;
}
.security-code-container {
  margin: 0;
  padding: 0;
  display: flex;
  .field-wrap {
    list-style: none;
    display: block;
    height: 40px;
    width: 40px;
    line-height: 40px;
    font-size: 16px;
    .char-field {
      font-style: normal;
    }
  }
}
.block-container {
  justify-content: center;
  .field-wrap {
    background-color: #fff;
    margin: 2px;
    color: #000;
  }
}
.line-container {
  position: relative;
  background-color: #fff;
  &:after {
    box-sizing: border-box;
    content: "";
    width: 200%;
    height: 200%;
    transform: scale(.5);
    position: absolute;
    border: 1px solid #d9d9d9;
    top: 0;
    left: 0;
    transform-origin: 0 0;
    border-radius: 4px;
  }
  .field-wrap {
    flex: 1;
    position: relative;
    &:not(:last-child):after {
      content: "";
      width: 1px;
      height: 50%;
      position: absolute;
      right: 0;
      top: 25%;
      background-color: #d9d9d9;
      transform: scaleX(.5);
    }
  }
}
.input-code {
  position: absolute;
  left: -9999px;
  top: -9999px;
}

.input.react-code-input-container {
  width: 100% !important;

}

::v-deep .react-code-input {
  display: flex !important;
  justify-content: center !important;
}

::v-deep .react-code-input input {
  font-family: 'Montserrat', sans-serif !important;
  font-weight: 800 !important;
  width: calc(100% / 6) !important;
}

h1 {
  color: rgb(72, 72, 72) !important;
}
</style>
