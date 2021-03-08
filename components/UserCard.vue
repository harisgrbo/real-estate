<template>
  <div class="user-profile">
      <div class="avatar-wrapper">
        <div class="user-info">
          <img src="/avatar.jpg" alt="" @click="$router.push('/users/' + 1)">
          <div>
            <p>Sigex doo</p>
            <p>Sarajevo, Dolac malta</p>
          </div>
        </div>
        <ul>
          <li>
            <b>50</b>
            Oglasa
          </li>
          <li>
            <b>8.9</b>
            Ocjena
          </li>
          <li>
            <b>102</b>
            Pratilaca
          </li>
        </ul>
      </div>
    <div class="buttons">
      <button class="save">
        <font-awesome-icon icon="heart"></font-awesome-icon>
        Zaprati agenciju
      </button>
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
  flex-direction: column;
  padding: 12px;
  box-shadow: rgb(0 0 0 / 12%) 0px 6px 16px;
  border-radius: 10px;

  .user-info {
    display: flex;
    flex-direction: row;

    img {
      height: 80px;
      width: 80px;
      border-radius: 10px;
      object-fit: cover;
      margin-right: 24px;
    }

    > div {
      display: flex;
      flex-direction: column;

      p {
        font-size: 16px;

        &:first-child {
          margin-bottom: 12px;
          font-weight: 600;
        }
      }
    }
  }

  ul {
    width: 100%;
    padding: 12px;
    background: #f1f1f1;
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
