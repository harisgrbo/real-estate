<template>
  <ul class="border-b border-gray-200 divide-y divide-gray-200 py-4">
    <li v-for="(conversation, index) in conversations"
        @click="setSelectedConversation(conversation, index)"
        :class="[ (conversation.id === (value ? value.id: null)) ? 'active' : '']"
        class="relative bg-white py-5 px-6 hover:bg-gray-50 focus-within:ring-2 focus-within:ring-inset focus-within:ring-blue-600">
      <img src="/noimage.jpeg" alt="">
      <div class="flex flex-col w-full">
        <div class="flex justify-between w-full space-x-3">
          <div class="min-w-0 flex-1">
            <a href="#" class="block focus:outline-none">
              <span class="absolute inset-0" aria-hidden="true"></span>
              <p class="text-sm font-semibold text-gray-900 truncate"><p class="name">{{ others(conversation).map(item => item.name).join(',') }}</p></p>
            </a>
          </div>
          <time datetime="2021-01-27T16:35" class="flex-shrink-0 whitespace-nowrap text-sm text-gray-500">{{ $moment(conversation.last_message.created_at).format("DD.MM.YYYY") }}</time>
        </div>
        <div class="mt-1">
          <p class="line-clamp-2 text-sm text-gray-600">
            {{ conversation.last_message.content }}
          </p>
          <div class="unread" v-if="conversation.unread !== 0"><b>{{ conversation.unread }}</b> nove poruke</div>
        </div>
      </div>
    </li>
  </ul>
</template>

<script>
import { Component, Vue, Prop} from "nuxt-property-decorator";

@Component({
  components: {
  },
  layout() { return "home" }
})

export default class ConversationList extends Vue {
  @Prop({ type: Array }) conversations;
  @Prop() value;

  others(conversation) {
    return conversation.users.filter( item => item.id !== this.$auth.user.id);
  }

  setSelectedConversation(c, index) {
    c.index = index;
    this.$emit('input', c);
  }
}
</script>

<style scoped lang="scss">
.conversation-list-wrapper {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: calc(100vh - 378px);
  overflow-y: scroll;

  .single-conversation {
    width: 100%;
    padding: 16px 12px;
    display: flex;
    flex-direction: row;
    box-sizing: border-box;
    border-bottom: 1px solid #f7f7f7;
    cursor: pointer;

    &.active {
      background: #f7f7f7;
      border-radius: 10px;

      .username p {
        font-weight: 600;
      }
    }

    img {
      height: 60px;
      width: 60px;
      border-radius: 30px;
      object-fit: cover;
    }

    &__inner {
      display: flex;
      flex-direction: column;
      margin-left: 12px;
      justify-content: space-between;
      width: 100%;

      .type {
        font-weight: 600 !important;
        font-size: 12px;
      }

      .inner-wrap {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        width: 100%;

        b {
          font-weight: 500;
          font-size: 13px;
        }
      }

      p {
        line-height: 18px;
        font-size: 14px;
      }

      .username {
        display: flex;
        flex-direction: row;
        align-items: center;

        p {
          font-weight: 500;
          font-size: 16px;
        }

        span {
          height: 8px;
          width: 8px;
          border-radius: 4px;
          background: green;
          margin-right: 12px;
        }
      }
    }
  }
}

.unread {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-top: 4px;
  font-size: 13px;
  font-weight: 500;
  b {
    background: #D63946;
    min-height: 16px;
    width: 16px;
    box-sizing: border-box;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    font-size: 13px;
    color: #fff;
    margin-right: 4px;
  }
}

li {
  display: flex;
  flex-direction: row;
  padding: 12px 0;
  width: 100%;
  img {
    height: 50px;
    width: 50px;
    border-radius: 25px;
    margin-right: 12px;
  }
  &:hover {
    border-radius: 7px;
    box-shadow: rgba(0, 0, 0, 0.07) 0px 2px 2px !important;
  }

  p.name {
    font-weight: 600;
    color: #000;
  }
}

time {
  font-size: 12px;
  font-weight: 500;
  color: #0B8489;
}

::v-deep .vm--modal {
  padding-bottom: 0 !important
}
</style>
