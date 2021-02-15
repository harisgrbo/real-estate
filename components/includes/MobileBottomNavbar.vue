<template>
  <div class="mobile-bottom-navbar">
<!--      <font-awesome-icon v-for="button in buttons" :icon="button.icon" @action="button.action"></font-awesome-icon>-->
    <button @click="openSidebarMenu">test</button>
      <client-only>
<!--        <modal name="type" :adaptive="true" height="100%">-->
<!--          <ListingType @selected-type="handleSelectedType" @close="$modal.hide('type')"></ListingType>-->
<!--        </modal>-->
        <modal name="sidebar" :adaptive="true" height="100%">
          sidebar
        </modal>
      </client-only>
  </div>
</template>
b
<script>
import { Component, Vue} from "nuxt-property-decorator";
import CategoriesList from "@/components/CategoriesList";
import ListingType from "@/components/ListingType";

@Component({
  components: {
    ListingType,
    CategoriesList
  }
})

export default class MobileBottomNavbar extends Vue {
  /*buttons = [
    {
      icon: 'th-large',
      // action: this.openCategoriesModal()
    },
    {
      icon: 'envelope',
      action: this.$router.push('/poruke')
    },
    {
      icon: 'plus',
      action: this.$router.push('/objava')
    },
    {
      icon: 'user',
      action: this.$router.push('/users/' + this.$auth.user.id)
    },
    {
      icon: 'bars',
      // action: this.openSidebarMenu()
    },
  ]*/

  openSidebarMenu() {
    this.$modal.show('sidebar')
  }

  // openCategoriesModal() {
  //   let self = this;
  //   this.$modal.show(
  //     {
  //       render(h) {
  //
  //         return h( CategoriesList, {
  //           props: {
  //           },
  //           on: {
  //             selectedCat(e) {
  //               self.selectedCategory = e;
  //               self.closeModal();
  //             },
  //             close() {
  //               // close event needs to be echoed
  //               self.closeModal();
  //             }
  //           }
  //         });
  //       }
  //     },
  //     {
  //     },
  //     {
  //       'selected-category': this.handleSelectedCategory,
  //       adaptive: true,
  //       height: "100%",
  //     }
  //   );
  // }
}
</script>

<style scoped lang="scss">
  .mobile-bottom-navbar {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: white;
    z-index: 5;
    padding: 0 24px;
    box-shadow: rgb(0 0 0 / 8%) 12px -1px 12px;

    svg {
      font-size: 20px;
      color: #dcdcdc;

      &.fa-plus {
        color: #D63946;
      }
    }
  }
</style>
