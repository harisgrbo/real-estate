<template>
  <div class="account-wrapper-a preview-wrapper-inner">
    <div class="account-wrapper-inner">
      <div class="sidenav">
        <h1 class="heading-account">Kontaktirajte nas</h1>
        <form @submit.prevent="contactUs" class="mt-6">
          <TextField type="text" label="Naslov" placeholder="Naslov poruke" v-model="title" class="mb-6 mt-1"></TextField>
          <div class="w-full textarea-field">
            <TextAreaField label="Opis" placeholder="Poruka" v-model="description" class="mt-1"></TextAreaField>
          </div>
          <ActionButton class="w-full" :style-options="{ color: '#fff', marginTop: '24px', width: $device.isMobile ? '100%' : 'fit-content' }" :loading="loading" type="submit" placeholder="Pošalji"></ActionButton>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { Component, Vue} from "nuxt-property-decorator";
import TextField from "../components/inputs/TextField";
import ActionButton from "../components/actionButtons/ActionButton";
import TextAreaField from "../components/inputs/TextAreaField";

@Component({
  components: {TextAreaField, ActionButton, TextField},
  layout: (ctx) => ctx.$device.isMobile ? 'mobile' : 'settings',
  middleware: ['auth'],
})
export default class kontakt extends Vue {
  title = ""
  description = ""

  async contactUs() {
    try {
      let res = await this.$axios.post('/bug/report', {
        title: this.title,
        description: this.description
      })

      this.title = '';
      this.description = '';

      this.$toast.open({
        message: "Uspješno ste poslali poruku",
        type: 'success',
        duration: 5000
      });


    } catch(e) {
      console.log(e)
    }
  }
}


</script>

<style lang="scss" scoped>

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
  border-radius: 6px;
  padding: 24px;

  @include for-phone-only {
    padding: 24px !important;
    height: 100% !important;
  }
}

.account-wrapper-a {
  padding-bottom: 36px;
  .account-wrapper-inner {
    width: 100%;

    @include for-phone-only {
      width: 100%;
      padding-bottom: 70px;
      margin: 0;
    }

    .sidenav {
      display: flex;
      flex: 2;
      box-sizing: border-box;
      border-radius: 6px;
      flex-direction: column;

      @include for-phone-only {
        padding: 0px;
      }


      .info {
        display: flex;
        align-items: center;
        height: 60px;
        justify-content: flex-start;
        margin-bottom: 32px;

        @include for-phone-only {
          margin-bottom: 12px;
        }
        p {
          margin-right: 12px;
          font-size: 16px;

          &:first-child {
            font-weight: 500;
          }
        }

        a {
          color: #002F34;
          &:hover {
            text-decoration: underline;
          }
        }
      }

      .heading-account {
        overflow-wrap: break-word !important;
        //font-family: Circular, -apple-system, BlinkMacSystemFont, Roboto, "Helvetica Neue", sans-serif !important;
        font-size: 26px !important;
        font-weight: 500 !important;
        line-height: 1.125em !important;
        color: #000 !important;
      }

      h2 {
        //font-family: 'NunitoSans', sans-serif;;
        font-weight: 500;
        font-size: 20px;
        margin-bottom: 36px;
      }

    }

    .main-wrapper {
      display: flex;
      flex: 8;
      padding: 24px;
      background: #fff;
      margin-left: 24px;
      box-sizing: border-box;
      border-radius: 6px;
      position: relative;
      height: calc(100vh - 117px);
      overflow: scroll;
    }
  }
}


.icon {
  margin-right: 12px;
  font-size: 18px;
  color: #9BAABD;
}

.dashboard-class {
  background: #F7F9FF;
}

.mobile-grid {
  @include for-phone-only {
    display: flex;
    flex-direction: column;
  }
}

.go-to-profile {
  height: 42px;
  width: fit-content;
  padding: 0 16px;
  border: 1px solid #1F2937;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  font-weight: 500;

  &:hover {
    background: #fff;
  }
}

.warning {
  display: flex;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(255, 255, 255, 0.7);
  padding: 36px;
  z-index: 10;

  span {
    font-size: 20px;
    text-align: center;
    width: 100%;
  }
}

.textarea-field {
  ::v-deep textarea {
    min-height: 320px;
  }
}
</style>

