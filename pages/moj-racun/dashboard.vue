<template>
  <div class="account-wrapper dashboard-wrapper">
    <ul class="breadcrumbs">
      <li>
        <nuxt-link to="/moj-racun">Moj račun</nuxt-link>
        <font-awesome-icon icon="angle-right"></font-awesome-icon>
        <p>Dashboard</p>
      </li>
    </ul>
    <div class="content">
      <ul class="expanded"">
      <nuxt-link class="inner" :to="{ path: `/moj-racun/dashboard/${link.slug}`}" v-for="(link, index) in links">
        <li>
<!--            <img :src="link.icon" alt="">-->
            <p>{{ link.name }}</p>
        </li>
      </nuxt-link>
      </ul>
      <div class="dashboard-inner">
        <nuxt-child></nuxt-child>
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
    {
      name: 'Analitika',
      slug: 'analitika',
      icon: '/052-presentation.svg'
    },
    {
      name: 'Postavke agencije',
      slug: 'postavke-agencije',
      icon: '/052-presentation.svg'
    },
    {
      name: 'Agenti za nekretnine',
      slug: 'agenti-za-nekretnine',
      icon: '/052-presentation.svg'
    },
    {
      name: 'Upravljanje oglasima',
      slug: 'upravljanje-oglasima',
      icon: '/052-presentation.svg'
    },
    {
      name: 'Grupisanje oglasa',
      slug: 'grupisanje-oglasa',
      icon: '/052-presentation.svg'
    },
    {
      name: 'Sponzorisanje',
      slug: 'izdvajanje',
      icon: '/052-presentation.svg'
    },
  ]
  currentTab = 0;
  showUl = true;

  toggleUlWidth() {
    this.showUl = !this.showUl;
  }
}
</script>

<style scoped lang="scss">
.dashboard-wrapper {
  display: flex;
  //height: calc(100vh - 126px);
  width: 100%;
  box-sizing: border-box;
  flex-direction: column;
  //overflow: hidden;
  padding: 24px 80px;
}
.content {
  display: flex;
  flex-direction: column;
  margin-top: 24px;


  .dashboard-inner {
    display: flex;
    box-sizing: border-box;
    > div {
      width: 100%;
    }
  }
}

.nuxt-link-active.inner {
  position: relative;
  color: #0B8489;

  &::after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    border-bottom: 1px solid #0B8489;
  }
}

ul.expanded {
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 36px;
  border-bottom: 1px solid #EBEBEB !important;
  justify-content: flex-start;

  a {
    font-size: 14px !important;
    line-height: 26px !important;
    margin-right: 36px;
    padding-bottom: 8px;
    height: 40px;
    position: relative;
    cursor: pointer;
    text-transform: uppercase;
    font-weight:500;
    width: fit-content;

    &:last-child {
      margin-right: 0;
    }

    &.active {
      color: #0B8489;
      &::after {
        content: '';
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        border-bottom: 1px solid #0B8489;
      }
    }

    li {
      display:flex;
      height: 100%;
      justify-content:center;
      align-items:center;

      img {
        height: 25px;
      }
    }
  }
}

</style>
