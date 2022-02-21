<template>
  <div class="user-profile-wrapper mx-auto pt-0">
    <div class="agency-banner" v-if="user.banner_url !== null" :style="{ backgroundImage: 'url(' + user.banner_url + ')', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }">.</div>
    <div class="agency-banner" v-else :style="{ backgroundImage: 'url(' + '/nobanner.png' + ')', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }">.</div>
    <div class="flex flex-col custom-width mx-auto">
      <div class="user-content-wrapper mt-8" >
        <div class="flex flex-row items-center justify-start mobile-spans">
          <div class="first-col">
            <aside class="w-96 bg-white overflow-y-auto">
              <div class="col-span-1 flex flex-col text-center bg-white rounded-lg divide-y divide-gray-200">
                <div class="flex-1 flex flex-row justify-start user-inner">
                  <img class="w-32 h-32 flex-shrink-0 bg-black rounded-full" :src="[ user.avatar_url !== null ? user.avatar_url  : '/noimage.jpeg']" alt="">
                  <div class="ml-6">
                    <h3 class="text-gray-900 text-xl font-semibold">{{ user.name }}</h3>
                    <dd class="mt-1 flex flex-row items-center justify-start text-sm">
                      <span :class="['p-1 mr-2 rounded-full', user.online ? 'bg-green-500' : 'bg-gray-300']"></span>
                      {{ user.online ? 'Online' : 'Offline' }}
                    </dd>
                    <dl class="mt-1 flex-grow flex flex-col justify-between items-start">
                      <dd class="mt-2">
                        <span class="px-2 py-1 text-green-800 text-xs font-semibold bg-green-100 rounded-full">{{ user_type(user.user_type) }}</span>
                      </dd>
                    </dl>
                    <div class="flex flex-row items-center justify-start w-full verified">
                      <img :src="user.verified ? '/001-completed.png' : '/002-error.png'" alt="">{{ user.verified ? 'Verifikovan email' : 'Nije verifikovan email' }}
                    </div>
                  </div>
                </div>
              </div>
            </aside>

          </div>
          <div class="second-col">
            <div class="grid grid-cols-1 gap-4 text-sm font-medium text-gray-300 infos">
              <div v-if="user.email !== null" class="flex flex-row items-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                {{ user.email }}</div>
              <div v-if="user.address !== null" class="flex flex-row items-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {{ user.address }}</div>
              <div v-if="user.location !== null" class="flex flex-row items-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {{ user.location }}</div>
              <div v-if="user.web !== null" class="flex flex-row items-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
                {{ user.web }}</div>
              <div v-if="user.phone_number !== null" class="flex flex-row items-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                {{ user.phone_number }}</div>
            </div>
          </div>
        </div>
        <div class="third-col">
          <div v-if="isMe" class="w-full flex flex-row items-center justify-start mt-4 buttons-user">
            <ActionButton type="submit" @action="$router.push('/moj-racun/uredi-profil')" placeholder="Uredi profil" :style-options="{ border: '2px solid #1F2937', background: '#fff', color: '#1F2937', borderRadius: '6px', height: '42px', marginRight: '12px', fontSize: '13px' }" :loading="false"></ActionButton>
            <ActionButton type="submit" @action="$modal.show('about-agency')" placeholder="O nama" :style-options="{ border: '2px solid #1F2937', color: '#1F2937', background: '#fff', borderRadius: '6px', height: '42px', marginRight: '12px', fontSize: '13px' }" :loading="false"></ActionButton>
          </div>
          <div v-else class="w-full flex flex-row items-center justify-start mt-4">
            <div class="w-full flex flex-row items-center justify-start buttons-user" v-if="$auth.user">
              <ActionButton type="submit" @action="$modal.show('contact-user')" placeholder="Poruka" :style-options="{ border: '2px solid #1F2937', color: '#1F2937', background: '#fff', borderRadius: '6px', height: '42px', marginRight: '12px', fontSize: '13px' }" :loading="false"></ActionButton>
              <ActionButton type="submit" @action="toggleFollow()" :placeholder="isFollowed? 'Otprati' : 'Zaprati'" :style-options="{ border: '2px solid #1F2937', color: '#1F2937', background: '#fff', borderRadius: '6px', height: '42px', marginRight: '12px', fontSize: '13px' }" :loading="false"></ActionButton>
              <ActionButton type="submit" @action="$modal.show('about-agency')" placeholder="O nama" :style-options="{ border: '2px solid #1F2937', color: '#1F2937', background: '#fff', borderRadius: '6px', height: '42px', marginRight: '12px', fontSize: '13px' }" :loading="false"></ActionButton>
