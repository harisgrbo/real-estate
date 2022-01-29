<template>
  <div class="user-profile">
    <div class="avatar">
      <div>
        <div class="avatar-wrapper">
          <img src="/avatar.jpg" alt="">
          <div class="user-info">
            <h2>SIGEX d.o.o</h2>
            <p class="location">Sarajevo - Centar</p>
            <p class="counter">56 nekretnina</p>
          </div>
        </div>
      </div>
    </div>
    <div class="buttons">
      <ActionButton placeholder="Zaprati" @action="removeUser"></ActionButton>
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

export default class AgencyCard extends Vue {
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
  box-shadow: rgba(0, 0, 0, 0.16) 0px 2px 8px !important;
  border-radius: 6px;
  width: 100%;
  box-sizing: border-box;
  .avatar {
    display: flex;
    flex-direction: column;
    > div {
      display: flex;
      justify-content: space-between;
    }
    .avatar-wrapper {
      display: flex;
      flex-direction: row;
      width: 100%;
      align-items: center;
      justify-content: center;
    }
    .more-info {
      font-size: 13px;
      font-weight: 500;
      color: #8d8d8d;
      margin-top: 16px;
      cursor: pointer;
      display: flex;
      align-items: center;
      i {
        transition: 0.3s all ease;
        &.rotate {
          transform: rotate(180deg);
        }
      }
    }
    .more-info-dropdown {
      padding: 16px 0 0 0;
      width: 100%;
      ul {
        display: flex;
        flex-direction: column;
        width: 100%;
        li {
          font-size: 13px;
          font-weight: 500;
          color: #8d8d8d;
          background: #F3F5FB;
          border-radius: 5px;
          padding: 8px 8px;
          margin-bottom: 8px;
        }
      }
    }
    img {
      width: 100px;
      height: 100px;
      border-radius: 50px;
      object-fit: cover;
    }
    .user-info {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: space-between;
      width: 100%;
      padding-left: 24px;
      height: 100%;

      h2 {
        font-size: 18px;
        font-weight: 500;
        margin-bottom: 16px !important;
      }
      p {
        font-size: 16px;
        font-weight: 500;
        margin-bottom: 12px;

        &:last-child {
          padding: 8px 12px;
          background: #f1f1f1;
          border-radius: 5px;
          font-size: 14px;
        }
      }
      span {
        font-size: 13px;
        font-weight: 500;
        color: #8d8d8d;
        background: #F3F5FB;
        border-radius: 5px;
        padding: 3px 8px;
      }
      .stats {
        display: flex;
        width: 100%;
        ul {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          background: #f1f1f1;
          border-radius: 5px;
          padding: 8px;
          li {
            display: flex;
            flex: 1;
            align-items: center;
            flex-direction: column;
            justify-content: center;
            font-size: 12px;
            font-weight: 400;
            color: #8d8d8d;
            b {
              margin-top: 5px;
              font-size: 16px;
              color: #434343;
            }
          }
        }
      }
    }
  }

  .buttons {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    margin-top: 16px;
    padding-top: 16px;
    border-top: 1px solid #ddd;
    align-items: center;

    svg {
      font-size: 22px;
      color: #dcdcdc;
    }

    button {
      height: 50px;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 1px solid #dddddd;
      width: fit-content;
      background: transparent;
      border-radius: 8px;
      cursor: pointer;
      font-weight: 500;
      margin: 0;
      color: #444;
    }
  }
}
</style>
