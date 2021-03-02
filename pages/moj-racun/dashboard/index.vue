<template>
  <div class="account-wrapper">
    <ul class="breadcrumbs">
      <li>
        <nuxt-link to="/moj-racun">Moj račun</nuxt-link>
        <font-awesome-icon icon="angle-right"></font-awesome-icon>
        <p>Dashboard</p>
      </li>
    </ul>
    <h1 class="heading">
      Dashboard
    </h1>
    <div class="content">
      <ul>
        <li v-for="(link, index) in links" @click="currentTab = index" :class="[ currentTab === index? 'active' : '' ]">{{ link }}</li>
      </ul>
      <div class="dashboard-inner">
        <div v-if="currentTab === 0">
          <StandardChart></StandardChart>
          <PieChart></PieChart>
        </div>
        <div v-if="currentTab === 1">

        </div>
        <div v-if="currentTab === 2">
          3
        </div>
        <div v-if="currentTab === 3">
          4
        </div>
        <div v-if="currentTab === 4">
          5
        </div>
        <div v-if="currentTab === 5">
          6
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Component, Vue} from "nuxt-property-decorator";
import StandardChart from "@/components/analytics/StandardChart";
import PieChart from "@/components/analytics/PieChart";

@Component({
  components: {
    StandardChart,
    PieChart
  },
  layout() { return "home" }
})

export default class Dashboard extends Vue {
  links = [
    'Analitika',
    'Postavke agencije',
    'Agenti za nekretnine',
    'Ubacivanje oglasa',
    'Izdvajanje oglasa',
    'Popup reklama'
  ]
  currentTab = 0;
}
</script>

<style scoped lang="scss">
.content {
  display: flex;
  flex-direction: row;
  margin-top: 36px;

  ul {
    display: flex;
    flex-direction: column;
    flex: 2;
    height: 100%;
    padding: 8px;
    border-right: 1px solid #f1f1f1;
    border-radius: 10px;
    box-sizing: border-box;

    li {
      height: 60px;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      font-weight: 500;
      cursor: pointer;

      &.active {
        font-weight: 600;
      }
    }
  }

  .dashboard-inner {
    display: flex;
    flex: 7;
    padding-left: 64px;

    > div {
      width: 100%;
    }
  }
}
</style>
