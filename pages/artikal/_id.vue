<template>
  <div class="listing-wrapper mx-auto w-full lg:w-1280 xl:w-1280 up:w-1280" v-if="!error">
    <div v-if="$device.isMobile" class="mobile-topbar">
      <button @click="$router.go(-1)" type="button" class="mr-4 inline-flex items-center p-1 border border-transparent rounded-full shadow-sm text-black bg-gray-100 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
        <!-- Heroicon name: solid/plus -->
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 17l-5-5m0 0l5-5m-5 5h12" />
        </svg>
      </button>
      <div class="flex flex-row items-center">
        <button @click="shareListing()" type="button" class="inline-flex items-center p-1 border border-transparent rounded-full shadow-sm text-black bg-gray-100 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          <!-- Heroicon name: solid/plus -->
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </button>
        <button v-if="$auth.user && $auth.user.id !== listing.user.id" @click="toggleSaveListing()" type="button" class="ml-4 inline-flex items-center p-1 border border-transparent rounded-full shadow-sm text-black bg-gray-100 hover:bg-gray-300">
          <!-- Heroicon name: solid/plus -->
          <svg xmlns="http://www.w3.org/2000/svg" :fill="[ listingSaved ? '#1F2937' : 'none']" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </button>
      </div>
    </div>
    <div class="listing-content mt-0 lg:mt-12 xl:mt-12 up:mt-12 max-w-7xl mx-auto w-full">
      <div class="listing-content-inner">
        <div class="listing-content-wrapper relative flex flex-row">
          <div class="flex flex-col w-full relative">
            <div class="w-full" v-if="!$device.isMobile">
              <h2 v-if="listing">{{ listing.title }}</h2>
              <div class="w-full flex flex-row justify-between items-center my-4">
                <div class="flex flex-row items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <p class="min-w-min text-md text-gray-700 font-normal underline">{{ listing.address }}</p>
                </div>
                <div class="flex flex-row items-center min-w-min" v-if="!$device.isMobile">
                  <button v-if="$auth.user && $auth.user.id !== listing.user.id" @click="toggleSaveListing()" type="button" class="flex items-center">
                    <!-- Heroicon name: solid/plus -->
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" :fill="[ listingSaved ? '#1F2937' : 'none']" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                    <span class="save-listing">{{ listingSaved ? 'Izbriši iz spašenih' : 'Spasi oglas' }}</span>
                  </button>
                </div>
              </div>
            </div>

            <div class="mobile-images">
              <client-only v-if="images.length >= 1">
                <swiper class="swiper" :options="swiperOptionCard" @click.native.stop>
                  <swiper-slide v-for="(img, index) in images" :key="index">
                    <img class="swiper-lazy" :alt="listing.title + 'stan mojkvadrat stanovi sarajevo'" :src="img.url" alt="" @click="openGallery(index)">
                    <div class="swiper-lazy-preloader swiper-lazy-preloader-white"></div>
                  </swiper-slide>
                  <div
                    class="swiper-button-prev swiper-button-white"
                    slot="button-prev"
                  ></div>
                  <div
                    class="swiper-button-next swiper-button-white"
                    slot="button-next"
                  ></div>
                  <div class="swiper-pagination" slot="pagination"></div>
                </swiper>
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
              <div v-else class="no-image-grid">
                <img src="/noimage.jpeg" alt="">
              </div>
            </div>
            <div class="mb-6 px-5 lg:px-0 xl:px-0 up:px-0 mobile-content">
              <div v-if="reviewCount" class="flex flex-row items-center justify-start mt-5">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="yellow" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
                <p class="pl-2 font-semibold">
                  {{ rating }}
                </p>
                <a href="#dojmovi" class="pl-2 underline text-sm font-medium">
                  ({{ reviewCount }} dojmova)
                </a>
              </div>
            </div>
            <div v-if="$device.isMobile" class="mx-5 flex flex-col">
              <h2 v-if="listing" class="mb-4">{{ listing.title }}</h2>
              <div class="flex flex-row items-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <p class="text-md text-gray-700 font-normal underline mobile-address">{{ listing.address }}</p>
              </div>
              <div class="addresses">
                <div
                  v-for="(attr, index) in specialAttributes"
                  :key="index"
                  class="flex flex-row items-center mr-2"
                >
                  <img v-if="attr.name === 'Broj kreveta'" src="/double-bed.png" alt="">
                  <img v-if="attr.name === 'Broj soba'" src="/door.svg" alt="">
                  <img v-if="attr.name === 'Broj gostiju'" src="/guests.png" alt="">
                  <img v-if="attr.name === 'Kvadratura'" src="/m2.png" alt="">
                  {{ attr.value }}
                </div>
              </div>
            </div>
            <div class="user-wrap relative z-10" v-if="$device.isMobile">
              <UserProfile :bookings="bookings" :perguest="listing.per_guest" :auth-user="authUser" :vat="listing.vat_included" :price="listing.price" :id="listing.id" :user="listing.user" :followed="isFollowed" :is-rent="listing.is_rent" :is-booking="listing.is_booking" :type="listing.user.user_type" @send-booking-request="sendBookingRequest()" @finish-listing="handleFinishListing"></UserProfile>
            </div>
            <div class="flex flex-row items-center justify-start mb-6" v-if="!$device.isMobile">
              <p class="text-lg font-semibold">{{ numberWithCommas(listing.price) + ' KM' }}</p>
              <p class="text-black font-medium text-lg ml-2" v-if="listing.is_booking">/ noć {{ listing.per_guest ? ' po osobi' : '' }}</p>
            </div>
            <ul role="list" class="main-info px-5 lg:px-0 xl:px-0 up:px-0">
              <li>
                <p class="text-md text-black font-normal">{{ listing.city.name }}</p>
              </li>
              <li>
                <p class="text-md text-black font-normal">{{ listing.listing_type.title}}</p>
              </li>
              <li v-if="!$device.isMobile">
                <p class="text-md text-black font-normal">{{ listing.address }}</p>
              </li>
              <li>
                <p class="text-md text-black font-normal">{{ $moment(listing.published_at).format('LL') }}</p>
              </li>
              <li>
                <p class="text-md text-black font-normal">{{ 'Pregleda: ' + view_count }}</p>
              </li>
              <li v-if="listing.city.country !== null">
                <p class="text-md text-black font-normal">{{ listing.city.country.name }}</p>
              </li>
            </ul>
            <div class="addresses" v-if="!$device.isMobile">
              <div
                v-for="(attr, index) in specialAttributes"
                :key="index"
                class="flex flex-row items-center mr-2"
              >
                <img v-if="attr.name === 'Broj kreveta'" src="/double-bed.png" alt="">
                <img v-if="attr.name === 'Broj soba'" src="/door.svg" alt="">
                <img v-if="attr.name === 'Broj gostiju'" src="/guests.png" alt="">
                <img v-if="attr.name === 'Kvadratura'" src="/m2.png" alt="">
                {{ attr.value }}
                <p v-if="attr.name === 'Kvadratura'">
                  m²
                </p>
              </div>
            </div>
            <div class="mt-4 mobile-places-btn">
              <ActionButton @action="$modal.show('map-modal')"  placeholder="Mapa" :style-options="{ width: 'auto', background: 'transparent', border: '2px solid #1F2937', color: '#1F2937' }" :loading="false" @acition="$modal.show('places')"></ActionButton>
              <ActionButton v-if="!listing.is_booking" @action="$modal.show('places')"  placeholder="U blizini" :style-options="{ width: 'auto', background: 'transparent', border: '2px solid #1F2937', color: '#1F2937' }" :loading="false" @acition="$modal.show('places')"></ActionButton>
              <ActionButton v-if="listing.is_booking" @action="$modal.show('places-poi')"  placeholder="Zanimljivosti" :style-options="{ width: 'auto', background: 'transparent', border: '2px solid #1F2937', color: '#1F2937' }" :loading="false" @acition="$modal.show('places')"></ActionButton>
            </div>
            <div class="separator"></div>
            <div class="px-5 lg:px-0 xl:px-0 up:px-0">
              <h3 class="text-2xl font-semibold text-gray-900">
                Opšte informacije
              </h3>
              <ul role="list" class="border-t border-b border-gray-200 py-6 mobile-grid">
                <li class="flow-root" v-for="info in normalAttributes" :key="info.id">
                  <div class="relative -m-2 p-2 flex items-center space-x-4">
                    <div>
                      <h3 class="text-md font-normal text-gray-900">
                        <div class="focus:outline-none">
                          <span aria-hidden="true"></span>
                          {{ info.name }}
                        </div>
                      </h3>
                      <p class="mt-1 text-lg text-black font-medium">{{ info.value }}</p>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
            <div v-if="RentSpecialAttributes.length && listing.listing_type.shortname !== 'sell'">
              <div class="separator"></div>
              <h3 class="text-2xl font-semibold text-gray-900 mx-5 mb-8 lg:mx-0 xl:mx-0 up:mx-0">
                Šta ovaj smještaj nudi
              </h3>
              <ul role="list" class="mt-3 mobile-grid ammenities">
                <li  v-for="(attr, index) in RentSpecialAttributes"
                     :key="index"
                     class="col-span-1 flex">
                  <img :src="'/' + attr.name + '.png'" alt="">
                  <div class="flex-1 flex items-center justify-between border-t border-r border-b border-gray-200 bg-white rounded-r-md truncate">
                    <div class="flex-1 px-4 py-2 text-sm truncate flex flex-row items-center justify-between">
                      <div class="text-gray-900 font-semibold hover:text-gray-700">{{ attr.name }}</div>
                      <p class="text-gray-500" v-if="typeof (attr.value) !== 'boolean'">{{ typeof (attr.value) === 'boolean' ? '' : attr.value }}</p>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
            <div class="mt-6 mx-5 lg:mx-0 xl:mx-0 up:mx-0" v-if="checkboxAttributes.length">
              <div class="separator"></div>
              <h3 class="text-2xl font-semibold text-gray-900">
                Nekretnina posjeduje
              </h3>
              <ul role="list" :class="['mt-6 border-t border-b border-gray-200 py-0 mobile-grid', checkboxAttributes.length > 10 ? 'compress' : '']">
                <li class="flow-root" v-for="(info, index) in checkboxAttributes" :key="index">
                  <div class="relative -m-2 p-2 flex items-center space-x-4 rounded-xl">

                    <div>
                      <h3 class="text-md font-normal text-gray-900">
                        <div class="focus:outline-none">
                          <span aria-hidden="true"></span>
                          {{ info.name }}
                        </div>
                      </h3>
                      <p class="mt-1 text-lg text-black font-medium">{{ attrTranslate(info.value) }}</p>
                    </div>
                  </div>
                </li>
              </ul>
              <span v-show="checkboxAttributes.length > 10" @click="$modal.show('detailed-attributes')" class="rounded-md show-more-btn no-padding border border-gray-800 py-4 flex flex-row items-center min-w-min justify-start text-md font-medium mt-4 hover:underline cursor-pointer">
              Prikaži više
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </span>
            </div>
            <div class="separator"></div>
            <client-only>
              <h3 class="text-2xl font-semibold text-gray-900 mb-6 lg:mx-0 xl:mx-0 up:mx-0 mx-5">Detaljni opis</h3>
              <p :class="['description mx-5 lg:mx-0 xl:mx-0 up:mx-0', descriptionRows > 200 ? 'minimize' : 'maximize']" id="opis" v-html="listing.description"></p>
              <span v-show="descriptionRows > 200" @click="$modal.show('detailed-desc')" class="py-4 rounded-md flex flex-row items-center show-more-btn min-w-min justify-start text-md font-medium mt-4 hover:underline cursor-pointer">
              Prikaži više
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </span>
            </client-only>
            <div class="separator" v-if="listing.video_url !== null"></div>
            <div v-if="listing_reviews.length" class="bg-white">
                <div>
                  <div v-for="review in listing_reviews" :key="review.id">
                    <div class="flex text-sm text-gray-500 space-x-4">
                      <div class="flex-none py-10">
                        <img src="https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80" alt="" class="w-10 h-10 bg-gray-100 rounded-full">
                      </div>
                      <div class="flex-1 py-10">
                        <h3 class="font-medium text-gray-900">{{ review.user ? review.user.name : 'Username' }}</h3>
                        <p><time>{{ $moment(review.created_at).format('DD.MM.YYYY') }}</time></p>
                        <div class="flex items-center mt-4">
                          <svg v-for="(i, index) in review.rating" :key="index" class="text-yellow-400 h-5 w-5 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        </div>
                        <div class="mt-4 prose prose-sm max-w-none text-black">
                          <p>{{ review.review }}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            <div class="w-full px-5 pb-6 lg:px-0 xl:px-0 up:px-0">
              <h3 class="text-xl font-medium text-gray-900 mb-6" v-if="listing.video_url !== null">Video</h3>
              <div v-if="listing.video_url !== null">
                <div v-html="listing.video_url"></div>
              </div>
            </div>
            <div v-if="$device.isMobile" class="book-article">
              <div class="flex flex-row items-center justify-star">
                <p class="text-lg font-semibold">{{ numberWithCommas(listing.price) + ' KM' }}</p>
                <p class="text-black font-medium text-lg ml-2" v-if="listing.is_booking">/ noć {{ listing.per_guest ? ' po osobi' : '' }}</p>
              </div>
              <ActionButton v-if="$auth.user && !authUser && listing.is_booking" placeholder="Rezerviši datum" :style-options="{ color: '#fff', background: '#1F2937 !important', height: '52px', fontSize: '13px', width: 'auto' }" :loading="false" @action="toggleBookingModal()"></ActionButton>
            </div>

          </div>
          <div class="user-wrap relative z-10" v-if="!$device.isMobile">
            <UserProfile :bookings="bookings" :perguest="listing.per_guest" :auth-user="authUser" :vat="listing.vat_included" :price="listing.price" :id="listing.id" :user="listing.user" :followed="isFollowed" :is-rent="listing.is_rent" :is-booking="listing.is_booking" :type="listing.user.user_type" @send-booking-request="sendBookingRequest" @finish-listing="handleFinishListing"></UserProfile>
          </div>
          <div v-if="(listing.is_rent || listing.is_booking) && $device.isMobile && $auth.user">
            <div class="separator" v-if="listing_reviews.length"></div>
            <h3 class="text-xl font-medium text-gray-900 mb-6 px-5 lg:px-0 xl:px-0 up:px-0" v-if="listing_reviews.length">Dojmovi</h3>
            <div v-if="listing_reviews.length" class="bg-white w-full px-5 lg:px-0 xl:px-0 up:px-0">
              <div>
                <div v-for="review in listing_reviews" :key="review.id">
                  <div class="flex text-sm text-gray-500 space-x-4">
                    <div class="flex-none py-10">
                      <img src="https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80" alt="" class="w-10 h-10 bg-gray-100 rounded-full">
                    </div>
                    <div class="flex-1 py-10">
                      <h3 class="font-medium text-gray-900">{{ review.user ? review.user.name : 'Username' }}</h3>
                      <p><time datetime="2021-07-16">{{ $moment(review.created_at).format('DD.MM.YYYY') }}</time></p>

                      <div class="flex items-center mt-4">
                        <!--
                          Heroicon name: solid/star

                          Active: "text-yellow-400", Default: "text-gray-300"
                        -->
                        <svg v-for="(i, index) in review.rating" :key="index" class="text-yellow-400 h-5 w-5 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>

                        <!-- Heroicon name: solid/star -->
                      </div>

                      <div class="mt-4 prose prose-sm max-w-none text-black">
                        <p>{{ review.review }}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <client-only>
          <modal @before-open="beforeOpen" @before-close="beforeClose" name="places" :adaptive="true" height="100%">
            <div class="modal-inner">
              <div class="modal-header">
                <h3>U blizini</h3>
                <i class="material-icons" @click.prevent="$modal.hide('places')">close</i>
              </div>
              <div class="modal-content places-modal">
                <div class="filters rounded-md">
                  <ul class="flex flex-row items-center justify-start">
                    <li v-for="(place, index) in places" :key="index" @click="selectPlace(place.results, index)" :class="[ 'cursor-pointer modal-place', index === x ? 'active-place-modal bg-white shadow-sm rounded-md' : '']">
                      <p>{{ translatePlaces(index) }}</p>
                    </li>
                  </ul>
                  <div class="mt-3">
                    <div class="places-grid" v-if="selectedPlace !== null">
                      <div v-for="(p, index) in selectedPlace" :key="index" class="flex flex-row items-center justify-start">
                        <img :src="p.icon" :alt="p.name" class="mr-2">
                        {{ p.name }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </modal>
        </client-only>
        <client-only>
          <modal @before-open="beforeOpen" @before-close="beforeClose" name="places-poi" :adaptive="true" height="100%">
            <div class="modal-inner">
              <div class="modal-header">
                <h3>Zanimljivosti u blizini nekretnine</h3>
                <i class="material-icons" @click.prevent="$modal.hide('places-poi')">close</i>
              </div>
              <div class="modal-content places-modal">
                <div class="filters rounded-md">
                  <div class="places-grid" v-if="selectedPlace !== null">
                    <div v-for="p in bookingPoi()" :key="p.id" class="flex flex-col items-start justify-start">
                      <div class="flex flex-row items-center">
                        <img :src="p.icon" :alt="p.name" class="mr-2">
                        {{ p.name }}
                      </div>
                      <div class="flex mt-1 flex-row items-center">
                        <svg class="text-yellow-300 h-4 w-4 mr-1 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        {{ p.rating }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </modal>
        </client-only>
        <client-only>
          <modal @before-open="beforeOpen" @before-close="beforeClose" name="leave-review" :adaptive="true" height="100%">
            <div class="modal-inner">
              <div class="modal-header">
                <h3>Ostavite dojam</h3>
                <i class="material-icons" @click.prevent="$modal.hide('leave-review')">close</i>
              </div>
              <div class="modal-content places-modal">
                <TextAreaField label="Opišite ukratko vaše iskustvo" v-model="review_description"></TextAreaField>
                <label class="block text-md font-semibold text-gray-900 mt-4">Ocjena za nekretninu</label>
                <div class="w-full flex flex-row items-center justify-start">
                  <svg v-for="(i, index) in 5" :key="index" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="#1F2937" viewBox="0 0 24 24" stroke="#fff">
                    <path v-show="i <= review_rating" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                  </svg>
                </div>
                <input class="review-input" type="range" min="1" max="5" placeholder="Ocjena od 1 do 5" v-model="review_rating" />
                <ActionButton placeholder="Ostavi dojam" :style-options="{ border: 'none', color: '#fff', height: '52px', fontSize: '13px', width: 'auto', marginTop: '24px' }" :loading="false" @action="submitReview()"></ActionButton>
              </div>
            </div>
          </modal>
        </client-only>
        <client-only>
          <modal @before-open="beforeOpen" @before-close="beforeClose" name="map-modal" class="map-desktop" :adaptive="true" height="100%">
            <div class="modal-inner map">
              <i class="material-icons" @click.prevent="$modal.hide('map-modal')">close</i>
              <div class="modal-content">
                <RealEstateLocationMap v-show="listing" :location="listing.location"></RealEstateLocationMap>
              </div>
            </div>
          </modal>
        </client-only>
        <client-only>
          <modal @before-open="beforeOpen" @before-close="beforeClose" name="booking" :adaptive="true" height="100%">
            <div class="modal-inner">
              <div class="modal-header">
                <h3>Rezerviši smještaj</h3>
                <i class="material-icons" @click.prevent="$modal.hide('booking')">close</i>
              </div>
              <div class="modal-content places-modal">
                <div class="filters rounded-md">
                  <client-only>
                    <form @submit.prevent>
                      <div class="price-wrap flex flex-col justify-start mb-4">
                        <div class="flex flex-row items-center w-full">
                          <p class="text-xl font-medium">{{ numberWithCommas(listing.price) + ' KM'}}</p>
                          <p class="pl-2 text-lg font-thin">/ noć {{ listing.per_guest ? 'po osobi' : '' }}</p>
                        </div>
                      </div>
                      <div class="mb-4 picker-wrap" v-if="$auth.user">
                        <vc-date-picker
                          :disabled-dates="disabledDates"
                          :min-date="new Date()"
                          v-model="range"
                          :masks="masks"
                          locale="sr-Latn-RS"
                          is-range
                          is-inline
                          popover.visibility="visible"
                          :popover="{ visibility: 'click' }"
                        >
                          <template v-slot="{ inputValue, inputEvents, isDragging }">
                            <div class="flex flex-row justify-start items-center">
                              <div class="flex flex-col">
                                <label class="text-xs text-gray-400 font-medium mb-2 uppercase">dolazak</label>
                                <div class="relative flex-grow w-full">
                                  <svg
                                    class="text-gray-600 w-4 h-full mx-2 absolute pointer-events-none"
                                    fill="none"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                  >
                                    <path
                                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                    ></path>
                                  </svg>
                                  <input
                                    class="flex-grow pl-8 pr-2 py-1 bg-gray-100 rounded w-full date-input shadow-md"
                                    :class="isDragging ? 'text-gray-600' : 'text-gray-900'"
                                    :value="inputValue.start"
                                    v-on="inputEvents.start"
                                  />
                                </div>
                              </div>

                              <span class="flex-shrink-0 m-2">
                    <svg
                      class="w-4 h-4 stroke-current text-gray-600"
                      viewBox="0 0 24 24"
                    >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
                  </span>
                              <div class="flex flex-col">
                                <label class="text-xs text-gray-400 font-medium mb-2 uppercase">odlazak</label>
                                <div class="relative flex-grow w-full">
                                  <svg
                                    class="text-gray-600 w-4 h-full mx-2 absolute pointer-events-none"
                                    fill="none"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                  >
                                    <path
                                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                    ></path>
                                  </svg>
                                  <input
                                    class="flex-grow pl-8 pr-2 py-1 bg-gray-100 rounded w-full date-input shadow-md"
                                    :class="isDragging ? 'text-gray-600' : 'text-gray-900'"
                                    :value="inputValue.end"
                                    v-on="inputEvents.end"
                                  />
                                </div>
                              </div>
                            </div>
                          </template>
                        </vc-date-picker>
                        <div class="flex flex-col">
                          <label class="text-xs text-gray-400 font-medium mb-2 uppercase mt-4">Broj gostiju</label>
                          <div class="relative flex-grow w-full">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 text-gray-600 w-4 h-full mx-2 absolute pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                            <input
                              class="flex-grow pl-8 pr-2 py-1 bg-gray-100 rounded w-full date-input shadow-md"
                              :value="number_of_guests"
                            />
                          </div>
                        </div>
                      </div>
                      <div v-show="numOfDays" class="mb-4 w-full flex total flex-col">
                        <span class="text-md font-light mb-3">Troškovi</span>
                        <div class="flex w-full flex-row items-center justify-between">
                          <p class="font-thin text-md">{{ listing.price }} KM x {{ numOfDays }} dana</p>
                          <p class="font-medium text-md">{{ numberWithCommas(totalBookingPrice) + ' KM' }}</p>
                        </div>
                      </div>
                      <ActionButton @action="sendBookingRequest()" :style-options="{ color: '#fff', background: '#1F2937 !important', width: '100%' }" placeholder="Pošalji upit za rezervaciju"></ActionButton>
                    </form>
                  </client-only>
                </div>
              </div>
            </div>
          </modal>
        </client-only>
        <client-only>
          <modal @before-open="beforeOpen" @before-close="beforeClose" name="detailed-desc" :adaptive="true" height="100%">
            <div class="modal-inner">
              <div class="modal-header">
                <h3>Detaljni opis</h3>
                <i class="material-icons" @click.prevent="$modal.hide('detailed-desc')">close</i>
              </div>
              <div class="modal-content places-modal">
                <p class="description" v-html="listing.description"></p>
              </div>
            </div>
          </modal>
        </client-only>
        <client-only>
          <modal @before-open="beforeOpen" @before-close="beforeClose" name="detailed-attributes" :adaptive="true" height="100%">
            <div class="modal-inner">
              <div class="modal-header">
                <h3>Nekretnina posjeduje</h3>
                <i class="material-icons" @click.prevent="$modal.hide('detailed-attributes')">close</i>
              </div>
              <div class="modal-content">
                <ul role="list" class="mt-6 border-t border-b border-gray-200 py-0 mobile-grid">
                  <li class="flow-root" v-for="(info, index) in checkboxAttributes" :key="index">
                    <div class="relative -m-2 p-2 flex items-center space-x-4 rounded-xl hover:bg-gray-50 focus-within:ring-2 focus-within:ring-indigo-500">

                      <div>
                        <h3 class="text-sm font-medium text-gray-900">
                          <a class="focus:outline-none">
                            <span aria-hidden="true"></span>
                            {{ info.name }}
                          </a>
                        </h3>
                        <p class="mt-1 text-md text-black font-semibold">{{ attrTranslate(info.value) }}</p>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </modal>
        </client-only>
      </div>
    </div>
  </div>
</template>

<script>
import { Component, Vue} from "nuxt-property-decorator";
import ActionButton from "@/components/actionButtons/ActionButton";
import UserProfile from "@/components/UserProfile"
import SingleQuestion from "@/components/SingleQuestion"
import RealEstateLocationMap from "@/components/RealEstateLocationMap";
import TextField from "../../components/inputs/TextField";
import TextAreaField from "../../components/inputs/TextAreaField";
import Skeleton from "@/components/skeleton";

import { swiper, swiperSlide } from 'vue-awesome-swiper'

@Component({
  components: {
    Skeleton,
    TextAreaField,
    TextField,
    ActionButton,
    UserProfile,
    SingleQuestion,
    RealEstateLocationMap
  },
  head() {
    return {
      title: this.listing ? (this.listing.title + " - " + (this.listing.category ? this.listing.category.title : '') + " - " + "MojKvadrat.ba") : "MojKvadrat.ba",
      meta: [
        {
          hid: this.listing ? this.listing.description : "",
          name: this.listing ? this.listing.description : "",
        },
      ],
    };
  },
  layout: (ctx) => ctx.$device.isMobile ? 'mobile' : 'article',
  async asyncData(ctx) {
    let listing = null;
    let images = []
    let user = null
    let isFollowed = false;
    let isSaved = false;
    let listingSaved = false;
    let rating = 0;
    let reviewCount = 0;
    let view_count = 0;
    let listing_meta = null;
    let error = false

    try {
      let response = await ctx.app.$axios.get('/listings/' + ctx.params.id);
      listing = response.data.data;
      listing_meta = response.data.meta;
      listingSaved = response.data.meta.saved;
      user = listing.user;
      images = listing.images;
      isFollowed = response.data.meta.followed;
      isSaved = response.data.meta.saved;
      rating = response.data.meta.rating || 0;
      reviewCount = response.data.meta.review_count || 0;
      view_count = response.data.meta.view_count;
    } catch(e) {
      error = true;
    }

    return {
      rating,
      error,
      reviewCount,
      listing,
      user,
      isFollowed,
      isSaved,
      listingSaved,
      images,
      view_count,
      listing_meta
    }
  }
})
export default class Artikal extends Vue {
  types = {
    rent: 'Iznajmljivanje',
    sell: 'Prodaja',
    buy: 'Potraznja'
  }
  showMoreCafes = false;
  showMoreRestaurants = false;
  showMoreMalls = false;
  showMoreSchools = false;
  showMoreAtms = false;
  loading = false;
  questionTerm = '';
  questions = [];
  isUserFollowed = false;
  review_rating = null;
  review_description = '';
  selectedPlace = null;
  listing_reviews = [];
  swiperOption = {
    pagination: {
      el: '.swiper-pagination',
      dynamicBullets: true
    },
    spaceBetween: 0,
    loop: true,
    autoplay: {
      delay: 7000,
    },
    slidesPerView: 1,
    touchRatio: 0.2,
    slideToClickedSlide: false,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    },
  }
  images = []
  places = []
  x = 0
  lastScrollPosition = 0
  showBooking = false;
  range = {
    start: new Date(),
    end: new Date(),
  }
  masks = {
    input: 'DD-MM-YYYY',
  }
  descriptionRows = 0;
  RentSpecialAttributes = []
  RentSpecialAttributesKeys = [
    "Klima",
    "Wifi",
    "Broj kreveta",
    "Pegla",
    "Veš mašina",
    "Kuhinja",
    "Ljubimci dozvoljeni",
    "Privatni Parking",
    "Fen",
    "TV",
    "Balkon",
    "Zabranjeno pušenje"
  ];
  specialAttributes = [];
  specialAttributesKeys = [
    "Broj soba",
    "Kvadratura",
    "Broj kreveta",
    "Broj gostiju"
  ];

  poi_places = [];
  bookings = [];

  swiperOptionCard = {
    spaceBetween: 0,
    // centeredSlides: true,
    // slidesOffsetBefore: '100px',
    // slidesOffsetAfter: '100px',
    // slidesOffsetBefore: '0px',
    loop: true,
    autoplay: false,
    slidesPerView: 1,
    pagination: {
      el: ".swiper-pagination",
      dynamicBullets: true,
    },
    touchRatio: 0.2,
    slideToClickedSlide: true,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    },
    preloadImages: false,
    lazy: {
      //  tell swiper to load images before they appear
      loadPrevNext: true,
      // amount of images to load
      loadPrevNextAmount: 2,
    },
  }

  bookingPoi() {
    let places = this.places;

    let keys = Object.keys(places)

    for (let index in keys) {
      let key = keys[index];

      if (key.substr(0, 6) === 'things') {
        return places[key].results;
      }
    }

    return [];
  }

  getRentSpecialAttributes() {
    if (!this.listing.attributes) return [];
    return this.listing.attributes.filter((item) => {
      return this.specialAttributesKeys.indexOf(item.name) !== -1;
    });
  }

  beforeOpen() {
    document.body.style.overflow = 'hidden';
  }

  beforeClose() {
    document.body.style.overflow = 'auto';
  }

  async handleFinishListing() {
    try {
      await this.$axios.post('/listings/' + this.listing.id + '/complete');

      this.$toast.open({
        message: "Oglas završen",
        type: 'success',
        duration: 5000
      });
    } catch(e) {
      console.log(e)
    }
  }

  async fetchBookings() {
    try {
      let res = await this.$axios.get(`/listings/${this.listing.id}/bookings`);

      this.bookings = res.data.data;
    } catch (e) {
      console.log(e);
    }
  }

  beforeOpen() {
    document.body.style.overflow = 'hidden';
  }

  beforeClose() {
    document.body.style.overflow = 'auto';
  }

  shareListing() {
    if (navigator.share) {
      navigator
        .share({
          title: this.listing.title,
          text: this.listing.description ? this.listing.description : "",
          url: window.location.href,
        })
        .then(() => console.log("Successful share"))
        .catch((error) => console.log("Error sharing", error));
    }
  }

  async sendBookingRequest(event) {
    if(this.$auth.user) {
      let start = this.$moment(event ? event.start: this.range.start);
      let end = this.$moment(event ? event.end: this.range.end);
      let guests = event ? event.guests: 1;

      try {
        let res = await this.$axios.post(`/listings/${this.listing.id}/book`, {
          'starts_at': start.format('D-M-Y'),
          'ends_at': end.format('D-M-Y'),
          'guests': guests
        })

        this.$toast.open({
          message: "Upit za rezervaciju poslan",
          type: 'success',
          duration: 5000
        });
      } catch (e) {
        if (e.response.data.code === 10) {
          this.$toast.open({
            message: "Već ste poslali upit za ovaj oglas",
            type: 'warning',
            duration: 5000
          });
        } else {
          console.log(e.response)
        }
      }
    } else {
      await this.$router.push('/auth/login')
    }
  }

  get dates() {
    return this.days.map(day => day.date);
  }

  get attributes() {
    return this.dates.map(date => ({
      highlight: true,
      dates: date,
    }));
  }

  beforeOpen() {
    document.body.style.overflow = 'hidden';
  }

  beforeClose() {
    document.body.style.overflow = 'auto';
  }

  get disabledDates() {
    return this.bookings.map(item => {
      return {
        start: this.$moment(item.starts_at).toDate(),
        end: this.$moment(item.ends_at).toDate(),
      }
    })
  }

  onDayClick(day) {
    const idx = this.days.findIndex(d => d.id === day.id);
    if (idx >= 0) {
      this.days.splice(idx, 1);
    } else {
      this.days.push({
        id: day.id,
        date: day.date,
      });
    }
  }

  getSpecialAttributes() {
    if (!this.listing.attributes) return [];
    return this.listing.attributes.filter((item) => {
      return this.RentSpecialAttributesKeys.indexOf(item.name) !== -1;
    });
  }

  get authUser() {
    if (this.$auth.user) {
      if (this.$auth.user.id && this.listing.user.id) {
        return this.$auth.user.id === this.listing.user.id;
      }
    }
  }

  mounted() {
    if(this.error) {
      this.$router.push('/404')
    }
    if(this.$device.isMobile) {
      window.addEventListener('scroll', this.handleScroll, true)
    }
  }

  get numOfDays() {
    return this.$moment(this.range.end).diff(this.$moment(this.range.start), 'days');
  }

  get totalBookingPrice() {
    return this.listing.price * this.numOfDays;
  }

  toggleBookingModal() {
    this.$modal.show('booking')
  }

  handleScroll(e) {
    let currentScrollPosition = (document.documentElement && document.documentElement.scrollTop) ||
      document.body.scrollTop;
    if (currentScrollPosition < 10) {
      this.showBooking = false;
    } else if(currentScrollPosition > 50){
      this.showBooking = true;
    }
  }

  translatePlaces(key) {
    if(key === 'atm') {
      return 'Bankomati'
    } else if(key === 'school') {
      return 'Škole'
    } else if(key === 'cafe') {
      return 'Kafići'
    } else if(key === 'restaurant') {
      return 'Restorani'
    } else if(key === 'shopping_mall') {
      return 'Šoping centri'
    } else if(key.substr(0, 6) === 'things') {
      return 'Sta raditi u blizini'
    }
  }

  async fetchPlaces() {
    try {
      let res = await this.$axios.$get('/listings/' + this.listing.id + '/places');
      this.places = res;
    } catch(e) {
      console.log(e)
    }
  }

  selectPlace(p, i) {
    this.selectedPlace = p;
    this.x = i;
  }

  numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }

  translateSchool(n, type) {
    if(type === 'school') {
      let str = n;
      let res = str.replace('Elementary School', 'Osnovna škola')

      return res;
    } else if(type === 'atm') {
      let str = n;
      let res = str.replace('ATM', 'Bankomat')

      return res;
    }
  }

  async submitReview() {
    try {
      let res = await this.$axios.post(`/listings/${this.$route.params.id}/rent_reviews`, {
        review: this.review_description,
        rating: this.review_rating,
      })

      this.listing_reviews.push(res.data.data);

      this.review_rating = ''
    } catch(e) {
      console.log(e)
    }
  }

  async fetchReviews() {
    try {
      let res = await this.$axios.get(`/listings/${this.$route.params.id}/rent_reviews`);

      this.listing_reviews = res.data.data;
    } catch(e) {
      console.log(e)
    }
  }

  get normalAttributes() {
    return this.listing.attributes.filter(item => item.value !== true && item.value !== false);
  }

  get checkboxAttributes() {
    return this.listing.attributes.filter(item => ! (item.value !== true && item.value !== false));
  }

  get lightboxImages() {
    if(this.images.length) {
      return this.images.map((item) => {
        return {
          src: item.url,
          thumb: item.url,
        };
      });
    }
  }

  async getQuestions() {
    try {
      let res = await this.$axios.get('/listings/' + this.$route.params.id + '/questions');
      this.questions = res.data.data;

    } catch(e) {
      console.log(e)
    }
  }


  openGallery(index) {
    this.$refs.lightbox.showImage(index);
  }

  async toggleSaveListing() {
    try {
      if(!this.listingSaved) {
        await this.$axios.post('/listings/' + this.listing.id + '/save');

        this.$toast.open({
          message: "Uspješno ste spasili oglas " + this.listing.title,
          type: 'success',
          duration: 5000
        });

        this.listingSaved = true;
      } else {
        await this.$axios.delete('/listings/' + this.listing.id + '/save');

        this.$toast.open({
          message: "Uspješno ste izbrisali oglas " + this.listing.title + " iz spašenih",
          type: 'success',
          duration: 5000
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

        this.$toast.open({
          message: "Uspješno ste otpratili " + this.user.name,
          type: 'success',
          duration: 5000
        });

        this.isFollowed = false;
      } else {
        await this.$axios.post('/users/' + this.user.id + '/follow');

        this.$toast.open({
          message: "Uspješno ste zapratili " + this.user.name,
          type: 'success',
          duration: 5000
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
      let response = await this.$axios.post('/listings/' + this.$route.params.id + '/questions', {
        question: this.questionTerm
      });

      this.questions.unshift(response.data.data);

      this.questionTerm = ''
    } catch(e) {
      console.log(e)
    }
  }

  async created() {
    this.specialAttributes = this.getRentSpecialAttributes().slice();

    console.log(this.specialAttributes, 'special')

    if(this.error) {
      return
    }

    this.RentSpecialAttributes = this.getSpecialAttributes();

    if (this.listing.listing_type.shortname === 'booking') {
      this.fetchBookings();
    }

    await this.fetchPlaces();

    for (let key of Object.keys(this.places)) {
      if (this.places[key].results.length) {
        this.selectPlace(this.places[key].results, key)
        break;
      }
    }

    await this.fetchReviews();
    this.isUserFollowed = this.isFollowed;

    if (process.browser) {
      let desc_h = document.getElementById('opis');

      if (desc_h)
        this.descriptionRows = desc_h.getClientRects()[0].height;
    }
  }

  get listingType() {
    return this.types[this.listing.listing_type];
  }
}
</script>

<style scoped lang="scss">

@mixin for-phone-only {
  @media (max-width: 599px) {
    @content;
  }
}
h2 {
  color: #000 !important;
  font-size: 25px;
  font-weight: 500 !important;
  padding: 0px !important;
  display: inline !important;

  @include for-phone-only {
    font-size: 21px;
  }
}

.no-image-grid {
  border-radius: 6px;
  overflow: hidden;
  width: 796px;
  max-width: 100%;
  min-width: 100%;
  max-height: 520px;
  height: 520px;

  @include for-phone-only {
    height: 400px;
    width: 100%;
    max-width: 100%;
    min-width: 100%;
    max-height: 400px;
  }

  img {
    height: 100%;
    width: 100%;
    object-fit: cover;
    min-width: 100% !important;
  }
}


.grid-container {
  position: relative;
  display: grid;
  grid-template-areas:
  'main main small1 small1 small1'
  'main main small2 small2 small2'
  'main main small3 small3 small3';
  grid-gap: 2px;
  height: 400px;

  //@include for-phone-only {
  //  display: flex;
  //
  //}

  .img-counter {
    position: absolute;
    left: 12px !important;
    top: 12px;
    display: flex;
    flex-direction: row;
    width: fit-content;
    border-radius: 5px;
    padding: 4px 8px;
    color: #fff;
    background: rgba(0, 0, 0, 0.41);
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
  }
}

.item1 img {
  width: 100%;
}

.item2, .item3, .item4 {
  cursor: pointer;
  img {
    height: 132px;
    width: 100%;
  }

  .more {
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    z-index: 100;
    font-weight: 600;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
  }
}

.item4 {
  position: relative;
  border-bottom-right-radius: 10px;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    filter: blur(9px);
    z-index: 1;
    -webkit-backdrop-filter: blur(2px);
    backdrop-filter: blur(2px);
  }
}


.listing-wrapper {
  display: flex;
  flex-direction: row;

  @include for-phone-only {
    flex-direction: column;
  }

  .profile-content {
    width: 20%;
    height: fit-content;
  }
  .listing-content {

    @include for-phone-only {
      width: 100%;
    }

    .listing-content-inner {
      display: flex;
      flex-direction: column;
      width: 100%;
      position: relative;

      @include for-phone-only {
        flex-direction: column;
        padding: 0px;
        box-sizing: border-box;
        padding-bottom: 120px;
      }
      .listing-content-wrapper {
        display: flex;
        flex-direction: row;
        width: 100%;
        padding-bottom: 32px;

        @include for-phone-only {
          width: 100%;
          flex-direction: column;
          padding-top: 0;
        }
      }
      .article-title {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: flex-start;
        margin-top: 24px;

        @include for-phone-only {
          flex-direction: column;
        }

        > div {
          display: flex;
          align-items: center;
          justify-content: center;
        }


      }
      h4 {
        font-size: 14px;
        color: #066450;
      }
      h2.heading {
        font-size: 20px;
        font-weight: 600;
        margin-bottom: 32px;

        &.question {
          margin-bottom: 0 !important;
        }
      }
      .detailed-informations {
        width: 100%;
        height: fit-content;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
      }
      .description {
        line-height: 25px;
        line-break: anywhere;
        //max-height: 200px;
        //overflow: hidden;

        &.minimize {
          max-height: 200px;
          overflow: hidden;
        }
      }

    }
  }
}

//.modal-header {
//  display: flex;
//  align-items: center;
//  height: 70px;
//  border-bottom: 1px solid #dcdcdc;
//  justify-content: space-between;
//
//  h2 {
//    font-size: 17px;
//    font-weight: 500;
//  }
//
//  svg {
//    cursor: pointer;
//  }
//}

.modal-inner {
  display: flex;
  flex-direction: column;
  padding: 16px;

  @include for-phone-only {
    padding: 12px;
  }

  &.map {
    padding: 0;

    .modal-content {
      padding: 0;
      height: 100%;

      ::v-deep #map {
        height: calc(100vh - 110px);
        width: auto !important;

        @include for-phone-only {
          width: 100% !important;
        }
      }
    }

    i {
      position: absolute;
      top: 0;
      background: #fff;
      border-radius: 6px;
      width: 30px;
      height: 30px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #000;
      right: 16px;
      z-index: 1;
      top: 16px;
    }
  }


  .modal-content {
    padding: 0;
    textarea {
      height: 200px;
      width: 100%;
      border: 1px solid #ddd;
      border-radius: 6px;
      font-family: 'Outfit', sans-serif;
      font-size: 16px;
      line-height: 21px;
      box-sizing: border-box;
      padding: 12px;
      min-height: 400px;


      @include for-phone-only {
        padding: 12px;
      }


      &:focus {
        outline: none;

      }
    }
  }
}

.separator {
  border-top: 1px solid rgb(221, 221, 221);
  margin: 48px 0;
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
  width: fit-content;

  @include for-phone-only {
    margin-left: 0;
    width: 100%;
    margin: 24px 0;
    border-top: 1px solid #f1f1f1;
    border-bottom: 1px solid #f1f1f1;
  }

  ::v-deep .user-content-wrapper{
    @include for-phone-only {
      marign-left: 0 !important;
      box-shadow: none;
      border: 1px solid #dcdcdc;
    }
  }
}


::v-deep .vc-popover-content-wrapper {
  display: flex;
}

.detailed-info {
  padding: 0 8px;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  background: rgb(241 239 239 / 53%);
  box-shadow: 0 2px 3px 0 rgba(0, 0, 0, 0.1);

  @include for-phone-only {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    height: 40px;
  }
  span {
    font-size: 14px;
    margin: 5px 0;

    @include for-phone-only {
      font-size: 13px;
    }
    &:last-child {
      font-weight: 500;
      font-size: 16px;

      @include for-phone-only {
        font-size: 14px;
      }
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
    height: 50px;
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

        @include for-phone-only {
          margin-left: 0;
        }
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

  @include for-phone-only {
    &.important {
      grid-template-columns: repeat( 1, 1fr);
    }
  }

  &.detailed {
    grid-template-columns: repeat( 2, 1fr);
  }
}

::v-deep img.vue-lb-modal-image {
  border-radius: 0px !important;

  @include for-phone-only {
    border-radius: 0 !important;
  }
}

::v-deep .vue-lb-arrow {
  width: 30px !important;
  border-radius: 30px!important;
  border: 1px solid #fff!important;
  height: 30px!important;

  ::v-deep svg {
    color: #444!important;
  }

  @include for-phone-only {
    width: 25px !important;
    height: 25px !important;
    padding: 0 !important;
    top: 53% !important;

    ::v-deep svg {
      color: #444!important;
      font-size: 20px !important;
    }
  }
}

.question-create {
  display: flex;
  flex-direction: column;
  border-radius: 6px;
  margin-top: 24px;

  ::v-deep button {
    margin-top: 12px;
    background: #0B8489;
  }

  textarea {
    background: #fff;
    border: 1px solid #ddd;
    height: 100px;
    padding: 12px;
    border-radius: 6px;
    font-family: 'Outfit', sans-serif;
    &:focus {
      outline: none;
    }
  }
}

.mobile-topbar {
  background: transparent;
  display: flex;
  position: absolute;
  top: 0;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0 12px;
  height: 60px;
  min-height: 70px;
  z-index: 3;
  width: 100%;
  button {
    height: 30px;
    width: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #fff !important;
    border-radius: 15px !important;
  }
  svg {
    font-size: 22px !important;
    height: 24px !important;
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
}

::v-deep .swiper {
  @include for-phone-only {
    min-height: 400px;
  }


}

.swiper-lazy {
  position: relative !important;
  z-index: 0 !important;
}

.swiper-container {
  width: 796px;
  max-width: 796px;
  min-width: 796px;
  max-height: 520px;
  height: 520px;

  .swiper-slide {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  @include for-phone-only {
    width: 100%;
    max-width: 100%;
    min-width: 100%;
  }
}
@include for-phone-only {
  .mobile-img {
    height: 400px;
    max-height: 400px;
  }

  .swiper-container {
    max-height: 400px;
    height: 400px;
  }

  .swiper-slide {
    max-height: 400px !important;
    min-height: 400px !important;
  }

  .swiper-slide img {
    max-height: 400px !important;
    height: 400px !important;
    width: 100%;
    object-fit: cover;
  }

  ::v-deep button svg {
    height:15px !important;
  }
}

::v-deep .vue-lb-container {
  @include for-phone-only {
    padding: 0 !important;
  }
}

.scroller-position {
  height: 60px;
}
.places-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-column-gap: 24px;
  grid-row-gap: 32px;
  border-radius: 6px;
  padding: 32px 0;

  @include for-phone-only {
    grid-template-columns: repeat(1, 1fr);
  }

  > div {
    line-height: 20px;
    font-size: 14px;

    img {
      height: 20px !important;
      max-height: 20px !important;
    }
  }

  .places-heading {
    display: flex;
    align-items: center;
    justfiy-content: flex-start;
    margin-bottom: 12px;
    padding-bottom: 24px;
    border-bottom: 1px solid #f1f1f1;

    h1 {
      margin-left: 12px;
      font-size: 17px;
      font-weight: 500;
      color: #444;
    }

    svg {
      font-sizee: 20px;
      color: #444;
      padding: 12px;
      background: #f1f1f1;
      border-radius: 6px;
    }
  }
}

.places {
  display: flex;
  flex-direction: column;

  .places-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-column-gap: 24px;
    grid-row-gap: 32px;
    border-radius: 6px;

    @include for-phone-only {
      grid-template-columns: repeat(1, 1fr);
    }

    > div {
      line-height: 20px;
      font-size: 14px;

      img {
        height: 20px !important;
        max-height: 20px !important;
      }
    }

    .places-heading {
      display: flex;
      align-items: center;
      justfiy-content: flex-start;
      margin-bottom: 12px;
      padding-bottom: 24px;
      border-bottom: 1px solid #f1f1f1;

      h1 {
        margin-left: 12px;
        font-size: 17px;
        font-weight: 500;
        color: #444;
      }

      svg {
        font-sizee: 20px;
        color: #444;
        padding: 12px;
        background: #f1f1f1;
        border-radius: 6px;
      }
    }
  }

  button {
    border: 1px solid #444;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 6px;
    font-family: 'Outfit', sans-serif;
    font-size: 13px;
    font-weight: 500;
    margin-bottom: 24px;
    background: transparent;
    color: #000 !important;

    &:focus {
      outline: none;
    }
  }
}

.svg-inline--fa {
  font-size: 20px;
}

.main-info {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  row-gap: 12px;

  @include for-phone-only {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 16px;
  }

  li {
    width: fit-content;
    min-width: fit-content;
    max-width: fit-content;
    border: 1px solid #f1f1f1;
    margin-right: 12px;
    border-radius: 8px;
    background: #f9f9f9;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 8px 12px;
    font-weight: 500;
    font-size: 13px;

    @include for-phone-only {
      width: 100%;
      margin-right: 0;
      min-width: 100%;
      justify-content: flex-start;
      font-size: 12px;
    }

    p {
      line-height: 18px;

      @include for-phone-only {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        max-width: 140px;
      }
      &:first-child {
        font-size: 14px;
      }

      &:last-child {
        font-size: 14px;
        font-weight: 500;
      }
    }
  }
}

.places-ul {
  display: flex;
  height: fit-content;

  li {
    width: fit-content;
    margin-right: 10px;
    padding: 8px;
    font-size: 14px;
    font-weight: 500;

    &:last-child {
      margin-right: 0;
    }
  }
}

.active-place {
  font-weight: 500 !important;
}

::v-deep .vm--modal {
  @include for-phone-only {
    top: 40px !important;
    border-top-left-radius: 7px !important;
    border-top-right-radius: 7px !important;
    height: calc(100vh - 20px) !important;
    padding-bottom: 50px !important;
  }
}

.places-modal {
  ul {
    display: flex;
    flex-direction: row;
    overflow-x: scroll;
    justify-content: flex-start;
    align-items: center;

    li {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-width: 60px;
      margin-right: 24px;

      &.active-place-modal {
        .img-wrapper {
          background: #1F2937;
          img {
            filter: invert(1);
          }
        }

        p {
          color: #1F2937;
          font-weight: 600!important;
          margin: 0;
          padding: 0
        }
      }

      .img-wrapper {
        height:50px;
        width: 50px;
        min-width: 50px;
        display: flex;
        align-items: center;
        justify-content: center;

      }

      p {
        min-width: fit-content;
        margin-top: 12px;
        text-overflow: ellipsis;
        white-space: nowrap;
        max-width: 80px;
        font-size: 14px;
        font-weight: 500!important;
        color: #9a9a9a;
      }
    }
  }

  @include for-phone-only {
    min-height: 500px;
  }
}

.modal-place {
  img {
    height: 25px;
    width: 25px;
  }
}

.book-article {
  position: fixed;
  bottom: 0px;
  z-index: 20;
  background: #fff;
  left: 0px;
  right: 0px;
  padding: 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: 0.3s all ease;
  height: 80px;
  box-shadow: 0px 0px 10px 6px rgb(0 0 0 / 6%);
}

.date-input {
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 6px;
  background: #fff;
  border: 1px solid #ddd;
  flex: 2;
  position: relative;
  transition: 0.3s all ease;
  max-width: 600px;
  margin-top: 0;
  min-height: 48px;
  padding: 0 12px;
  border-radius: 6px;


  &:focus {
    border: 1px solid #000;
    outline: none;
  }
}

.mobile-content {

  @include for-phone-only {
    margin-top: 0px;
    position: relative;
    background: #fff;
    box-shadow: rgb(0 0 0 / 5%) 0px -10px 8px;
    z-index: 1;
  }

}

.swiper-button-prev, .swiper-button-next {
  color: #002F34 !important;
  height: 30px;
  max-height: 30px;
  width: 30px;
  border-radius: 6px;
  padding: 0 !important;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f9f9f9;
  z-index: 10;
  transition: 0.3s all ease;
  display: flex;

  @include for-phone-only {
    background: rgba(241, 241, 241, 0.48);
  }

  &::after {
    font-size: 13px !important;
    line-height: 13px !important;
  }
}

::v-deep .swiper-pagination-bullet {
  width: 10px !important;
  height: 10px !important;
  border: 2px solid rgb(255, 255, 255) !important;
  background: #fff !important;
  opacity: 0.8 !important;
}
::v-deep .swiper-pagination-bullet-active {
  width: 10px !important;
  height: 10px !important;
  border: 3px solid white !important;
  background: #fff !important;
  opacity: 1 !important;
}

::v-deep .swiper-pagination {
  bottom: 50px !important;
}

.price-wrap {

  margin-top: 8px;
  margin-bottom: 8px;
  @include for-phone-only {
    margin: 0 0 16px 0;
    background: #fff;
    padding: 16px 0;
  }

  &.mobile-discount {
    @include for-phone-only {
      padding: 0;
      margin-bottom: 0;
    }
  }

  .main-price-label {
    font-size: 25px;
    font-weight: 600 !important;
  }
}

.mobile-images {
  background: #f9f9f9;
  min-height: 400px;

  img {
    height: 100%;
    width: auto;
    margin: 0 auto
  }
}


.rent-special {
  border: 1px solid #dcdcdc;
  background: #fff;
  img {
    height: 25px;
    margin-right: 10px;
  }

  p {
    font-size: 14px;
    font-weight: 500;
  }
}

.modal-title {
  @include for-phone-only {
    margin-top: 16px;
    padding-top: 16px;
    border-top: 1px solid #f1f1f1;
  }
}

.review-input {
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 6px;
  flex: 2;
  position: relative;
  transition: 0.3s all ease;
  margin-top: 0;
  width: 200px;
  min-height: 48px;

  @include for-phone-only {
    width: 100%;
  }
}

.review-textarea {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 6px;
  padding: 12px;
  background: #fff;
  flex: 2;
  position: relative;
  transition: 0.3s all ease;
  margin-top: 0;
  min-height: 150px;
  border: 1px solid #ddd;
  width: 100%;
}

::v-deep iframe {
  width: 100% !important;
  height: 400px;

  @include for-phone-only {

  }
}

.ammenities {
  @include for-phone-only {
    margin: 0 16px;
  }
  li {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding-left: 12px;
    img {
      height: 30px;
      max-width: 30px !important;
      min-width: 30px !important;

      @include for-phone-only {
        height: 19px;
      }
    }
  }
}

.cross-price {
  text-decoration: line-through;
}

input[type=range] {
  height: 25px;
  -webkit-appearance: none;
  margin: 10px 0;
  width: 100%;
}
input[type=range]:focus {
  outline: none;
}
input[type=range]::-webkit-slider-runnable-track {
  width: 100%;
  height: 5px;
  cursor: pointer;
  animate: 0.2s;
  box-shadow: 0px 0px 0px #000000;
  background: #435266;
  border-radius: 1px;
  border: 0px solid #000000;
}
input[type=range]::-webkit-slider-thumb {
  box-shadow: 0px 0px 0px #000000;
  height: 18px;
  width: 18px;
  border-radius: 25px;
  background: #1F2937;
  cursor: pointer;
  -webkit-appearance: none;
  margin-top: -7px;
}
input[type=range]:focus::-webkit-slider-runnable-track {
  background: #1F2937;
}
input[type=range]::-moz-range-track {
  width: 100%;
  height: 5px;
  cursor: pointer;
  animate: 0.2s;
  box-shadow: 0px 0px 0px #000000;
  background: #2497E3;
  border-radius: 1px;
  border: 0px solid #000000;
}
input[type=range]::-moz-range-thumb {
  box-shadow: 0px 0px 0px #000000;
  border: 1px solid #2497E3;
  height: 18px;
  width: 18px;
  border-radius: 25px;
  background: #A1D0FF;
  cursor: pointer;
}
input[type=range]::-ms-track {
  width: 100%;
  height: 5px;
  cursor: pointer;
  animate: 0.2s;
  background: transparent;
  border-color: transparent;
  color: transparent;
}
input[type=range]::-ms-fill-lower {
  background: #2497E3;
  border: 0px solid #000000;
  border-radius: 2px;
  box-shadow: 0px 0px 0px #000000;
}
input[type=range]::-ms-fill-upper {
  background: #2497E3;
  border: 0px solid #000000;
  border-radius: 2px;
  box-shadow: 0px 0px 0px #000000;
}
input[type=range]::-ms-thumb {
  margin-top: 1px;
  box-shadow: 0px 0px 0px #000000;
  border: 1px solid #2497E3;
  height: 18px;
  width: 18px;
  border-radius: 25px;
  background: #A1D0FF;
  cursor: pointer;
}
input[type=range]:focus::-ms-fill-lower {
  background: #2497E3;
}
input[type=range]:focus::-ms-fill-upper {
  background: #2497E3;
}

.mobile-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 14px;

  @include for-phone-only {
    grid-template-columns: repeat(2, 1fr);
  }

  &.ammenities {
    grid-template-columns: repeat(3, 1fr);

    @include for-phone-only {
      grid-template-columns: repeat(2, 1fr);

    }
  }
}

.show-more-btn {
  min-width: fit-content;
  max-width: fit-content;
  border: 1px solid #1F2937;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 12px;


  @include for-phone-only {
    margin-left: 16px;
  }

  &.no-padding {
    @include for-phone-only {
      margin-left: 0;
    }
  }

}

.compress {
  max-height: 210px;
  overflow: hidden;
}

.show-map-button {
  width: fit-content;
  height: 48px;
  border-radius: 6px;
  background: #1F2937;
  padding: 0 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 13px;
}

.mobile-places-btn {
  display: flex;
  flex-direction: row;

  ::v-deep button {
    width: fit-content !important;

    @include for-phone-only {
      width: 100% !important;
    }

    &:first-child {
      margin-right: 8px;
    }

    &:last-child {
      margin-left: 8px;
    }
  }

  @include for-phone-only {
    display: flex;
    flex-direction: row;
    width: 100%;
    padding: 0 18px;
    margin-top: 24px;
  }
}
::v-deep .vue-lb-content {
  img {
    width: 100%;
    min-width: 100%;
    max-width: 100%;
  }
}

.save-listing {
  min-width: fit-content;

  &:hover {
    text-decoration: underline;
  }
}

.addresses {
  display: flex;
  font-weight: 500;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  margin-top: 16px !important;

  @include for-phone-only {
    margin-top: 0;
  }

  img {
    height: 16px !important;
    width: auto !important;
    border-radius: 0 !important;
    margin-right: 6px;
    object-fit: contain !important;
    min-width: 12px !important;
  }

  > div {
    border: 1px solid #ececec;
    border-radius: 4px;
    width: fit-content;
    margin-right: 8px;
    padding: 8px;
    font-weight: 500;
    background: #fff;
    font-size: 14px;
    line-height: 8px;
    color: #000;
  }
}

.picker-wrap {
  background: #f9f9f9;
  border-radius: 6px;
  padding: 12px;
}

.mobile-address {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 290px
}

</style>

