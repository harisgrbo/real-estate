<template>
  <div class="mobile-bottom-navbar">
      <font-awesome-icon icon="home" @click="$router.push('/')"></font-awesome-icon>
      <font-awesome-icon icon="envelope" @click="$router.push('/moj-racun/poruke')"></font-awesome-icon>
      <font-awesome-icon icon="plus" @click="$router.push('/publish')" class="publish-btn"></font-awesome-icon>
      <font-awesome-icon icon="user" @click="$auth.user? $router.push('/users/' + $auth.user.id) : $router.push('/auth/login')"></font-awesome-icon>
      <font-awesome-icon icon="bars" @click="openSidebarMenu"></font-awesome-icon>

      <client-only>
        <modal name="sidebar" :adaptive="true" height="100%" @closed="closeModal">
          <sidenav></sidenav>
        </modal>
      </client-only>
  </div>
</template>
b
<script>
import {Component, Vue, Watch} from "nuxt-property-decorator";
import CategoriesList from "@/components/CategoriesList";
import ListingType from "@/components/ListingType";
import sidenav from "@/components/sidenav"


@Component({
  categories: {
    ListingType,
    CategoriesList,
    sidenav
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

  closeModal() {
    this.$modal.hide('sidebar')
  }

  openSidebarMenu() {
    this.$modal.show('sidebar')
  }
}
</script>

<style scoped lang="scss">
  .mobile-bottom-navbar {
    position: fixed;
    bottom: 12px;
    left: 12px;
    box-sizing: border-box;
    right: 12px;
    height: 60px;
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
</style>