<!--              <div class="rounded-md bg-blue-50 p-3" v-if="!$device.isMobile">-->
<!--                <div class="flex">-->
<!--                  <div class="flex-shrink-0">-->
<!--                    &lt;!&ndash; Heroicon name: solid/information-circle &ndash;&gt;-->
<!--                    <svg class="h-5 w-5 text-blue-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">-->
<!--                      <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />-->
<!--                    </svg>-->
<!--                  </div>-->
<!--                  <div class="ml-3 flex-1 md:flex md:justify-between">-->
<!--                    <p class="text-sm text-blue-700">-->
<!--                      Korisnik odgovara u roku od 10 sati-->
<!--                    </p>-->
<!--                  </div>-->
<!--                </div>-->
<!--              </div>-->
            </div>
          </div>
        </div>
      </div>
      <div class="mb-6">
        <dl class="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-4">
          <div class="px-4 py-5 bg-white shadow rounded-lg overflow-hidden sm:p-6">
            <dt class="text-md pb-1 font-medium text-gray-500 truncate">
              Ukupno oglasa
            </dt>
            <dd class="mt-1 text-3xl font-semibold text-gray-900">
              {{ meta.active_count + meta.completed_count }}
            </dd>
          </div>

          <div class="px-4 py-5 bg-white shadow rounded-lg overflow-hidden sm:p-6">
            <dt class="text-md pb-1 font-medium text-gray-500 truncate">
              Aktivni oglasi
            </dt>
            <dd class="mt-1 text-3xl font-semibold text-gray-900">
              {{ meta.active_count }}
            </dd>
          </div>

          <div class="px-4 py-5 bg-white shadow rounded-lg overflow-hidden sm:p-6">
            <dt class="text-md pb-1 font-medium text-gray-500 truncate">
              Završeni oglasi
            </dt>
            <dd class="mt-1 text-3xl font-semibold text-gray-900">
              {{ meta.completed_count }}
            </dd>
          </div>

          <div class="px-4 py-5 bg-white shadow rounded-lg overflow-hidden sm:p-6">
            <dt class="text-md pb-1 font-medium text-gray-500 truncate">
              Dojmovi
            </dt>
            <dd class="mt-1 text-3xl font-semibold text-gray-900">
              {{ meta.rating_count }}
            </dd>
          </div>
        </dl>
      </div>
      <div class="content-wrapper mt-4">
        <ul class="main-tabs">
          <li v-for="(tab, index) in tabs" :key="index" @click="selected_tab = index" :class="[ selected_tab === index ? 'active' : '' ]">{{ tab }}</li>
        </ul>
        <div v-if="selected_tab === 0">
          <div class="flex flex-row items-center justify-between mb-8 user-options">
            <ul class="category-list w-full">
              <li :class="['group inline-flex items-center justify-center text-sm font-medium text-gray-700 hover:text-gray-900 border border-gray-200', cat.id === selectedCategoryId ? 'selected-cat': '']" v-for="cat in categories" :key="cat.id" @click="handleSelectedCategory(cat)">{{ cat.title }}</li>
            </ul>
          </div>
          <div>
            <div class="filters-agency">
              <div class="content pb-20">
                <h3 v-if="listingsLoaded" class="mb-4">Aktivni oglasi ({{ listingActiveMeta.total }})</h3>
                <div v-if="listingsLoaded">
                  <div v-if="listings.length" class="grid-layout">
                    <ListingCard v-for="listing in listings" :listing="listing" :key="listing.id"></ListingCard>
                  </div>
                  <NotFound v-else src="/realestatenoresults.svg" :text="$auth.user && $auth.user.id === user.id? 'Nemate aktivnih oglasa' : 'Pravno lice nema aktivnih oglasa'"></NotFound>
                  <Pagination
                    v-if="listings.length && listingActiveMeta.total > 15"
                    ref="pagination"
                    :current-page="currentPage"
                    :total-pages="listingActiveMeta.last_page"
                    @page-change="pageChangeHandler" />
                </div>
                <div v-else class="grid-layout">
                  <Skeleton :height="$device.isMobile ? '337px' : '372px'" :width="$device.isMobile ? '165px' : '236px'" v-for="(i, index) in 20" :key="index"></Skeleton>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-if="selected_tab === 1">
          <div>
            <div class="filters-agency">
              <div class="content pb-20">
                <h3 class="mb-4">Završeni oglasi ({{ completed_listings.length }})</h3>
                <div v-if="completedListingsLoaded">
                  <div v-if="completed_listings.length" class="grid-layout">
                    <ListingCard v-for="listing in completed_listings" :listing="listing" :key="listing.id"></ListingCard>
                  </div>
                  <NotFound v-else src="/realestatenoresults.svg" :text="$auth.user && $auth.user.id === user.id? 'Nemate završenih oglasa' : 'Pravno lice nema završenih oglasa'"></NotFound>
                  <Pagination
                    v-if="completed_listings.length && completedListingsMeta.total > 15"
                    ref="pagination"
                    :current-page="currentCompletedPage"
                    :total-pages="completedListingsMeta.last_page"
                    @page-change="completedPageChangeHandler" />
                </div>
                <div v-else class="grid-layout">
                  <Skeleton :height="$device.isMobile ? '337px' : '372px'" :width="$device.isMobile ? '165px' : '236px'" v-for="(i, index) in 20" :key="index"></Skeleton>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-if="selected_tab === 2">
          <div class="pb-12">
            <!-- This example requires Tailwind CSS v2.0+ -->
            <div v-if="reviews.length" class="bg-white">
              <div class="lg:max-w-7xl lg:grid lg:grid-cols-12 lg:gap-x-8">
                <div class="lg:col-span-4">
                  <div class="flex flex-col review-wrapper">
                    <h2 class="text-2xl font-extrabold tracking-tight text-gray-900">Dojmovi korisnika ({{ meta.rating_count }})</h2>

                    <div class="mt-3 flex items-center">
                      <div>
                        <div class="flex items-center">
                          <!--
                            Heroicon name: solid/star

                            Active: "text-yellow-400", Default: "text-gray-300"
                          -->
                          <star-rating star-size="20" :increment="0.5" inline="true" :read-only="true" v-model="meta.rating"></star-rating>
                          <p class="text-sm ml-2 font-semibold">ukupna ocjena</p>
                        </div>
                        <p class="sr-only">4 out of 5 stars</p>
                      </div>
                    </div>

                    <div class="mt-6">
                      <h3 class="sr-only">Review data</h3>

                      <dl class="space-y-3">
                        <div class="flex items-center text-sm" v-for="(count, key, index) in reviews_meta.counts">
                          <dt class="flex-1 flex items-center">
                            <p class="w-3 font-medium text-gray-900">{{ index + 1 }}</p>
                            <div aria-hidden="true" class="ml-1 flex-1 flex items-center">
                              <!-- Heroicon name: solid/star -->
                              <svg class="flex-shrink-0 h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>

                              <div class="ml-3 relative flex-1">
                                <div class="h-3 bg-gray-100 border border-gray-200 rounded-full"></div>

                                <div :style="`width: calc(${count.percentage} * 100%)`" class="absolute inset-y-0 bg-yellow-400 border border-yellow-400 rounded-full"></div>
                              </div>
                            </div>
                          </dt>
                          <dd class="ml-3 w-10 text-right tabular-nums text-sm text-gray-900">{{ count.percentage * 100 + '%'}}</dd>
                        </div>
                      </dl>
                    </div>

                    <div class="mt-10">
                      <h3 class="text-lg font-medium text-gray-900">Podijeli svoje iskustvo</h3>
                      <p class="mt-1 text-sm text-gray-600">Ako ste koristili usluge {{ this.user.name }} agencije, podijelite svoje iskustvo sa ostalim korisnicima</p>

                      <ActionButton v-if="$auth.user" @action="$modal.show('leave-review')" placeholder="Ostavi dojam" :style-options="{ border: '2px solid #1F2937', background: '#fff', color: '#1F2937', borderRadius: '6px', height: '42px', marginRight: '12px', fontSize: '13px', marginTop: '24px' }" :loading="false"></ActionButton>
                    </div>
                  </div>
                </div>

                <div class="mt-16 lg:mt-0 lg:col-start-6 lg:col-span-7">
                  <div class="flow-root">
                    <div class="-my-12 divide-y divide-gray-200">
                      <div v-for="review in reviews" :key="review.id" class="py-12 review-user">
                        <div class="flex items-center">
                          <img :src="user.avatar_url !== null ? user.avatar_url : '/noimage.jpeg'" alt="Emily Selman." class="h-12 w-12 rounded-full">
                          <div class="ml-4">
                            <h4 class="text-sm font-semibold text-gray-900">{{ review.user.name }} dana {{ $moment(review.created_at).format("DD.MM.YYYY") }}</h4>
                            <div class="mt-1 flex items-center">
                              <!--
                                Heroicon name: solid/star

                                Active: "text-yellow-400", Default: "text-gray-300"
                              -->
                              <svg v-for="i in review.rating" class="text-yellow-400 h-5 w-5 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>

                            </div>
                          </div>
                        </div>

                        <div class="mt-4 space-y-6 text-base italic text-gray-600">
                          <p>{{ review.review }}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div v-else>
              <div class="mt-10">
                <h3 class="text-lg font-medium text-gray-900">Podijeli svoje iskustvo</h3>
                <p class="mt-1 text-sm text-gray-600">Ako ste koristili usluge {{ this.user.name }} agencije, podijelite svoje iskustvo sa ostalim korisnicima</p>

                <ActionButton v-if="$auth.user" @action="$modal.show('leave-review')" placeholder="Ostavi dojam" :style-options="{ border: '2px solid #1F2937', background: '#fff', color: '#1F2937', borderRadius: '6px', height: '42px', marginRight: '12px', fontSize: '13px', marginTop: '24px' }" :loading="false"></ActionButton>
              </div>
              <NotFound src="/review.svg" :text="$auth.user && $auth.user.id === user.id? 'Nemate dojmova' : 'Pravno lice nema dojmova'"></NotFound>
            </div>
          </div>
        </div>
      </div>
    </div>
    <modal @before-open="beforeOpen" @before-close="beforeClose" name="contact-user" :adaptive="true" height="100%">
      <div class="modal-inner">
        <div class="modal-header">
          <h2>Poruka za {{ user.name }}</h2>
          <i class="material-icons" @click="$modal.hide('contact-user')">close</i>
        </div>
        <div class="modal-content">
          <textarea v-model="message"></textarea>
          <action-button class="mt-4" :style-options="{ width: '100%'}" placeholder="Pošalji" @action="sendMessage" :loading="loading"></action-button>
        </div>
      </div>
    </modal>
    <modal @before-open="beforeOpen" @before-close="beforeClose" name="leave-review" :adaptive="true" height="100%">
      <div class="modal-inner">
        <div class="modal-header">
          <h2>Dojam za {{ user.name }}</h2>
          <i class="material-icons" @click="$modal.hide('leave-review')">close</i>
        </div>
        <div class="modal-content review">
          <textarea v-model="review_message"></textarea>
          <div class="flex flex-row items-center py-4">
            <span class="font-semibold mr-4">Ocjena za {{ user.name }}</span>
            <star-rating star-size="20" animate="true" inline="true" v-model="review_rating"></star-rating>
          </div>
          <action-button class="mt-4" :style-options="{ width: '100%'}" placeholder="Ostavi dojam" @action="postReview" :loading="loading"></action-button>
        </div>
      </div>
    </modal>
    <modal @before-open="beforeOpen" @before-close="beforeClose" name="about-agency" :adaptive="true" height="100%">
      <div class="modal-inner">
        <div class="modal-header">
          <h2>O nama</h2>
          <i class="material-icons" @click="$modal.hide('about-agency')">close</i>
        </div>
        <div class="modal-content">
          <p>{{ user.description }}</p>
        </div>
      </div>
    </modal>
  </div>
