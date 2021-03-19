<template>
  <div class="mobile-bottom-navbar">
    <nuxt-link :to="{ path: '/' }">
      <font-awesome-icon icon="home"></font-awesome-icon>
    </nuxt-link>
    <nuxt-link to="/moj-racun/poruke">
      <font-awesome-icon icon="envelope"></font-awesome-icon>
    </nuxt-link>
    <nuxt-link to="/publish">
      <font-awesome-icon icon="plus" class="publish-btn"></font-awesome-icon>
    </nuxt-link>
    <nuxt-link :to="goToUser()">
      <font-awesome-icon icon="user" @click=""></font-awesome-icon>
    </nuxt-link>
    <nuxt-link to="#">
      <font-awesome-icon icon="bars" @click="openSidebarMenu"></font-awesome-icon>
    </nuxt-link>
  </div>
</template>

<script>
import {Component, Vue, Watch} from "nuxt-property-decorator";
import CategoriesList from "@/components/CategoriesList";
import ListingType from "@/components/ListingType";


@Component({
  categories: {
    ListingType,
    CategoriesList,
  }
})

export default class MobileBottomNavbar extends Vue {
  openCategoriesModal() {
    let self = this;
    this.$modal.show(
      {
        render(h) {
          return h( CategoriesList, {
            props: {
            },
            on: {
              selectedCat(e) {
                self.selectedCategory = e;
                self.closeModal();
              },
              close() {
                // close event needs to be echoed
                self.closeModal();
              }
            }
          });
        }
      },
      {
      },
      {
        'selected-category': this.handleSelectedCategory,
        adaptive: true,
        height: "100%",
      }
    );
  }

  goToUser() {
    if(this.$auth.user) {
      return '/users/' + this.$auth.user.id
    } else {
      return '/auth/login'
    }
  }

  closeModal() {
    this.$modal.hide('sidebar')
  }

  openSidebarMenu() {
    this.$emit('open-sidenav')
  }
}
</script>

<style scoped lang="scss">
  .mobile-bottom-navbar {
    position: fixed;
    bottom: 4px;
    left: 4px;
    box-sizing: border-box;
    right: 4px;
    min-height: 60px;
    height: fit-content;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: white;
    border-radius:10px;
    z-index: 5;
    padding: 0 24px;
    -webkit-box-shadow: 0px 0px 10px -6px rgb(0 0 0 / 69%);
    box-shadow: 0px 0px 10px -6px rgb(0 0 0 / 69%);

    svg {
      font-size: 20px;
      color: #dcdcdc;

      &.fa-plus {
        color: #D63946;
      }
    }

    .publish-btn {
      background-color: #D63946;
      color: #fff !important;
      border-radius:10px;
      padding: 8px;
    }
  }

  a {
    &.nuxt-link-exact-active {
      svg {
        color: red !important;
      }
    }
  }
</style>
