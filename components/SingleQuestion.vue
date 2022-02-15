<template>
<!--  <div class="single-question-wrapper" v-if="message">-->
<!--    <div class="user-info">-->
<!--      <div>-->
<!--        <img src="/avatar.jpg" alt="">-->
<!--        <p>{{ message.user.name }}</p>-->
<!--      </div>-->
<!--      <small>{{ $moment(message.created_at).format('DD.MM.YYYY') }} u {{$moment(message.created_at).format('HH:MM')  }}</small>-->
<!--    </div>-->
<!--    <div class="content">-->
<!--      <p>{{ message.question }}</p>-->
<!--    </div>-->
<!--    <div v-if="message.children.length">-->
<!--      <div class="box" v-for="reply in message.children" :key="reply.id">-->
<!--        <font-awesome-icon icon="reply"></font-awesome-icon>-->
<!--        <p>{{ reply.question }}</p>-->
<!--      </div>-->
<!--    </div>-->
<!--    <div v-if="owner" class="reply-wrapper">-->
<!--      <textarea v-model="replyTerm"></textarea>-->
<!--      <ActionButton placeholder="Odgovori na pitanje" @action="replyToQuestion"></ActionButton>-->
<!--    </div>-->
<!--  </div>-->
  <!--
    This example requires Tailwind CSS v2.0+

    This example requires some changes to your config:

    ```
    // tailwind.config.js
    const colors = require('tailwindcss/colors')

    module.exports = {
      // ...
      theme: {
        extend: {
          colors: {
            rose: colors.rose,
          }
        }
      }
    }
    ```
  -->
  <div class="flow-root">
    <ul class="bg-gray-50 p-4" v-if="message">
      <li>
        <div class="relative pb-8">
          <span class="absolute top-5 left-5 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true"></span>
          <div class="relative flex items-start space-x-3">
            <div class="relative">
              <img class="h-10 w-10 rounded-full bg-gray-400 flex items-center justify-center ring-8 ring-white" src="https://images.unsplash.com/photo-1520785643438-5bf77931f493?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80" alt="">

              <span class="absolute -bottom-0.5 -right-1 bg-white rounded-tl px-0.5 py-px">
              <!-- Heroicon name: solid/chat-alt -->
              <svg class="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fill-rule="evenodd" d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z" clip-rule="evenodd" />
              </svg>
            </span>
            </div>
            <div class="min-w-0 flex-1">
              <div>
                <div class="text-sm">
                  <div class="font-medium text-gray-900">{{ message.user.name }}</div>
                </div>
                <p class="mt-0.5 text-sm text-gray-500">
                  {{ $moment(message.created_at).format('DD.MM.YYYY') }} u {{$moment(message.created_at).format('HH:MM') }}
                </p>
              </div>
              <div class="mt-2 text-sm text-gray-700">
                <p>
                  {{ message.question }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </li>

      <li v-if="message.children && message.children.length" v-for="reply in message.children" :key="reply.id">
        <div class="relative pb-8">
          <span class="absolute top-5 left-5 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true"></span>
          <div class="relative flex items-start space-x-3">
            <div>
              <div class="relative px-1">
                <div class="h-8 w-8 bg-gray-100 rounded-full ring-8 ring-white flex items-center justify-center">
                  <!-- Heroicon name: solid/user-circle -->
                  <svg class="h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clip-rule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>
            <div class="min-w-0 flex-1 py-1.5">
              <div class="text-sm text-gray-500">
                <div class="font-medium text-gray-900" v-if="reply && reply.user"> {{ reply.user.name }}</div>
                je odgovorio
                <div class="font-medium text-gray-900">{{ reply.question }}</div>
              </div>
            </div>
          </div>
        </div>
      </li>
      <li v-if="owner">
        <div class="relative">
          <span class="absolute top-5 left-5 -ml-px h-3/4 w-0.5 bg-gray-200" aria-hidden="true"></span>
          <div class="relative flex items-start space-x-3">
            <div>
              <div class="relative px-1">
                <div class="h-8 w-8 bg-gray-100 rounded-full ring-8 ring-white flex items-center justify-center">
                  <!-- Heroicon name: solid/user-circle -->
                  <svg class="h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clip-rule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>
            <div class="min-w-0 flex-1 py-1.5">
              <div class="mt-1 sm:mt-0 sm:col-span-2">
                <textarea v-model="replyTerm" id="about" name="about" rows="3" class=" min-w-full shadow-sm block w-full focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border border-gray-300 rounded-md"></textarea>
                <p class="mt-2 text-sm text-gray-500">Odgovori na pitanje</p>
              </div>
              <ActionButton placeholder="Odgovori" class="max-w-sm" @action="replyToQuestion"></ActionButton>
            </div>
          </div>
        </div>
      </li>

    </ul>
  </div>
</template>

<script>
import { Component, Vue, Prop} from "nuxt-property-decorator";
import ActionButton from "@/components/actionButtons/ActionButton"

@Component({
  components: {
    ActionButton
  }
})

export default class SingleQuestion extends Vue {
  @Prop({}) message
  @Prop({}) owner

  replies = [];
  replyTerm = '';

  async replyToQuestion() {
    try {
      let res = await this.$axios.post('/listing_questions/' + this.message.id + '/replies', {
        question: this.replyTerm
      });
      this.message.children.push(res.data.data);
      this.replyTerm = ''
    } catch(e) {
      console.log(e)
    }
  }
}
</script>

<style scoped lang="scss">
  .single-question-wrapper {
    padding: 12px;
    display: flex;
    flex-direction: column;
    //box-shadow: rgb(0 0 0 / 12%) 0px 6px 16px;
    border: 1px solid #dcdcdc;
    height: fit-content;
    border-radius: 6px;
    margin-bottom: 24px;

    .user-info {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;

      > div {
        display: flex;
        flex-direction: row;
        align-items: center;
      }

      img {
        height: 40px;
        width: 40px;
        border-radius: 20px;
        object-fit: cover;
        margin-right: 24px;

        p {
          font-size: 16px;
          font-weight: 500;
        }
      }
    }

    .content {
      margin-top: 12px;
      padding-top: 12px;
      border-top: 1px solid #dcdcdc;

      p {
        padding: 12px 0;

      }
    }
  }

  .box {
    margin-top: 12px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    width: 100%;

    svg {
      width: 30px;
      color: #ddd;
      transform: rotate(180deg);
    }

    p {
      background: #f1f1f1;
      padding: 12px;
      border-radius: 5px;
      width: 100%;
    }
  }

  .reply-wrapper {
    display: flex;
    flex-direction: column;
    margin-top: 12px;
    padding-top: 12px;
    border-top: 1px solid #ddd;
    textarea {
      border: 1px solid #dcdcdc;
      border-radius: 5px;
      height: 50px;
      font-family: 'NunitoSans', sans-serif;;
      padding: 12px;
      box-sizing: border-box;
    }
  }

  .reply-icon {
    display: flex;
    flex-direction: row;

    svg {
      margin-right: 12px;
    }
  }
</style>
