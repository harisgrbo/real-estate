<template>
  <div class="static-wrapper">
    <div class="static-inner">
      <div class="block-1">
        <div class="left">
          <h2>Zašto registrovati agenciju?</h2>
          <p>Komercijalni profil sa promocijom, izvještajima, statistikom i još mnogo toga. Idealno za sva pravna lica koja se bave trgovinom nekretninama. Prvih 30 dana korištenja je potpuno besplatno!</p>
          <div class="button-wrapper">
            <ActionButton placeholder="Registruj agenciju"></ActionButton>
            <ActionButton placeholder="Objavi prvu nekretninu"></ActionButton>
          </div>
          <ul>
            <li>
              <img src="/check.svg" alt="">
              <p>Prvi mjesec potpuno besplatno!</p>
            </li>
            <li>
              <img src="/check.svg" alt="">
              <p>Dodatni popust na pretplatu od 3, 6 i 12 mjeseci</p>
            </li>
          </ul>
        </div>
        <div class="right">
          <img src="/grafika.png" alt="">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Component, Vue, Prop} from "nuxt-property-decorator";
import ActionButton from "@/components/actionButtons/ActionButton";

@Component({
  components: {
    ActionButton
  },
  layout: (ctx) => ctx.$device.isMobile ? 'mobile' : 'home'
})
export default class ZastoRegistrovatiAgenciju extends Vue {
}
</script>

<style scoped lang="scss">
  .static-wrapper {
    background-image: url(/background.svg);
    height: 100%;
    width: 100%;
    min-height: 100%;
    background-position: left;
    background-repeat: no-repeat;
    background-position-y: center;
    background-size: cover;

    .static-inner {
      width: 1280px;
      margin: 0 auto;
      display: flex;
      flex-direction: column;

      .block-1 {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        height: fit-content;
        font-family: 'Montserrat', sans-serif;

        .left {
          display: flex;
          flex-direction: column;
          flex: 1;
          justify-content: center;

          h2 {
            font-size: 35px;
            color: #444;
          }

          p {
            font-size: 20px;
            line-height: 30px;
            padding-top: 36px;
          }

          .button-wrapper {
            display: flex;
            flex-direction: row;
            align-items: center;

            button:first-child {
              margin-right: 8px;
            }

            button:last-child {
              margin-left: 8px;
            }
          }

          ul {
            li {
              height:30px;
              display: flex;
              align-items: center;
              justify-content: flex-start;

              img {
                margin-right: 24px;
              }

              p {
                line-height: 24px;
                font-size: 20px;
                margin-top: 0;
              }
            }
          }
        }

        .right {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          flex: 1;

          img {
            width: 800px;
          }
        }
      }
    }
  }
</style>
