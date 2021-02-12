<template>
  <div class="listing-wrapper">
    <div class="listing-content">
      <div class="grid-container">
        <div class="img-counter">
          <font-awesome-icon icon="images">
          </font-awesome-icon>

          <p>12</p>
        </div>
        <div :class="'item' + img.id" v-for="img in images">
          <img :src="[ '/test' + img.name ]" alt="">
        </div>
      </div>
      <div class="listing-content-inner">
        <div class="listing-content-wrapper">
          <div class="article-title">
            <h2>{{ listing.title }}</h2>
            <div class="buttons">
              <button>
                <font-awesome-icon icon="heart"></font-awesome-icon>
                Snimi
              </button>
              <button>
                <font-awesome-icon icon="share-square"></font-awesome-icon>
                Podijeli
              </button>
            </div>
          </div>
          <div class="detailed-informations">
            <div class="detailed-info" v-if="listing.city">
              <span>Lokacija</span>
              <span>{{ listing.city.name }}</span>
            </div>
            <div class="detailed-info">
              <span>Vrsta oglasa</span>
              <span>{{ listing.listing_type.title }}</span>
            </div>
            <div class="detailed-info" v-if="listing.brandModel">
              <span>Brend</span>
              <span>{{ listing.brandModel }}</span>
            </div>
            <div class="detailed-info">
              <span>Datum objave</span>
              <span>{{ $moment(listing.createdAt).format('LL') }}</span>
            </div>
            <div class="detailed-info price">
              <font-awesome-icon icon="coins"></font-awesome-icon>
              <span>Cijena</span>
              <span>{{ listing.price }} KM</span>
            </div>
          </div>
          <div class="separator"></div>
          <h2 class="heading">Detaljne informacije</h2>
          <div class="detailed-informations">
            <div class="detailed-info" v-for="info in listing.attributes" v-if="info">
              <span>{{ info.name }}</span>
              <span>{{ info.value }}</span>
            </div>
          </div>
          <div class="separator"></div>
          <h2 class="heading">Detaljni opis</h2>
          <p class="description">{{ listing.description }}</p>
          <div class="separator"></div>
          <h2 class="heading">Pitanja</h2>
        </div>
        <div class="user-content-wrapper">
          <div class="user-info">
            <img src="/test/img1.jpg" alt="">
            <div class="username-wrapper">
              <div class="rating">
                <p>{{ listing.user.name }}</p>

                <div class="stars">
                  <font-awesome-icon icon="star"></font-awesome-icon>
                  4.9
                </div>
              </div>
              <div class="buttons">
                <span>Agencija</span>
                <span>Korisnik</span>
              </div>
            </div>
          </div>
          <div class="contact-buttons">
            <ActionButton @action="$modal.show('contact-user')" placeholder="Poruka"></ActionButton>
            <ActionButton :placeholder="isFollowed? 'Otprati' : 'Zaprati'" @action="handleFollow"></ActionButton>
          </div>
          <div class="separator"></div>
          <h2>Želite rezervisati odmah?</h2>
          <date-picker :show-date-picker="true" :displayClearButton="true"></date-picker>
        </div>
      </div>
      <modal name="contact-user" :adaptive="true" height="100%">
        <div class="modal-inner">
          <div class="modal-header">
            <h2>Poruka za {{ listing.user.name }}</h2>
            <i class="material-icons" @click="$modal.hide('contact-user')">close</i>
          </div>
          <div class="modal-content">
            <textarea v-model="message"></textarea>
            <action-button placeholder="Pošalji" @action="sendMessage" :loading="loading"></action-button>
          </div>
        </div>
      </modal>
    </div>
    <Snackbar></Snackbar>
  </div>
</template>

<script>
import { Component, Vue} from "nuxt-property-decorator";
import ActionButton from "@/components/actionButtons/ActionButton";
import Snackbar from "@/components/global/Snackbar";

@Component({
  components: {
    ActionButton,
    Snackbar
  },
  layout() { return "home" },
  async asyncData(ctx) {
    let listing = null;
    let user = null
    let isFollowed = false;
    let isSaved = false;

    try {
      let response = await ctx.app.$axios.get('/listings/' + ctx.params.id);
      listing = response.data.data;
      user = listing.user;
      isFollowed = response.data.meta.followed;
      isSaved = response.data.meta.saved;
    } catch(e) {
      console.log(e)
    }

    return {
      listing,
      user,
      isFollowed,
      isSaved
    }
  }
})
export default class Artikal extends Vue {
  types = {
    rent: 'Iznajmljivanje',
    sell: 'Prodaja',
    buy: 'Potraznja'
  }
  loading = false;
  message = '';
  isUserFollowed = false;
  images = [
    {
      name: '/img1.jpg',
      id: 1,
    },
    {
      name: '/img1.jpg',
      id: 2,
    },
    {
      name: '/img1.jpg',
      id: 3,
    },
    {
      name: '/img1.jpg',
      id: 4,
    },
    {
      name: '/img1.jpg',
      id: 5,
    },

  ]