</template>

<script>
import { Component, Vue, Prop} from "nuxt-property-decorator";
import ListingCard from "@/components/listingCard/ListingCard";
import PublishMap from "@/components/publish/PublishMap";
import UserMedals from "@/components/UserMedals"
import TextField from "@/components/inputs/TextField";
import Pagination from "@/components/pagination";
import ActionButton from "../../components/actionButtons/ActionButton";
import NotFound from "../../components/global/NotFound";
import Skeleton from "../../components/skeleton";

@Component({
  components: {Skeleton, NotFound, ActionButton, ListingCard, PublishMap, UserMedals, TextField, Pagination},
  layout: (ctx) => ctx.$device.isMobile ? 'mobile' : 'article',
  watchQuery: true,
  async asyncData(ctx) {
    let categories = [];
    let user = {};
    let meta = {};

    try {
      let response = await ctx.app.$axios.get(`/users/${ctx.route.params.id}/categories`);

      categories = response.data.data;
    } catch (e) {
      console.log(e)
    }

    try {
      let response = await ctx.app.$axios.get('/users/' + ctx.route.params.id)
      user = response.data.data;
      meta = response.data.meta;
    } catch(e) {
      console.log(e)
    }

    return {
      categories,
      user,
      meta
    }
  }
})
export default class Agencies extends Vue {
  loadingListings = false;
  isFollowed = ''
  reviews_meta = null;
  review_rating = 0;
  review_message = '';
  listingsLoaded = false;
  completedListingsMeta = null
  completedListingsLoaded = false;
  reviews = [];
  message = '';
  loading = false;
  followLoading = false;
  listings = []
  completed_listings = []
  finishedListings = []
  feedback = []
  currentPage = 1;
  currentCompletedPage = 1;
  city = {
    location: {
      lat: parseFloat("43.8575641"),
      lng: parseFloat("18.4149369")
    }
  }
  listingActiveMeta = null
  selected_tab = 0;
  tabs = [
    'Aktivni oglasi',
    'Završeni',
    'Dojmovi'
  ]
  selectedCategoryId = null;

