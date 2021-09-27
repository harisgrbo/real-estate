<template>
  <div class="listing-wrapper">
    <div class="listing-content">
      <div class="grid-container">
        <div class="img-counter">
          <font-awesome-icon icon="images">
          </font-awesome-icon>
          <p>{{ images.length }}</p>
        </div>
        <!--        <div class="img-counter show-more">-->
        <!--          <font-awesome-icon icon="images">-->
        <!--          </font-awesome-icon>-->
        <!--          <p>Pogledaj sve slike</p>-->
        <!--        </div>-->
        <div :class="'item' + img.id" v-for="(img, index) in images">
          <img :src="img.name" alt="" @click="openGallery(index)">
        </div>
        <client-only>
          <light-box
            ref="lightbox"
            :media="lightboxImages"
            :show-light-box="false"
            :show-thumbs="true"
            close-text="function() {
          return 'Zatvori galeriju'
          }"
          />
        </client-only>
      </div>
      <div class="listing-content-inner">
        <div class="listing-content-wrapper">
          <div class="article-title">
            <h2>{{ listing.title }}</h2>
            <div class="buttons" v-if="$auth.user">
              <button>
                <font-awesome-icon icon="minus-circle"></font-awesome-icon>
                Prijavi oglas
              </button>
              <button v-if="listing.user.id !== $auth.user.id" @click="toggleSaveListing" :class="listingSaved? 'listing-saved' : ''">
                <font-awesome-icon icon="heart"></font-awesome-icon>
                {{ listingSaved? 'Izbriši iz spašenih' : 'Spasi oglas'}}
              </button>
              <button v-if="listing.user.id !== $auth.user.id">
                <font-awesome-icon icon="share-square"></font-awesome-icon>
                Podijeli
              </button>
            </div>
          </div>
<!--          <div class="grid-layout">-->
<!--            <div class="detailed-info" v-if="listing.city">-->
<!--              <span>Lokacija</span>-->
<!--              <span>{{ listing.city.name }}</span>-->
<!--            </div>-->
<!--            <div class="detailed-info">-->
<!--              <span>Vrsta oglasa</span>-->
<!--              <span>{{ listing.listing_type.title }}</span>-->
<!--            </div>-->
<!--            <div class="detailed-info" v-if="listing.brandModel">-->
<!--              <span>Brend</span>-->
<!--              <span>{{ listing.brandModel }}</span>-->
<!--            </div>-->
<!--            <div class="detailed-info" v-if="listing.address">-->
<!--              <span>Adresa</span>-->
<!--              <span>{{ sliceAddress(listing.address) }}</span>-->
<!--            </div>-->
<!--            <div class="detailed-info">-->
<!--              <span>Datum objave</span>-->
<!--              <span>{{ $moment(listing.createdAt).format('LL') }}</span>-->
<!--            </div>-->
<!--            <div class="detailed-info price">-->
<!--              <div>-->
<!--                <font-awesome-icon icon="coins"></font-awesome-icon>-->
<!--                <span>Cijena</span>-->
<!--              </div>-->
<!--              <span>{{ listing.price }} KM</span>-->
<!--            </div>-->
<!--          </div>-->
<!--          <div class="separator"></div>-->
<!--          <h2 class="heading">Detaljne informacije</h2>-->
<!--          <div class="grid-layout">-->
<!--            <div class="detailed-info" v-for="info in listing.attributes" v-if="info">-->
<!--              <span>{{ info.name }}</span>-->
<!--              <span>{{ info.value }}</span>-->
<!--            </div>-->
<!--          </div>-->
<!--          <div class="separator"></div>-->
<!--          <h2 class="heading">U blizini nekretnine</h2>-->
<!--          <div class="grid-layout">-->
<!--            <div class="detailed-info" v-for="info in listing.attributes" v-if="info">-->
<!--              <span>{{ info.name }}</span>-->
<!--              <span>{{ attrTranslate(info.value) }}</span>-->
<!--            </div>-->
<!--          </div>-->
<!--          <div class="separator"></div>-->
<!--          <h2 class="heading">Detaljni opis</h2>-->
<!--          <p class="description">{{ listing.description }}</p>-->
<!--          <div class="separator"></div>-->
<!--          <h2 class="heading">Pitanja</h2>-->
<!--          <div v-if="listing.questions_disabled === true">-->
<!--            Korisniik je zabranio javna pitanja-->
<!--          </div>-->
          <SingleQuestion v-if="questions.length" v-for="question in questions" :message="question" :key="question.id" :owner="owner"></SingleQuestion>
          <div class="question-create" v-if="$auth.user && listing.questions_disabled === false && owner === false">
            <textarea v-model="questionTerm"></textarea>
            <ActionButton placeholder="Postavi pitanje" @action="askQuestion"></ActionButton>
          </div>
        </div>
        <div class="user-wrap">
          <UserProfile :user="listing.user" :followed="isFollowed" :is-rent="listing.is_rent" :type="listing.user.user_type"></UserProfile>
        </div>
      </div>
    </div>
    <Snackbar></Snackbar>
  </div>
</template>

