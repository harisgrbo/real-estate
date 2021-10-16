<template>
  <div class="package-wrapper">
    <div class="package-header">
      <p class="package-type">{{ packageType }}</p>
      <div>
        <b>{{ price }}</b>
        <p class="value">KM</p>
        <p class="charge">/mjesecno</p>
      </div>
      <p class="pdv">sa PDV-om</p>
    </div>
    <div class="package-content">
      <ul>
        <li>
          <img src="/yes.svg" alt="">
          <p>Bonus 3413 kredita</p>
        </li>
        <li>
          <img src="/yes.svg" alt="">
          <p>Bonus 3413 kredita</p>
        </li>
        <li>
          <img src="/yes.svg" alt="">
          <p>Bonus 3413 kredita</p>
        </li>
        <li>
          <img src="/yes.svg" alt="">
          <p>Bonus 3413 kredita</p>
        </li>
        <li>
          <img src="/yes.svg" alt="">
          <p>Bonus 3413 kredita</p>
        </li>
        <li>
          <img src="/yes.svg" alt="">
          <p>Bonus 3413 kredita</p>
        </li>
      </ul>
      <button>Odaberi paket</button>
    </div>
  </div>
</template>

<script>
import { Component, Vue, Prop} from "nuxt-property-decorator";

@Component({
  components: {},
})

export default class Package extends Vue{
  @Prop({}) packageType;
  @Prop({}) price;
}
</script>

<style scoped lang="scss">
  .package-wrapper {
    display: flex;
    flex-direction: column;
    width: 100%;
    border-radius: 10px;
    box-shadow: rgba(0, 0, 0, 0.08) 0px 1px 12px;
    overflow: hidden;
    transition: 0.3s all ease;
    background: #fff;

    &:hover {
      margin-top: -30px;
    }

    .package-header {
      background: #1B1E31;
      border-bottom: 10px solid #0B8489;
      padding: 24px;
      color: #fff;
      font-family: 'Poppins', sans-serif;

      .package-type {
        background: #0B8489;
        border-radius: 10px;
        padding: 12px;
        font-size: 19px;
        width: fit-content;
        font-weight: 600;
        text-transform: uppercase;
        margin-bottom: 24px;
      }

      > div {
        display: flex;
        flex-direction: row;
        align-items: flex-start;

        .value {
          font-size: 25px;
          font-weight: 600;
        }

        b {
          font-size: 70px;
          font-weight: 600;
        }

        .charge {
          font-size: 25px;
          font-weight: 400;
        }
      }

      .pdv {
        font-size: 15px;
        font-weight: 400;
      }
    }

    .package-content {
      padding: 0 24px;

      ul {
        width: 100%;
        display: flex;
        flex-direction: column;

        li {
          height: 60px;
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: flex-start;

          img {
            margin-right: 12px;
          }
        }
      }

      button {
        height: 50px;
        border-radius: 8px;
        background: #0B8489;
        border: none;
        color: #fff;
        width: 100%;
        font-family: 'Poppins', sans-serif;
        font-size: 15px;
        font-weight: 500;
        margin-bottom: 24px;
        cursor: pointer;

        &:focus {
          outline: none;
        }

      }
    }
  }
</style>