  async pageChangeHandler(selectedPage) {
    this.currentPage = selectedPage;
    await this.fetchUserListings(this.$route.params.id, 0, this.currentPage);
  }

  async completedPageChangeHandler(selectedPage) {
    this.currentCompletedPage = selectedPage;
    await this.fetchUserFinishedListings(this.$route.params.id, this.currentCompletedPage);
  }

  user_type(t) {
    if(t === 'agency') {
      return 'Agencija'
    } else if(t === 'user') {
      return 'korisnik'
    } else if(t === 'agent'){
      return 'Agent'
    } else if(t === 'investor') {
      return 'Investitor'
    } else {
      return 'Admin'
    }
  }

  async fetchReviews() {
    try {
      let res = await this.$axios.get('/users/' + this.$route.params.id + '/user_reviews');

      this.reviews = res.data.data;
      this.reviews_meta = res.data.meta;
    } catch(e) {
      console.log(e)
    }
  }

  async postReview() {
    try {
      let res = await this.$axios.post('/users/' + this.$route.params.id + '/user_reviews', {
        rating: this.review_rating,
        review: this.review_message
      })

      this.$toast.open({
        message: "Uspješno ste ostavili dojam agenciji" + this.user.name,
        type: 'success',
        duration: 5000
      });

      this.review_rating = 0;
      this.review_message = ''
      this.$modal.hide('leave-review');

      await this.fetchReviews();
      this.currentTab = 2;
    } catch(e) {
      console.log(e)
    }
  }

