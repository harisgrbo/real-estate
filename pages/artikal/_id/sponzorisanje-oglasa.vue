<template>
  <div class="advertising-options-wrapper">
    <div class="inner">
      <h2 class="test">
        Sponzorisanje oglasa
      </h2>
      <fieldset>
        <div class="mt-4 grid grid-cols-1 gap-y-6 sm:gap-x-4">
          <label class="relative bg-white border rounded-lg shadow-sm p-4 flex cursor-pointer focus:outline-none"
                 v-for="(option, index) in advertising_options" :class="[selectedAdvertisement === option.id? 'ring-2 ring-gray-900 border-transparent': 'border-gray-300']" :key="option.id" @change="selectAdvertisement(option)"
          >
            <input
              :id="option.id" :value="option.title" :checked="value && value.id === option.id"
              type="radio" name="project-type" value="Newsletter" class="sr-only" aria-labelledby="project-type-0-label" aria-describedby="project-type-0-description-0 project-type-0-description-1">
            <div class="flex-1 flex w-full">
              <div class="flex flex-col w-full">
                <div class="flex flex-row justify-between w-full justify-between items-center">
                  <div class="h-full flex flex-col justify-between">
                    <div class="flex flex-col ">
                             <span id="project-type-0-label" class="block text-lg mb-2 font-semibold text-gray-900">
                              {{ option.title }}
                              </span>
                      <h3 class="text-gray-600">Trajanje izdvojenog oglasa: {{ option.duration_in_days + ' dana' }}</h3>
                      <span id="project-type-0-description-0" class="block text-xl mt-2 font-medium text-gray-900">
                              {{ option.description }}
                            </span>
                    </div>
                    <span class="text-2xl font-semibold">
                            {{ option.price + ' KM' }}
                          </span>
                  </div>

                  <img class="preview-img" :src="'/' + option.title + '.png'" alt="">
                </div>
              </div>
            </div>
            <svg v-show="selectedAdvertisement === option.id" class="h-5 w-5 text-gray-900 absolute top-4 right-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
            </svg>
            <div class="absolute -inset-px rounded-lg border-2 pointer-events-none" aria-hidden="true"></div>
          </label>

        </div>
      </fieldset>


      <div class="advertising-calculator">
        <ActionButton @action="sponsor($route.params.id)" placeholder="Sponzoriši" :style-options="{ color: '#fff', height: '48px', marginTop: '36px' }"></ActionButton>
      </div>
    </div>
  </div>
</template>

<script>
import TextField from "@/components/inputs/TextField";
import ActionButton from "@/components/actionButtons/ActionButton"

import {Component, Vue} from "nuxt-property-decorator";

@Component({
  components: {
    TextField,
    ActionButton
  },
  layout: (ctx) => ctx.$device.isMobile ? 'mobile' : 'settings'
})
export default class Kredit extends Vue {
  advertising_options = []
  selectedAdvertisement = null;

  async created() {
    await this.fetchSponsorship();
  }

  selectAdvertisement(o) {
    this.selectedAdvertisement = o.id;
  }

  async fetchSponsorship() {
    try {
      let res = await this.$axios.get('/sponsorship/packages');
      this.advertising_options = res.data.data;

      if (this.advertising_options.length) {
        this.selectedAdvertisement = this.advertising_options[0].id;
      }
    } catch(e) {
      console.log(e)
    }
  }

  async sponsor(id) {

    try {
      await this.$axios.post(`/listings/${id}/sponsor`, {
        sponsorship_id: this.selectedAdvertisement
      })

      await this.$auth.fetchUser();

      this.$router.push('/artikal/' + this.$route.params.id)

      return true;
    } catch (e) {
      console.log(e);

      return false;
    }
  }
}
</script>

<style scoped lang="scss">
@mixin for-phone-only {
  @media (max-width: 599px) {
    @content;
  }
}
.advertising-options-wrapper {
  display: flex;
  justify-content: space-between;
  width: 1280px;
  margin: 0 auto;

  @include for-phone-only {
    width: 100%;
  }

  .inner {
    width: 60%;
    margin:  0 auto;
    padding-top: 60px;

    @include for-phone-only {
      width: 100%;
      padding-top: 0;
    }
  }

  @include for-phone-only {
    flex-direction: column;
  }

  .advertising-options {
    display: flex;
    flex-direction: column;
    height: fit-content;
    width: 100%;

    ul {
      display: flex;
      width: 100%;
      flex-direction: column;

      @include for-phone-only {
        display: grid;
        grid-template-columns: repeat(1, 1fr);
        grid-column-gap: 12px;
        grid-row-gap: 12px;
      }

      li {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-start;
        height: fit-content;
        cursor: pointer;
        padding: 12px;

        @include for-phone-only {
          height: fit-content;
          flex-direction: row;
        }

        img {
          margin-right: 24px;
          height: 30px;

          @include for-phone-only {
          }

          &.main {
            height: 100px;

            @include for-phone-only {
              height: 60px;
              margin-bottom: 0;
            }
          }

        }

        &.selected {
          background: #f1f1f1;
          border-radius: 6px;
        }
      }
    }

    svg {
      font-size: 56px;
      color: #dcdcdc;
    }
    .text-wrapper {
      display: flex;
      flex-direction: column;
      height: 100%;
      justify-content: flex-start;

      @include for-phone-only {
        align-items: center;
      }

      p {
        &:first-child {
          font-size: 18px;
          font-weight: 500;
          margin-bottom: 12px;

          @include for-phone-only {
            font-size: 16px;
            text-align: left;
            margin-bottom: 12px;
            margin-top: 12px;
            line-height: 20px;
            text-align: center;
          }
        }

        &:last-child {
          font-size: 15px;
          font-weight: 400;

          @include for-phone-only {
            font-size: 14px;
            line-height: 20px;
            text-align: center;

          }
        }
      }
    }
  }

  .advertising-calculator {
    display: flex;
    flex-direction: column;
    height: fit-content;

    @include for-phone-only {
      margin-left: 0;
    }

    .inner {
      border: 1px solid #dcdcdc;
      border-radius: 6px;
      padding: 12px;
      box-sizing: border-box;
    }

    ::v-deep button{
      width: 100%;
    }

  }
}

.preview-img {
  width: 90px;
  height: fit-content;
}

h2.test {
  font-size: 28px !important;
  font-weight: 600 !important;
  margin-bottom: 28px !important;
  color: #000;
  line-height: 32px;
}
</style>
