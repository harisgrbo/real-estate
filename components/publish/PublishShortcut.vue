<template>
  <div class="shortcut-wrapper">
    <div class="box">
      <img src="/png/008-for-rent.png" alt="">
      <p>Iznajmljujete nekretninu?</p>
      <button>Iznajmite nekretninu</button>
    </div>
    <div class="box">
      <img src="/png/003-for-sale.png" alt="">
      <p>Prodajete nekretninu?</p>
      <button>Objavite oglas</button>
    </div>
    <div class="box">
      <img src="/png/015-estate-agent.png" alt="">
      <p>Zelite prodati nekretninu uz pomoc agencije?</p>
      <button>Pretrazite agencije</button>
    </div>
    <div class="box">
      <img src="/png/013-house-3.png" alt="">
      <p>Kupujete nekretninu?</p>
      <button>Pretretrazite nekretnine</button>
    </div>
  </div>
</template>

<script>
import { Component, Vue} from "nuxt-property-decorator";

@Component({
  components: {
  },
})

export default class PublishShortcut extends Vue {

}
</script>

<style scoped lang="scss">
  .shortcut-wrapper {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 0 80px;

    .box {
      display: flex;
      flex-direction: column;
      height: 340px;
      margin-right: 24px;
      align-items: center;
      justify-content: center;
      border-right: 1px solid #dcdcdc;
      width: 100%;
      cursor: pointer;
      padding: 0 24px;

      &:last-child {
        border-right: none;
      }

      img {
        transition: 0.3s all ease;
        height: 160px;
      }

      p {
        font-size: 18px;
        margin-top: 32px;
        text-align: center;
        height: 30px;
      }

      button {
        height: 53px;
        background: #1B1C32;
        border-radius: 4px;
        width: fit-content;
        border: none;
        display: flex;
        align-items: center;
        font-size: 15px;
        font-weight: 500;
        padding: 0 24px;
        color: #fff;
        cursor: pointer;
        justify-content: center;
        margin-top: 24px;
      }

      &:last-child {
        margin-right: 0;
      }

      &:hover {
        img {
          transform: scale(1.1);
        }
      }
    }
  }

</style>
