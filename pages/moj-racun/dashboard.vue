<template>
  <div class="account-wrapper-a">
    <div class="content">
      <ul class="expanded mx-20">
        <nuxt-link class="inner" :to="{ path: `/moj-racun/dashboard/${link.slug}`}" v-for="(link, index) in links" :key="index">
          <li>
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

.nuxt-link-active.inner {
  position: relative;
  color: #1F2937;

  &::after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    border-bottom: 2px solid #1F2937;
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

.account-wrapper-a {
  padding-top: 120px;
}

.dashboard-inner {
  width: 100%;
}

</style>
