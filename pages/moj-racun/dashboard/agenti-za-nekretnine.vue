<template>
  <div class="account-wrapper mx-auto w-full">
    <div class="content">
      <div class="grid grid-cols-12 gap-6 mt-5">
        <div class="intro-y col-span-12 flex flex-wrap sm:flex-nowrap items-center mt-2">
          <button class="btn text-white bg-gray-800 shadow-md mr-2">Dodaj novog agenta</button>
        </div>
        <!-- BEGIN: Users Layout -->
        <div class="intro-y col-span-12 md:col-span-6 lg:col-span-4" v-for="i in 10">
          <div class="box">
            <div class="flex items-start px-5 pt-5">
              <div class="w-full flex flex-col lg:flex-row items-center">
                <div class="w-16 h-16 image-fit">
                  <img alt="Icewall Tailwind HTML Admin Template" class="rounded-full" src="/profile-14.jpg">
                </div>
                <div class="lg:ml-4 text-center lg:text-left mt-3 lg:mt-0">
                  <a href="" class="font-medium">Leonardo DiCaprio</a>
                  <div class="text-gray-600 text-xs mt-0.5">Agent</div>
                </div>
              </div>
              <div class="absolute right-0 top-0 mr-5 mt-3 dropdown">
                <a class="dropdown-toggle w-5 h-5 block" href="javascript:;" aria-expanded="false"> <i data-feather="more-horizontal" class="w-5 h-5 text-gray-600 dark:text-gray-300"></i> </a>
                <div class="dropdown-menu w-40">
                  <div class="dropdown-menu__content box dark:bg-dark-1 p-2">
                    <a href="" class="flex items-center block p-2 transition duration-300 ease-in-out bg-white dark:bg-dark-1 hover:bg-gray-200 dark:hover:bg-dark-2 rounded-md"> <i data-feather="edit-2" class="w-4 h-4 mr-2"></i> Edit </a>
                    <a href="" class="flex items-center block p-2 transition duration-300 ease-in-out bg-white dark:bg-dark-1 hover:bg-gray-200 dark:hover:bg-dark-2 rounded-md"> <i data-feather="trash" class="w-4 h-4 mr-2"></i> Delete </a>
                  </div>
                </div>
              </div>
            </div>
            <div class="text-center lg:text-left p-5">
              <div>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem </div>
              <div class="flex items-center justify-center lg:justify-start text-gray-600 mt-5">leonardodicaprio@left4code.com </div>
            </div>
            <div class="text-center lg:text-right p-5 border-t border-gray-200 dark:border-dark-5">
              <button class="btn text-white bg-gray-800 py-1 px-2 mr-2">Poruka</button>
              <button class="btn btn-outline-secondary py-1 px-2">Profil</button>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import { Component, Vue} from "nuxt-property-decorator";

@Component({
  components: {
  },
  layout: (ctx) => ctx.$device.isMobile ? 'mobile' : 'article',
})
export default class mojiOglasi extends Vue {

}
</script>

<style scoped lang="scss">
@mixin for-phone-only {
  @media (max-width: 599px) {
    @content;
  }
}

.account-wrapper {
}
.content {
  display: flex;
  flex-direction: column;

  @include for-phone-only {
    padding: 0;
  }
  .grid-cards {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-column-gap: 24px;
    grid-row-gap: 24px;
    padding: 0;

    @include for-phone-only {
      grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
      grid-column-gap: 24px;
      grid-row-gap: 24px;
    }
    ::v-deep a {
      width: 100%;
    }


    ::v-deep img {
      width: 100%;
    }
  }
}

h1 {
  color: rgb(72, 72, 72) !important;
}

.no-image {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  img {
    height: 400px;

    @include for-phone-only {
      height: 250px;
    }
  }

  p {
    font-size: 20px;
    font-weight: 500;
    margin-top: 24px;
  }
}

.box {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border: 1px solid #f1f1f1;
  box-shadow: none;
}

</style>