  async handleSelectedCategory(cat) {
    if (this.selectedCategoryId === cat.id) {
      this.selectedCategoryId = null;
    } else {
      this.selectedCategoryId = cat.id;
    }

    await this.fetchUserListings(this.user.id, this.selectedCategoryId, 1);
  }

  async mounted() {
    await this.fetchReviews();
  }

  beforeOpen() {
    document.body.style.overflow = 'hidden';
  }

  beforeClose() {
    document.body.style.overflow = 'auto';
  }

  async created() {

    await this.fetchUserListings(this.$route.params.id, null, 1);
    await this.fetchUserFinishedListings(this.$route.params.id, 1)
    this.isFollowed = this.meta.followed;

    console.log(this.listingActiveMeta, 'meta')
  }

  get isMe() {
    if(this.$auth.user) {
      return this.$auth.user.id === this.user.id;
    }
  }

  async sendMessage() {
    if(this.message.length === 0) {
      this.$toast.open({
        message: "Morate upisati poruku",
        type: 'warning',
        duration: 5000
      });

      return
    }

    this.loading = true;
    try {
      let res = await this.$axios.post('/conversations', {
        users: [this.user.id],
      })

      let conversation = res.data.data;

      await this.$axios.post('/conversations/' + conversation.id + '/messages', {
        content: this.message,
        key: Math.floor(Math.random() * 100).toString()
      });

      this.$modal.hide('contact-user');

      this.loading = false;

      this.$toast.open({
        message: "Uspješno ste poslali poruku korisniku " + this.user.name,
        type: 'success',
        duration: 5000
      });


      this.message = '';
    } catch(e) {
      console.log(e)
    }
  }

