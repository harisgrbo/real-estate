<template>
  <div class="user-profile">
    <div class="avatar">
      <div>
        <div class="avatar-wrapper">
          <img src="/avatar.jpg" alt="" @click="$router.push('/users/' + user.id)">
          <div class="user-info">
            <p>{{ user.name }}</p>
            <span>{{ user.user_type }}</span>
            <div class="stats">
              <ul>
                <li>
                  Artikala
                  <b>50</b>
                </li>
                <li>
                  Pratilaca
                  <b>500</b>
                </li>
                <li>
                  Ocjena
                  <b>8.9</b>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <span @click="showMoreInfo = !showMoreInfo" class="more-info">
        Vise informacija
        <i class="material-icons" :class="showMoreInfo ? 'rotate' : ''">keyboard_arrow_down</i>
      </span>
      <transition name="slide">
        <div v-show="showMoreInfo" class="more-info-dropdown">
          <ul>
            <li>Adresa: Alojza Benca 2</li>
            <li>Sarajevo</li>
          </ul>
        </div>
      </transition>
    </div>
    <div class="buttons">
      <button>Chat</button>
      <button @click.stop.preventt="toggleFollow">{{ alreadyFollowed? 'Otprati' : 'Zaprati' }}</button>
    </div>
  </div>
</template>

<script>
import { Component, Vue, Prop} from "nuxt-property-decorator";

@Component({
  components: {
  },
})

export default class UserProfile extends Vue {
  @Prop({}) user;
  @Prop({}) followed;

  showMoreInfo = false;
  alreadyFollowed = false;

  async created() {
    this.alreadyFollowed = this.followed;
    console.log(this.followed, 'jel followan')
  }

  toggleFollow() {
    if (this.alreadyFollowed === false) {
      try {
        this.$axios.post('/users/' + this.user.id + '/follow');

        this.alreadyFollowed = true;
      } catch (e) {
        console.log(e)
      }
    } else {
      try {
        this.$axios.delete('/users/' + this.user.id + '/follow');

        this.alreadyFollowed = false;
      } catch (e) {
        console.log(e)
      }
    }
  }

}

</script>

<style scoped lang="scss">
  .user-profile {
    display: flex;
    flex-direction: column;
    width: 350px;
    min-width: 350px;
    max-width: 350px;
    height: 100%;
    padding-right: 24px;
    margin-right: 24px;
    border-right: 1px solid #f1f1f1;
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
        border-radius: 10px;
        object-fit: cover;
      }
      .user-info {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: space-between;
        width: 100%;
        padding-left: 16px;
        p {
          font-size: 18px;
          font-weight: 500;
          margin-bottom: 0;
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
            background: #F3F5FB;
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
      width: 100%;
      margin-top: 16px;
      padding-top: 16px;
      border-top: 1px solid #ddd;
      button {
        height: 50px;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 1px solid #dddddd;
        flex: 1;
        background: transparent;
        border-radius: 8px;
        cursor: pointer;
        font-weight: 500;
        &:first-child {
          margin-right: 8px;
        }
        &:last-child {
          margin-left: 8px;
          background: #757B9A;
          color: #fff;
          border: none;
        }
      }
    }
  }

  .slide-enter-active {
    -moz-transition-duration: 0.3s;
    -webkit-transition-duration: 0.3s;
    -o-transition-duration: 0.3s;
    transition-duration: 0.3s;
    -moz-transition-timing-function: ease-in;
    -webkit-transition-timing-function: ease-in;
    -o-transition-timing-function: ease-in;
    transition-timing-function: ease-in;
  }

  .slide-leave-active {
    -moz-transition-duration: 0.3s;
    -webkit-transition-duration: 0.3s;
    -o-transition-duration: 0.3s;
    transition-duration: 0.3s;
    -moz-transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
    -webkit-transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
    -o-transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
    transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
  }

  .slide-enter-to, .slide-leave {
    max-height: 100px;
    overflow: hidden;
  }

  .slide-enter, .slide-leave-to {
    overflow: hidden;
    max-height: 0;
  }
</style>