  async handleFollow() {
    try {
      if(this.isFollowed) {
        await this.$axios.delete('/users/' + this.user.id + '/follow');

        this.$snackbar.show({
          text: "Uspjšsno ste otpratili " + this.user.name,
          timeout: 1000,
          type: "success"
        });

        this.isFollowed = false;
      } else {
        await this.$axios.post('/users/' + this.user.id + '/follow');

        this.$snackbar.show({
          text: "Uspješno ste zapratili " + this.user.name,
          timeout: 1000,
          type: "success"
        });

        this.isFollowed = true;
      }

    } catch(e)  {
      console.log(e)
    }

  }

  async sendMessage() {
    if(this.message.length === 0) {
      this.$snackbar.show({
        text: "Morate upisati poruku",
        timeout: 1000,
        type: "danger"
      });

      return
    }

    this.loading = true;
    try {
      let res = await this.$axios.post('/conversations', {
        users: [this.listing.user.id],
      })

      let conversation = res.data.data;

      await this.$axios.post('/conversations/' + conversation.id + '/messages', {
        content: this.message
      });

      this.$modal.hide('contact-user');

      this.loading = false;

      this.$snackbar.show({
        text: "Uspjšsno ste poslali poruku korisniku " + this.user.name,
        timeout: 1000,
        type: "success"
      });


      this.message = '';
    } catch(e) {
      console.log(e)
    }
  }

  created() {
    console.log(this.$auth)
    this.isUserFollowed = this.isFollowed;
    console.log(this.isFollowed, this.isSaved)
  }

  get listingType() {
    return this.types[this.listing.listing_type];
  }
}
</script>

<style scoped lang="scss">

.item1 {
  grid-area: main;

  img {
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
    min-height: 100%;
  }
}
.item2 {
  grid-area: small1;
  img {
    border-top-right-radius: 10px;
  }
}
.item3 {
  grid-area: small1;
  img {
    border-top-right-radius: 10px;
  }
}
.item4 {
  grid-area: small3;
  border-bottom-right-radius: 10px;
}

.item4 {
  grid-area: small4;
  img {
    border-bottom-right-radius: 10px;
  }
}

.grid-container {
  position: relative;
  display: grid;
  grid-template-areas:
  'main main main small1 small1'
  'main main main small3 small4';
  grid-gap: 12px;

  .img-counter {
    position: absolute;
    left: 12px !important;
    top: 12px;
    display: flex;
    flex-direction: row;
    width: fit-content;
    height: 30px;
    border-radius: 5px;
    padding: 0 12px;
    color: #fff;
    background: #000;
    align-items: center;

    svg {
      margin-right: 8px;
    }
  }

  img {
    object-fit: cover;
    max-width: 100%;
    min-height: 100%;
  }
}


