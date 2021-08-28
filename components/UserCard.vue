<template>
  <div class="user-profile">
    <img src="/avatar.jpg" alt="" @click="$router.push('/users/' + 1)">
    <div class="avatar-wrapper w-full flex flex-col justify-between">
        <div class="user-info">
          <div>
            <div class="flex flex-row items-center justify-start mb-2 text-gray-600">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 text-red-600" viewBox="0 0 20 20" fill="currentColor">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <p class="rating">
                5.0 (43)

              </p>
            </div>
            <p class="font-medium">Prostor d.o.o</p>
            <p class="mt-2 text-sm font-normal">Sarajevo</p>
          </div>
        </div>
        <div class="flex flex-row items-center justify-between w-full">
          <div class="flex flex-row items-center">
            <button type="button" class="mr-2 inline-flex items-center px-3 py-2 border border-black  text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              07:00
            </button>
            <button type="button" class="inline-flex items-center px-3 py-2 border border-black  text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              16:00
            </button>
          </div>
          <button type="button" class="inline-flex items-center px-3 py-2 text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
          </button>
        </div>
      </div>
  </div>
</template>

<script>
import { Component, Vue, Prop} from "nuxt-property-decorator";
import ActionButton from "@/components/actionButtons/ActionButton"

@Component({
  components: {
    ActionButton
  },
  layout() { return "account" }
})

export default class UserCard extends Vue {
  @Prop({}) user;

  removeUser(e) {
    this.$emit('remove-user', e)
  }
}
</script>

<style scoped lang="scss">
.user-profile {
  display: flex;
  flex-direction: row;
  padding: 12px;
  //box-shadow: rgb(0 0 0 / 7%) 0px 0px 8px;
  border-radius: 10px;
  border: 1px solid #ebebeb;
  min-width: 486px;
  width: 486px;
  height: 200px;

  img {
    height: 100%;
    width: 123px;
    border-radius: 10px;
    object-fit: cover;
    margin-right: 24px;
  }
  .user-info {
    display: flex;
    flex-direction: row;

    .rating {
      font-size: 12px !important;
      padding-left: 4px;
    }

    > div {
      display: flex;
      flex-direction: column;

      p {
        font-size: 16px;

        &:first-child {
          margin-bottom: 12px;
          font-weight: 500;
        }
      }
    }
  }

  ul {
    width: 100%;
    padding: 12px;
    border: 1px solid #ebebeb;
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-sizing: border-box;
    margin-top: 12px;
    margin-bottom: 12px;

    li {
      font-size: 14px;
    }
  }

  .save {
    display: flex;
    align-items: center;
    font-size: 14px;
    padding: 6px 12px;
    border-radius: 5px;
    background: none;
    border: none;
    cursor: pointer;
    justify-content: flex-start;
    width: fit-content;

    svg {
      color: #444;
      height: 16px;
      margin-right: 8px;
    }

    &:hover {
      background: rgb(247, 247, 247) !important;
      text-decoration: underline;
    }
  }

}
</style>
