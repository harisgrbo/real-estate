<template>
  <div class="single-question-wrapper">
    <div class="user-info">
      <div>
        <img src="/avatar.jpg" alt="">
        <p>{{ message.user.name }}</p>
      </div>
      <small>{{ message.created_at }}</small>
    </div>
    <div class="content">
      <p>{{ message.question }}</p>
    </div>
    <div v-if="replies.length">
      <div class="box" v-for="reply in replies">
        <p>{{ reply.question }}</p>
      </div>
    </div>
    <div v-if="owner" class="reply-wrapper">
      <textarea v-model="replyTerm"></textarea>
      <ActionButton placeholder="Odgovori na pitanje" @action="replyToQuestion"></ActionButton>
    </div>
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
      this.replies.push(res.data.data)
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
    box-shadow: rgb(0 0 0 / 12%) 0px 6px 16px;
    height: fit-content;
    border-radius: 10px;
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
      margin-bottom: 12px;
    }
  }

  .box {
    background: #f1f1f1;
    padding: 12px;
    border-radius: 5px;
    margin-top: 12px;
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
      font-family: 'Montserrat', sans-serif;
      padding: 12px;
      box-sizing: border-box;
    }
  }
</style>