.listing-wrapper {
  display: flex;
  flex-direction: row;
  height: calc(100vh - 100px);
  padding-top: 36px;
  .profile-content {
    width: 20%;
    height: fit-content;
  }
  .listing-content {
    width: 70%;
    margin: 0 auto;
    .listing-content-inner {
      display: flex;
      flex-direction: row;
      width: 100%;
      padding-top: 24px;
      position: relative;
      .user-content-wrapper {
        position: sticky;
        top: 84px;
        width: 33%;
        display: flex;
        flex-direction: column;
        margin-left: 24px;
        //border: 1px solid rgb(221, 221, 221);
        border-radius: 12px;
        padding: 24px;
        box-shadow: rgb(0 0 0 / 12%) 0px 6px 16px;
        height: fit-content;

        .user-info {
          display: flex;
          width: 100%;
          align-items: flex-start;
          justify-content: flex-start;
          box-sizing: border-box;
          height: fit-content;

          img {
            height: 56px;
            width: 56px;
            border-radius: 50%;
            object-fit: cover;
          }

          .username-wrapper {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            margin-left: 12px;
            height: 56px;
            width: 100%;

            .rating {
              display: flex;
              width: 100%;
              justify-content: space-between;

              p {
                font-size: 16px;
                font-weight: 500;
              }

              .stars {
                svg {
                  color: #1B1C32;
                }
              }
            }


            .buttons {
              display: flex;

              span {
                margin-right: 8px;
                display: flex;
                align-items: center;
                font-size: 14px;
                padding: 6px 12px;
                border-radius: 5px;
                background: none;
                border: none;
                cursor: pointer;
                background: rgb(247, 247, 247) !important;
              }
            }
          }
        }

        .contact-buttons {
          display: flex;
          flex-direction: row;
          margin-top: 12px;

          button {
            &:first-child {
              margin-right: 8px;
            }
            &:last-child {
              margin-left: 8px;
            }
          }
        }
      }
      .listing-content-wrapper {
        display: flex;
        flex-direction: column;
        width: 67%;
        padding-bottom: 32px;
      }
      .article-title {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        margin: 16px 0;
        > div {
          display: flex;
          align-items: center;
          justify-content: center;
        }

        h2 {
          color: rgb(34, 34, 34) !important;
          font-weight: 500 !important;
          font-size: 22px !important;
          line-height: 26px !important;
          margin-bottom: 0;
        }
      }
      h2 {
        color: inherit !important;
        font-size: 19px !important;
        font-weight: 500 !important;
        line-height: inherit !important;
        padding: 0px !important;
        margin-bottom: 32px;
      }
      h4 {
        font-size: 14px;
        color: #066450;
      }
      h2.heading {
        font-size: 20px;
        font-weight: 600;
        margin-bottom: 32px;
      }
      .detailed-informations {
        width: 100%;
        height: fit-content;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        .detailed-info {
          padding: 0 8px;
          border-radius: 5px;
          display: flex;
          flex-direction: column;
          background: rgb(241 239 239 / 53%);
          margin-right: 8px;
          margin-bottom: 8px;
          box-shadow: 0 2px 3px 0 rgba(0, 0, 0, 0.1);
          span {
            font-size: 14px;
            margin: 5px 0;
            &:last-child {
              font-weight: 500;
              font-size: 16px;
            }
          }
          &.exchange {
            font-weight: 600;
            font-size: 16px;
            display: flex;
            justify-content: center;
            span {
              margin: 0;
              display: flex;
              align-items: center;
            }
          }
          &.price {
            background: #151b38 !important;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            justify-self: flex-end;
            span {
              color: #fff;
              font-size: 16px;
              &:last-child {
                margin-left: 16px;
              }
            }
          }
          &.exchange-for {
            background: #757B9A !important;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            span {
              color: #fff;
              font-size: 16px;
              display: flex;
              align-items: center;
              i {
                margin-left: 8px;
              }
            }
          }
        }
      }
      .description {
        line-height: 21px;
        line-break: anywhere;
      }
      .buttons {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        width: fit-content;

        button {
          margin-right: 8px;
          display: flex;
          align-items: center;
          font-size: 14px;
          padding: 6px 12px;
          border-radius: 5px;
          background: none;
          border: none;
          cursor: pointer;
          svg {
            color: #444;
            height: 16px;
            margin-right: 8px;
          }
          &:last-child {
            margin-right: 0;
          }

          &:hover {
            background: rgb(247, 247, 247) !important;

            text-decoration: underline;
          }
        }
      }
      .save-article {
        font-weight: 500;
        margin-left: 16px;
        width: fit-content;
        display: flex;
        align-items: center;
        cursor: pointer;
        i {
          color: #757B9A;
          margin-left: 8px;
        }
      }
    }
  }
}

.modal-header {
  display: flex;
  align-items: center;
  height: 70px;
  border-bottom: 1px solid #dcdcdc;
  justify-content: space-between;

  h2 {
    font-size: 20px;
    font-weight: 500;
  }

  svg {
    cursor: pointer;
  }
}

.modal-inner {
  display: flex;
  flex-direction: column;
  padding: 0 24px;

  .modal-content {
    padding: 24px 0;
    textarea {
      height: 200px;
      width: 100%;
      border: 1px solid #ddd;
      border-radius: 8px;
      font-family: 'Montserrat', sans-serif;
      font-size: 16px;
      line-height: 21px;
      box-sizing: border-box;
      padding: 24px;

      &:focus {
        outline: none;

      }
    }
  }
}

.separator {
  border-top: 1px solid #ECECEC;
  margin: 32px 0;
  height: 1px;
  width: 100%;
}

::v-deep .user-profile {
  margin-right: 0;
}

.vhd__datepicker.vhd__datepicker--open {
  display: flex !important;
}

::v-deep .vhd__datepicker {
  position: absolute;
  top: 3em;
  z-index: 999;
  transition: all .2s ease-in-out;
  background-color: #fff;
  font-size: 16px;
  font-family: 'Montserrat', sans-serif !Important;
  line-height: .875em;
  overflow: hidden;
  right: 0 !important;
  border-radius: 10px !important;
}
</style>