<script>
import { Component, Vue} from "nuxt-property-decorator";
import ActionButton from "@/components/actionButtons/ActionButton";
import Snackbar from "@/components/global/Snackbar";
import UserProfile from "@/components/UserProfile"
import SingleQuestion from "@/components/SingleQuestion"

@Component({
  components: {
    ActionButton,
    Snackbar,
    UserProfile,
    SingleQuestion,
  },
  layout() { return "home" },
  async asyncData(ctx) {
    let listing = null;
    let user = null
    let isFollowed = false;
    let isSaved = false;
    let listingSaved = false;

    try {
      let response = await ctx.app.$axios.get('/listings/' + ctx.params.id);
      listing = response.data.data;
      listingSaved = response.data.meta.saved;
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
      isSaved,
      listingSaved
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
  questionTerm = '';
  questions = [];
  isUserFollowed = false;
  images = [
    {
      name: '/test/img1.jpg',
      id: 1,
    },
    {
      name: '/test/img1.jpg',
      id: 2,
    },
    {
      name: '/test/img1.jpg',
      id: 3,
    },
    {
      name: '/test/img1.jpg',
      id: 4,
    },
    {
      name: '/test/img1.jpg',
      id: 5,
    },

  ]

  get lightboxImages() {
    return this.images.map((item) => {
      return {
        src: item.name,
        thumb: item.name,
      };
    });
  }

  async getQuestions() {
    try {
      let res = await this.$axios.get('/listings/' + this.$route.params.id + '/questions');
      this.questions = res.data.data;

      console.log(this.questions)

    } catch(e) {
      console.log(e)
    }
  }

  sliceAddress(address) {
    return address.slice(0,20)
  }

  openGallery(index) {
    this.$refs.lightbox.showImage(index);
  }

  async toggleSaveListing() {
    try {
      if(!this.listingSaved) {
        await this.$axios.post('/listings/' + this.listing.id + '/save');

        this.$snackbar.show({
          text: "Uspješno ste snimili oglas " + this.listing.title,
          timeout: 1000,
          type: "success"
        });

        this.listingSaved = true;
      } else {
        await this.$axios.delete('/listings/' + this.listing.id + '/save');

        this.$snackbar.show({
          text: "Uspješno ste izbrisali oglas " + this.user.name + "iz spasenih",
          timeout: 1000,
          type: "success"
        });

        this.listingSaved = false;
      }

    } catch(e)  {
      console.log(e)
    }
  }


  async handleFollow() {
    try {
      if(this.isFollowed) {
        await this.$axios.delete('/users/' + this.user.id + '/follow');

        this.$snackbar.show({
          text: "uspješno ste otpratili " + this.user.name,
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

  get owner() {
    if(this.$auth.user) {
      return this.listing.user.id === this.$auth.user.id;
    }
  }

  attrTranslate(attr) {
    if(attr === true) {
      return 'Da'
    } else if(attr === false){
      return 'Ne'
    } else {
      return attr;
    }
  }

  async askQuestion() {
    try {
      let question = await this.$axios.post('/listings/' + this.$route.params.id + '/questions', {
        question: this.questionTerm
      });

      this.questionTerm = ''

      this.questions.push(question);
    } catch(e) {
      console.log(e)
    }
  }

  async created() {
    await this.getQuestions();
    console.log(this.listing.attributes)
    this.isUserFollowed = this.isFollowed;
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

    &.show-more {
      bottom: 23px;
      top: inherit;
      cursor: pointer;
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

          &:focus {
            outline: none;
          }

          &.listing-saved {
            svg {
              color: red;
            }
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
    font-size: 17px;
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
      font-family: 'Roboto', sans-serif;
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

.user-wrap {
  width: 33%;
  margin-left: 24px;
}

.detailed-info {
  padding: 0 8px;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  background: rgb(241 239 239 / 53%);
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
    padding: 0 12px;
    font-weight: 600;
    font-size: 18px !important;
    div {
      display: flex;
      align-items: center;
    }
    svg {
      color: #fff;
    }
    span {
      color: #fff;
      &:last-child {
        margin-left: 12px;
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
      display: flex;
      align-items: center;
      i {
        margin-left: 8px;
      }
    }
  }
}

.grid-layout {
  padding: 0;
  grid-template-columns: repeat( auto-fill, minmax(220px, 1fr) );
  grid-row-gap: 12px;
}

::v-deep img.vue-lb-modal-image {
  border-radius: 10px !important;
}

::v-deep .vue-lb-arrow {
  width: 60px !important;
  border-radius: 30px!important;
  border: 1px solid #fff!important;
  height: 60px!important;

  ::v-deep svg {
    color: #444!important;
  }
}

.question-create {
  display: flex;
  flex-direction: column;
  background: #f1f1f1;
  padding: 12px;
  border-radius: 10px;

  ::v-deep button {
    margin-top: 12px;
  }

  textarea {
    background: #fff;
    border: none;
    height: 100px;
    padding: 12px;
    border-radius: 5px;
    font-family: 'Roboto', sans-serif;
    &:focus {
      outline: none;
    }
  }
}
</style>