  toggleFollow() {
    if (this.isFollowed === false) {
      try {
        this.$axios.post('/users/' + this.user.id + '/follow');

        this.$toast.open({
          message: "Uspješno ste zapratili korisnika" + this.user.name,
          type: 'success',
          duration: 5000
        });

        this.isFollowed = true;
      } catch (e) {
        console.log(e)
      }
    } else {
      try {
        this.$axios.delete('/users/' + this.user.id + '/follow');

        this.$toast.open({
          message: "Uspješno ste otpratili korisnika" + this.user.name,
          type: 'success',
          duration: 5000
        });

        this.isFollowed = false;
      } catch (e) {
        console.log(e)
      }
    }
  }

  async fetchUserListings(id, catId, p = 1) {
    this.listingsLoaded = false;

    try {
      let url = '/users/' + id + `/listings/active?page=${p}`;

      if (catId) {
        url += '&category_id=' + catId;
      }

      let response = await this.$axios.get(url)
      this.listings = response.data.data;
      this.listingActiveMeta = response.data.meta;

      this.listingsLoaded = true;
    } catch(e) {
      console.log(e)
    }
  }

  async fetchUserFinishedListings(id, p = 1) {
    this.completedListingsLoaded = false;

    try {
      let url = '/users/' + id + `/listings/completed?page=${p}`;

      let response = await this.$axios.get(url)
      this.completed_listings = response.data.data;
      this.completedListingsMeta = response.data.meta;

      this.completedListingsLoaded = true;
    } catch(e) {
      console.log(e)
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

.user-profile-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  box-sizing: border-box;
  margin: 0 auto;

  @include for-phone-only {
    padding: 16px;
    padding-bottom: 120px;
  }

  .user-content-wrapper {
    display: flex;
    flex-direction: column;
    //border: 1px solid rgb(221, 221, 221);
    border-radius: 12px;
    justify-content: space-between;
    //box-shadow: rgb(0 0 0 / 12%) 0px 6px 16px;
    height: fit-content;
    width: 100%;
    box-sizing: border-box;
    padding-bottom: 24px;
    border-bottom: 1px solid #f9f9f9;

    @include for-phone-only {
      display: flex;
      flex-direction: column;
      background: #fff;
      padding: 0px;
    }

    .user-inner {
      @include for-phone-only {
        display: flex;
      }

      img {
        height: 120px;
        width: 120px;
        min-width: 120px;

        @include for-phone-only {
          height: 80px;
          width: 80px;
          min-width: 80px;
        }
      }
    }

    .first-col {
      display: flex;

      @include for-phone-only {
        padding-bottom: 24px;
        width: 100%;
        margin-bottom: 12px;
        border-bottom: 1px solid #f1f1f1;
        min-height: 120px;
      }
    }
    .second-col {
      display: flex;
      padding: 0 36px;
      box-sizing: border-box;
      flex-direction: column;
      justify-content: space-between;
      min-height: 120px;

      @include for-phone-only {
        padding: 0;
        margin-top: 12px;
        margin-bottom: 20px;
        width: 100%;
        min-height: fit-content;
      }

      .infos {
        color: #575757;
        font-size: 16px;
        font-weight: 400;
        @include for-phone-only {
          grid-template-columns: repeat(1, 1fr);
        }
      }

      div {
        font-size: 14px;
        font-weight: 300;
      }

      h3 {
        font-size: 18px;
        font-weight: 400;
      }

      .user-info {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: flex-start;
        box-sizing: border-box;
        height: fit-content;


        .username-wrapper {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          margin-left: 12px;
          height: 56px;

          .rating {
            display: flex;
            justify-content: space-between;

            p {
              font-size: 16px;
              font-weight: 500;
              cursor: pointer;
            }

          }


          .buttons {
            display: flex;

            @include for-phone-only {
              width: 100%;
              max-width: 100% !important;
              min-width: 100%;
            }

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


    }
    .third-col {
      display: flex;
      flex: 2;
      justify-content: flex-end;
      align-items: flex-end;
      flex-direction: column;

      @include for-phone-only {
        justify-content: center;
        width: 100%;
        align-items: center;

      }

      h2 {
        font-size: 18px;
        font-weight: 500;
      }

    }


  }

  .content-wrapper {
    display: flex;
    flex-direction: column;
    width: 100%;
    box-sizing: border-box;

    .grid-layout {
      grid-template-columns: repeat(5, 1fr);
      grid-column-gap: 24px;
      grid-row-gap: 24px;
      padding: 0;

      @include for-phone-only {
        grid-template-columns: repeat(2, 1fr);
        grid-column-gap: 12px;
        grid-row: 16px;
      }
    }

    .user-options {
      @include for-phone-only {
        display: flex;
        flex-direction: row;
        width: 100%;
        overflow-y: scroll;
      }
    }
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
  justify-content: center;
  width: fit-content;
  margin-top: 8px;

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

::v-deep #map {
  margin-top: 0;
  height: 270px;
}

.separator {
  margin: 16px 0;
  border-bottom: 1px solid #f7f7f7;
}

.no-image {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  img {
    height: 400px;
  }

  p {
    font-size: 20px;
    font-weight: 500;
    margin-top: 24px;
  }
}

.filters-agency {
  display: flex;
  flex-direction: column;

  .filters-agency-list {
    width: 300px;
    min-width: 300px;
    padding-right: 24px;
    box-sizing: border-box;
    margin-right: 24px;
    border-right: 1px solid #dcdcdc;
  }

  .content {
    width: 100%;

    @include for-phone-only {
      padding: 0;
    }
  }
}

.grid-layout {
  ::v-deep a {
    width: 100%;
    min-width: 100%;
  }

  ::v-deep .listing-card-wrapper {
    width: 100%;
    max-width: 100%;
  }
}

.category-list {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;

  li {
    height: 44px;
    padding: 0 10px;
    background: #fff;
    margin-right: 12px;
    border-radius: 6px;
    font-size: 14px;
    font-weight: 600;
    min-width: fit-content;
    cursor: pointer;
    color: #717171;

    &.selected-cat {
      background: #fff;
      border: 2px solid #000;
      color: #000;
      font-weight: 600;
    }

    &:hover {
      background: #f9f9f9;
    }
  }
}

.buttons {
  max-width: fit-content;

  @include for-phone-only {
    max-width: 100%;
  }
}

.about-us-btn button {
  margin-top: 12px;
  display: flex;
  flex: 1;
  width: 100%;
  background: #f9f9f9;
  align-items: center;
  justify-content: center;
}

.agency-banner {
  height: 400px;

  @include for-phone-only {
    height: 150px;
  }
}

.on-mobile {
  @include for-phone-only {
    width: 100%;
    justify-content: space-between;

    button {
      display: flex;
      flex: 1;
      width: 100%;
      background: #f9f9f9;
    }
  }
}

.buttons-user {
  @include for-phone-only {
    width: 100%;
  }
  ::v-deep button {
    width: fit-content;
    margin-right: 8px;
    max-width: fit-content;
    border-radius: 4px !important;

    @include for-phone-only {
      width: 100% !important;
      max-width: 100% !important;
    }

    &:last-child {
      margin-right: 0;
    }

    @include for-phone-only {
      width: auto;
      min-width: auto;
      max-width: 100%
    }
  }
}

.mobile-spans {
  @include for-phone-only {
    flex-direction: column;
  }
}

aside {
  @include for-phone-only {
    width: 100%;
  }
}

textarea {
  height: 300px;
  font-weight: 500;
  color: #000;
  font-size: 18px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background: #fff;
  min-height: 400px !important;
  padding: 12px;

  &:focus {
    outline: none;
  }
}

.verified {
  font-size: 13px;
  font-weight: 300;
  margin-top: 12px;
  img {
    height: 20px !important;
    width: auto !important;
    min-width: auto !important;
    margin-right: 8px;
  }
}

.review ::v-deep textarea {
  min-height: 140px !important;
  height: 140px;
}

.review-wrapper {
  position: sticky;
  top: 120px;

  @include for-phone-only {
    position: static;
    top: 0;
  }
}

.review-user {
  border-bottom: 1px solid #f1f1f1;
}
</style>
