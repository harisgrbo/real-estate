<template>
  <div class="stepper-wrapper">
    <div class="stepper-content">
      <div class="filters">
        <ul>
          <li v-for="(tab, index) in tabs" @click="currentTab = index" :class="[ currentTab === index? 'active' : '']">{{ tab.name }}</li>
        </ul>
        <div class="content-filters">
          <component :is="tabs[currentTab].component"></component>
        </div>
        <div class="buttons">
          <button @click="currentTab--" :disabled="currentTab <=0">Nazad</button>
          <span>Korak {{ currentTab + 1 }} od {{ tabs.length }}</span>
          <button @click="currentTab++">{{ currentTab === 2 ? 'Objavi' : 'Naprijed'}}</button>
        </div>
      </div>
      <div class="progress">
        progress
      </div>
    </div>
  </div>
</template>

<script>
import { Component, Vue} from "nuxt-property-decorator";
import Required from "@/components/publish/Required";
import Detailed from "@/components/publish/Detailed";
import Images from "@/components/publish/Images";

@Component({
  components: {
    Required,
    Detailed,
    Images
  },
  layout() { return "publish" },
})

export default class Objava extends Vue {
  tabs = [
    {
      name: 'Osnovne informacije',
      component: 'Required'
    },
    {
      name: 'Detaljne informacije',
      component: 'Detailed'
    },
    {
      name: 'Slike',
      component: 'Images'
    },
  ]
  currentTab = 0
}
</script>

<style scoped lang="scss">
.stepper-wrapper {
  height: calc(100vh - 120px);
  width: 100%;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  justify-content: space-between;

  ul {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 60px;
    box-sizing: border-box;
    border-bottom: 1px solid #ddd;
    background: #fff;
    border-top-right-radius: 10px;
    border-top-left-radius: 10px;

    li {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
      flex: 1;
      &.active {
        position: relative;
        color: #757B9A;
        font-weight: 500;
        &::after {
          content: "";
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          background: #757B9A;
          height: 2px;
          border-radius: 50%;
        }
      }
    }
  }
  .stepper-content {
    display: flex;
    flex-direction: row-reverse;
    height: 100%;
    .filters {
      display: flex;
      flex-direction: column;
      flex: 6;
      height: 100%;
      box-sizing: border-box;
      background: #fff;
      margin-left: 24px;
      box-shadow: rgba(0, 0, 0, 0.09) 0px 1px 12px;
      border-radius: 10px;

      .content-filters {
        height: calc(100vh - 282px);
        padding: 24px;
        box-sizing: border-box;
        overflow-y: scroll;
        background: #fff;

      }
    }

    .progress {
      box-shadow: rgba(0, 0, 0, 0.09) 0px 1px 12px;
      border-radius: 10px;
      display: flex;
      flex: 2;
      background: #fff;
      padding: 24px;
      box-sizing: border-box;

    }
  }
  .buttons {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 100px;
    padding: 0 24px;
    box-sizing: border-box;
    //box-shadow: rgba(0, 0, 0, 0.09) 0px 1px 12px;
    border-top: 1px solid #ddd;
    border-radius: 10px;
    margin: 0 24px 0px 24px;

    button {
      padding: 0 24px;
      height: 48px;
      width: fit-content;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 13px;
      border-radius: 8px;
      cursor: pointer;
      outline: none;
      border: none;
      background: #757B9A !important;
      color: #fff;
      font-weight: 500 !important;
      transition: 0.3s all ease;
      font-size: 16px;
      i {
        margin-right: 8px;
      }
      &:hover {
        box-shadow: rgba(0, 0, 0, 0.08) 0px 1px 12px !important;
      }
      &:disabled {
        opacity: 0.2;
      }
    }
  }
}
</style>
