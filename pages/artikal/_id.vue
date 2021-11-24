<template>
  <div class="listing-wrapper mx-auto w-full">
    <div v-if="$device.isMobile" class="mobile-topbar">
      <button @click="$router.go(-1)" type="button" class="mr-4 inline-flex items-center p-1 border border-transparent rounded-full shadow-sm text-black bg-gray-100 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
        <!-- Heroicon name: solid/plus -->
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 17l-5-5m0 0l5-5m-5 5h12" />
        </svg>
      </button>
      <div class="flex flex-row items-center">
        <button type="button" class="mr-4 inline-flex items-center p-1 border border-transparent rounded-full shadow-sm text-black bg-gray-100 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          <!-- Heroicon name: solid/plus -->
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </button>
        <button @click="toggleSaveListing()" type="button" class="inline-flex items-center p-1 border border-transparent rounded-full shadow-sm text-black bg-gray-100 hover:bg-gray-300">
          <!-- Heroicon name: solid/plus -->
          <svg xmlns="http://www.w3.org/2000/svg" :fill="[ listingSaved ? '#1F2937' : 'none']" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </button>
      </div>
    </div>
    <div class="listing-content mt-0 lg:mt-12 xl:mt-12 up:mt-12 max-w-7xl mx-auto w-full">
      <div class="listing-content-inner">
        <div class="listing-content-wrapper flex flex-row">
          <div class="flex flex-col w-full">
            <div class="mobile-images">
              <client-only v-if="images.length >= 1">
                <swiper class="swiper" :options="swiperOptionCard" @click.native.stop>
                  <swiper-slide v-for="(img, index) in images" :key="index">
                    <img class="swiper-lazy" :src="img.url" alt="" @click="openGallery(index)">
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
              <div class="article-title">
                <h2 v-if="listing">{{ listing.title }}</h2>
                <p v-if="$device.isMobile" class="mt-5 text-md text-gray-800 font-medium">{{ listing.address }}</p>

                <div class="flex flex-row items-center" v-if="!$device.isMobile">
                  <button type="button" class="mr-4 inline-flex items-center p-1 border border-transparent rounded-full shadow-sm text-black bg-gray-100 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    <!-- Heroicon name: solid/plus -->
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </button>
                  <button @click="toggleSaveListing()" type="button" class="inline-flex items-center p-1 border border-transparent rounded-full shadow-sm text-black bg-gray-100 hover:bg-gray-300">
                    <!-- Heroicon name: solid/plus -->
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" :fill="[ listingSaved ? '#1F2937' : 'none']" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </button>
                </div>
              </div>
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
            <div class="flex flex-col items-start price-wrap" v-if="$device.isMobile">
              <p>Cijena {{ listing.vat ? 'sa uračunatim PDV-om' : 'bez uračunatog PDV-a' }}</p>
              <p class="mt-1 text-lg text-black font-semibold">{{ numberWithCommas(listing.price) }} KM</p>
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
            </ul>
            <div class="separator"></div>
            <div class="px-5 lg:px-0 xl:px-0 up:px-0">
              <h2 class="text-xl font-medium text-gray-900">
                Informacije o nekretnini
              </h2>
              <ul role="list" class="mt-6 border-t border-b border-gray-200 py-6 grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 up:grid-cols-3 gap-6">
                <li class="flow-root" v-for="info in normalAttributes">
                  <div class="relative -m-2 p-2 flex items-center space-x-4 rounded-xl hover:bg-gray-50 focus-within:ring-2 focus-within:ring-indigo-500">

                    <div>
                      <h3 class="text-sm font-medium text-gray-900">
                        <a href="#" class="focus:outline-none">
                          <span aria-hidden="true"></span>
                          {{ info.name }}
                        </a>
                      </h3>
                      <p class="mt-1 text-sm text-black font-semibold">{{ info.value }}</p>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
            <div v-if="RentSpecialAttributes.length">
              <h2 class="text-xl font-medium text-gray-900 mx-5 lg:mx-0 xl:mx-0 up:mx-0">
                Izdvojene pogodnosti
              </h2>
              <div class="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 up:grid-cols-4 gap-4 py-6 bg-gray-50 mt-4 rounded-md p-4">
                <div
                  v-for="(attr, index) in RentSpecialAttributes"
                  :key="index"
                  class="flex flex-row items-center p-2 rounded-md border border-gray-400 rent-special"
                >
                  <img :src="'/' + attr.name + '.png'" alt="">
                  <div class="flex flex-row items-center justify-between w-full">
                    <p>{{ attr.name }}</p>
                    <p v-if="typeof (attr.value) !== 'boolean'" :class="['pl-5', typeof (attr.value) !== 'boolean' ? '' : '']">{{ typeof (attr.value) === 'boolean' ? '' : attr.value }}</p>
                  </div>
                </div>
              </div>
            </div>
            <div class="mt-6 mx-5 lg:mx-0 xl:mx-0 up:mx-0" v-if="checkboxAttributes.length">
              <h2 class="text-xl font-medium text-gray-900">
                Nekretnina posjeduje
              </h2>
              <ul role="list" class="mt-6 border-t border-b border-gray-200 py-6 grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 up:grid-cols-3 gap-6">
                <li class="flow-root" v-for="(info, index) in checkboxAttributes" :key="index">
                  <div class="relative -m-2 p-2 flex items-center space-x-4 rounded-xl hover:bg-gray-50 focus-within:ring-2 focus-within:ring-indigo-500">

                    <div>
                      <h3 class="text-sm font-medium text-gray-900">
                        <a href="#" class="focus:outline-none">
                          <span aria-hidden="true"></span>
                          {{ info.name }}
                        </a>
                      </h3>
                      <p class="mt-1 text-sm text-black font-semibold">{{ attrTranslate(info.value) }}</p>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
            <div class="separator"></div>
            <h2 class="text-xl font-medium text-gray-900 mb-6 lg:mx-0 xl:mx-0 up:mx-0 mx-5">Opis</h2>
            <p class="description mx-5 lg:mx-0 xl:mx-0 up:mx-0">{{ listing.description }}</p>
            <div class="separator"></div>
            <h2 class="text-xl font-medium text-gray-900 mb-6" v-if="!$device.isMobile">Pogledajte šta se nalazi u blizini nekretnine</h2>
            <div class="places" v-if="!$device.isMobile">
              <ul class="flex flex-row items-center justify-start places-ul bg-gray-50 rounded-md p-2">
                <li v-for="(place, index) in places" @click="selectPlace(place.results, index)" :class="[ 'cursor-pointer', index === x ? 'active-place bg-white shadow-sm rounded-md' : '']">{{ translatePlaces(index) }}</li>
              </ul>
              <div class="mt-3">
                <div class="places-grid bg-gray-50" v-if="selectedPlace !== null">
                  <div v-for="p in selectedPlace" class="flex flex-row items-center justify-start mb-4">
                    <img :src="p.icon" :alt="p.name" class="mr-2">
                    {{ p.name }}</div>
                </div>
              </div>
            </div>
            <ActionButton class="mx-5" v-if="$device.isMobile" @action="$modal.show('places')"  placeholder="Pogledaj šta se nalazi u blizini" :style-options="{ width: 'auto', background: 'transparent', border: '2px solid #1F2937', color: '#1F2937' }" :loading="false" @acition="$modal.show('places')"></ActionButton>
            <div class="separator"></div>
            <h2 class="text-xl font-medium text-gray-900 mb-6" v-if="!$device.isMobile">Lokacija</h2>
            <div v-if="!$device.isMobile">
              <RealEstateLocationMap v-if="listing" :location="listing.location"></RealEstateLocationMap>
            </div>
            <div id="dojmovi" v-if="(listing.is_rent || listing.is_booking) && !$device.isMobile && $auth.user" class="px-5 mt-20 lg:px-0 xl:px-0 up:px-0 w-full">
              <h2 class="text-xl font-medium text-gray-900 mb-6">Dojmovi</h2>
              <div class="review w-full">
                <label>Opišite ukratko vaše iskustvo</label>
                <textarea class="review-textarea mb-3" type="text" v-model="review_description"></textarea>
                <label>Ocjena za nekretninu</label>
                <div class="w-full flex flex-row items-center justify-start">
                  <svg v-for="i in 5" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="yellow" viewBox="0 0 24 24" stroke="currentColor">
                    <path v-show="i <= review_rating" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                  </svg>
                </div>
                <input class="review-input" type="range" min="1" max="5" placeholder="Ocjena od 1 do 5" v-model="review_rating" />
                <ActionButton placeholder="Ostavi dojam" :style-options="{ border: 'none', color: '#fff', height: '52px', fontSize: '13px', width: 'auto', marginTop: '24px' }" :loading="false" @action="submitReview()"></ActionButton>
              </div>
              <div v-if="listing_reviews.length" class="bg-white">
                <div>
                  <div v-for="review in listing_reviews">
                    <div class="flex text-sm text-gray-500 space-x-4">
                      <div class="flex-none py-10">
                        <img src="https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80" alt="" class="w-10 h-10 bg-gray-100 rounded-full">
                      </div>
                      <div class="flex-1 py-10">
                        <h3 class="font-medium text-gray-900">{{ review.user ? review.user.name : 'Username' }}</h3>
                        <p><time>{{ $moment(review.created_at).format('DD.MM.YYYY') }}</time></p>

                        <div class="flex items-center mt-4">
                          <!--
                            Heroicon name: solid/star

                            Active: "text-yellow-400", Default: "text-gray-300"
                          -->
                          <svg v-for="i in review.rating" class="text-yellow-400 h-5 w-5 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
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
            <ActionButton class="mx-5" v-if="$device.isMobile" @action="$modal.show('map-modal')" placeholder="Prikaži lokaciju na mapi" :style-options="{ width: 'auto', background: 'transparent', border: '2px solid #1F2937', color: '#1F2937' }" :loading="false"></ActionButton>
            <!--            <div class="separator" v-if="questions.length"></div>-->
<!--            <h2 class="heading question" v-if="questions.length">Pitanja</h2>-->
<!--            <div class="separator" v-if="questions.length"></div>-->
<!--            <h2 class="heading" v-if="listing.questions_disabled === true">-->
<!--              Korisnik je zabranio javna pitanja-->
<!--            </h2>-->
<!--            <SingleQuestion v-if="questions.length" v-for="question in questions" :message="question" :key="question.id" :owner="owner"></SingleQuestion>-->
<!--            <div class="question-create" v-if="$auth.user && listing.questions_disabled === false && owner === false">-->
<!--              <textarea v-model="questionTerm"></textarea>-->
<!--              <ActionButton placeholder="Postavi pitanje" @action="askQuestion"></ActionButton>-->
<!--            </div>-->
            <div class="separator"></div>
            <div v-if="listing.is_booking && $device.isMobile && !authUser" :class="['book-article', showBooking ? 'show' : 'hide']">
              <div class="flex flex-row items-center justify-star">
                <p class="text-xl font-bold">{{ listing.price + ' KM' }}</p>
                <p class="text-gray-600 font-semibold text-lg ml-2">/ noć</p>
              </div>
              <ActionButton v-if="$auth.user" placeholder="Rezerviši datum" :style-options="{ border: 'none', color: '#fff', height: '52px', fontSize: '13px', width: 'auto' }" :loading="false" @action="toggleBookingModal()"></ActionButton>
            </div>
          </div>
          <div class="user-wrap">
            <UserProfile :bookings="bookings" :auth-user="authUser" :vat="listing.vat_included" :price="listing.price" :id="listing.id" :user="listing.user" :followed="isFollowed" :is-rent="listing.is_rent" :is-booking="listing.is_booking" :type="listing.user.user_type" @booking="sendBookingRequest"></UserProfile>
          </div>
          <div v-if="(listing.is_rent || listing.is_booking) && $device.isMobile && $auth.user" class="px-5 lg:px-0 xl:px-0 up:px-0">
            <h2 class="text-xl font-medium text-gray-900 mb-6">Dojmovi</h2>
            <div class="review">
              <label>Opišite ukratko vaše iskustvo</label>
              <textarea class="mb-3" type="text" v-model="review_description"></textarea>
              <label>Ocjena za nekretninu</label>
              <TextField type="number" placeholder="Ocjena od 1 do 5" v-model="review_rating"></TextField>
              <ActionButton placeholder="Ostavi dojam" :style-options="{ border: 'none', color: '#fff', height: '52px', fontSize: '13px', width: 'auto', marginTop: '24px' }" :loading="false" @action="submitReview()"></ActionButton>

            </div>
            <div v-if="listing_reviews.length" class="bg-white">
              <div>
                <h2 class="sr-only">Customer Reviews</h2>

                <div v-for="review in listing_reviews">
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
                        <svg v-for="i in review.rating" class="text-yellow-400 h-5 w-5 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
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
                <h2>U blizini</h2>
                <i class="material-icons" @click.prevent="$modal.hide('places')">close</i>
              </div>
              <div class="modal-content places-modal">
                <div class="filters rounded-md">
                  <ul class="flex flex-row items-center justify-start">
                    <li v-for="(place, index) in places" @click="selectPlace(place.results, index)" :class="[ 'cursor-pointer modal-place', index === x ? 'active-place-modal bg-white shadow-sm rounded-md' : '']">
                      <div class="img-wrapper shadow-lg rounded-full">
                        <img :src="'/' + translatePlaces(index) + '.svg'" alt="">
                      </div>
                      <p>{{ translatePlaces(index) }}</p>
                    </li>
                  </ul>
                  <div class="mt-3">
                    <div class="places-grid" v-if="selectedPlace !== null">
                      <div v-for="p in selectedPlace" class="flex flex-row items-center justify-start">
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
          <modal @before-open="beforeOpen" @before-close="beforeClose" name="map-modal" :adaptive="true" height="100%">
            <div class="modal-inner map">
              <i class="material-icons" @click.prevent="$modal.hide('map-modal')">close</i>
              <div class="modal-content">
                <RealEstateLocationMap v-if="listing" :location="listing.location"></RealEstateLocationMap>
              </div>
            </div>
          </modal>
        </client-only>

        <client-only>
          <modal @before-open="beforeOpen" @before-close="beforeClose" name="booking" :adaptive="true" height="100%">
            <div class="modal-inner">
              <div class="modal-header">
                <h2>Pošalji upit za rezervaciju</h2>
                <i class="material-icons" @click.prevent="$modal.hide('booking')">close</i>
              </div>
              <div class="modal-content places-modal">
                <div class="filters rounded-md">
                  <client-only>
                    <form @submit.prevent>
                      <div class="price-wrap flex flex-col justify-start">
                        <div class="flex flex-row items-center w-full">
                          <p class="text-xl font-bold">{{ numberWithCommas(listing.price) + ' KM'}}</p>
                          <p class="pl-2">/ noć</p>
                        </div>
                        <div v-show="numOfDays" class="mt-2 w-full">
                          <p class="font-semibold text-md">{{ numberWithCommas(totalBookingPrice) }} KM za {{ numOfDays }} dana</p>
                        </div>
                      </div>
                      <div class="mb-4" v-if="$auth.user">
                        <h2 class="text-lg font-normal text-black leading-5 mb-4 modal-title">Rezervišite datum</h2>
                        <vc-date-picker
                          :disabled-dates="disabledDates"
                          :min-date="new Date()"
                          v-model="range"
                          :masks="masks"
                          is-range
                        >
                          <template v-slot="{ inputValue, inputEvents, isDragging }">
                            <div class="flex flex-row justify-start items-center">
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
                                  class="flex-grow pl-8 pr-2 py-1 bg-gray-100 border rounded w-full date-input"
                                  :class="isDragging ? 'text-gray-600' : 'text-gray-900'"
                                  :value="inputValue.start"
                                  v-on="inputEvents.start"
                                />
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
                                  class="flex-grow pl-8 pr-2 py-1 bg-gray-100 border rounded w-full date-input"
                                  :class="isDragging ? 'text-gray-600' : 'text-gray-900'"
                                  :value="inputValue.end"
                                  v-on="inputEvents.end"
                                />
                              </div>
                            </div>
                          </template>
                        </vc-date-picker>
                      </div>
                      <ActionButton @action="sendBookingRequest" :style-options="{ color: '#fff', width: '100%' }" placeholder="Pošalji upit za rezervaciju"></ActionButton>
                    </form>
                  </client-only>
                </div>
              </div>
            </div>
          </modal>
        </client-only>
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
import RealEstateLocationMap from "@/components/RealEstateLocationMap";
import TextField from "../../components/inputs/TextField";

@Component({
  components: {
    TextField,
    ActionButton,
    Snackbar,
    UserProfile,
    SingleQuestion,
    RealEstateLocationMap
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

    try {
      let response = await ctx.app.$axios.get('/listings/' + ctx.params.id);
      listing = response.data.data;
      listingSaved = response.data.meta.saved;
      user = listing.user;
      images = listing.images;
      isFollowed = response.data.meta.followed;
      isSaved = response.data.meta.saved;
      rating = response.data.meta.rating || 0;
      reviewCount = response.data.meta.review_count || 0;
      view_count = response.data.meta.view_count;
    } catch(e) {
      console.log(e)
    }

    return {
      rating,
      reviewCount,
      listing,
      user,
      isFollowed,
      isSaved,
      listingSaved,
      images,
      view_count
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
  RentSpecialAttributes = []
  RentSpecialAttributesKeys = [
    "Klima",
    "Wifi",
    "Broj kreveta",
    "Pegla",
    "Ves masina",
    "Kuhinja",
    "Fen"
  ];

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

  beforeOpen() {
    document.body.style.overflow = 'hidden';
  }

  beforeClose() {
    document.body.style.overflow = 'auto';
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

  async sendBookingRequest(event) {
    let start = this.$moment(event ? event.start: this.range.start);
    let end = this.$moment(event ? event.end: this.range.end);

    try {
      let res = await this.$axios.post(`/listings/${this.listing.id}/book`, {
        'starts_at': start.format('D-M-Y'),
        'ends_at': end.format('D-M-Y')
      })

      console.log(res);

      this.$snackbar.show({
        text: "Upit poslan",
        timeout: 1000,
        type: "success"
      });
    } catch (e) {
      if (e.response.data.code === 10) {
        this.$snackbar.show({
          text: "Već ste poslali upit za ovaj oglas",
          timeout: 1000,
          type: "danger"
        })
      } else {
        console.log(e.response)
      }
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
    console.log('radi')
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
      return key = 'Bankomati'
    } else if(key === 'school') {
      return key = 'Škole'
    } else if(key === 'cafe') {
      return key = 'Kafići'
    } else if(key === 'restaurant') {
      return key = 'Restorani'
    } else if(key === 'shopping_mall') {
      return key = 'Šoping centri'
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

        this.$snackbar.show({
          text: "Uspješno ste spasili oglas " + this.listing.title,
          timeout: 1000,
          type: "success"
        });

        this.listingSaved = true;
      } else {
        await this.$axios.delete('/listings/' + this.listing.id + '/save');

        this.$snackbar.show({
          text: "Uspješno ste izbrisali oglas " + this.listing.title + " iz spašenih",
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
          text: "Uspješno ste otpratili " + this.user.name,
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

    console.log(this.listing, 'listing')

    await this.fetchReviews();
    this.isUserFollowed = this.isFollowed;
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

.item1 {
  grid-area: main;

  img {
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
    height: 400px;
    cursor: pointer;

    @include for-phone-only {
      border-radius: 0;
    }
  }
}
.item2 {
  grid-area: small1;
  img {
    border-top-right-radius: 10px;
    @include for-phone-only {
      border-radius: 0;
    }
  }
}
.item3 {
  grid-area: small2;
  img {
    border-radius: 0px;

    @include for-phone-only {
      border-radius: 0;
    }
  }
}
.item4 {
  grid-area: small3;
  img {
    border-top-right-radius: 0px;

  }

  @include for-phone-only {
    border-radius: 0;
  }
}

.no-image-grid {
  border-radius: 4px;
  overflow: hidden;
  width: 796px;
  max-width: 796px;
  min-width: 796px;
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
  max-width: 1180px;

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
        padding-top: 60px;

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
        line-height: 21px;
        line-break: anywhere;
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
  padding: 0 24px;

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
      }
    }

    i {
      position: absolute;
      top: 0;
      background: #fff;
      border-radius: 4px;
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
    padding: 24px 0;
    textarea {
      height: 200px;
      width: 100%;
      border: 1px solid #ddd;
      border-radius: 8px;
      font-family: 'Outfit', sans-serif;
      font-size: 16px;
      line-height: 21px;
      box-sizing: border-box;
      padding: 24px;
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
  width: fit-content;

  @include for-phone-only {
    margin-left: 0;
    width: 100%;
  }

  ::v-deep .user-content-wrapper{
    @include for-phone-only {
      marign-left: 0 !important;
      box-shadow: none;
      border: 1px solid #dcdcdc;
    }
  }
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
  border-radius: 10px;
  margin-top: 24px;

  ::v-deep button {
    margin-top: 12px;
    background: #0B8489;
  }

  textarea {
    background: #fff;
    border: 1px solid #dcdcdc;
    height: 100px;
    padding: 12px;
    border-radius: 5px;
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
    background: rgba(255, 255, 255, 0.6) !important;
    border-radius: 10px !important;
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
  grid-template-columns: repeat(2, 1fr);
  grid-column-gap: 24px;
  grid-row-gap: 32px;
  border-radius: 8px;
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
      border-radius: 8px;
    }
  }
}

.places {
  display: flex;
  flex-direction: column;

  .places-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-column-gap: 24px;
    grid-row-gap: 32px;
    padding: 16px;
    border-radius: 8px;

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
        border-radius: 8px;
      }
    }
  }

  button {
    border: 1px solid #444;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 8px;
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

  li {
    width: fit-content;
    min-width: fit-content;
    max-width: fit-content;
    border: 1px solid #f1f1f1;
    margin-right: 12px;
    border-radius: 7px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 12px;

    p {
      line-height: 18px;
      &:first-child {
        font-size: 14px;
      }

      &:last-child {
        font-size: 15px;
        font-weight: 400;
      }
    }
  }
}

.places-ul {
  display: flex;

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
  font-weight: 500;
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
  top: 16px;
  box-shadow: rgb(0 0 0 / 12%) 0px 6px 5px;
  z-index: 10;
  background: #fff;
  border-radius: 4px;
  left: 16px;
  right: 16px;
  padding: 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: 0.3s all ease;

  &.show {
    height: 80px;
  }

  &.hide {
    display: none;
  }
}

.date-input {
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 8px;
  padding: 0 12px;
  background: #F3F3F4;
  flex: 2;
  position: relative;
  transition: 0.3s all ease;
  max-width: 600px;
  margin-top: 0;
}

.mobile-content {

  @include for-phone-only {
    margin-top: -30px;
    position: relative;
    background: #fff;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    box-shadow: rgb(0 0 0 / 7%) 0px -10px 8px;
    z-index: 1;
  }

}

.swiper-button-prev, .swiper-button-next {
  color: #002F34 !important;
  height: 30px;
  max-height: 30px;
  width: 30px;
  border-radius: 7px;
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
  background: #f9f9f9;
  padding: 12px;
  border-radius: 7px;
  margin: 0 16px 16px 16px;

  @include for-phone-only {
    margin: 0 0 16px 0;
    padding: 20px;
  }
}

.mobile-images {
  background: #f9f9f9;
  min-height: 400px;
}

.review {
  display: flex;
  flex-direction: column;

  label {
    margin-bottom: 8px;
    font-weight: 600;
  }

  textarea {
    height: 150px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-radius: 8px;
    background: #F3F3F4;
    flex: 2;
    position: relative;
    transition: 0.3s all ease;
    margin-top: 0;
    padding: 12px;

    &:focus {
      outline: none;
    }
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
  border-radius: 8px;
  padding: 0 12px;
  background: #F3F3F4;
  flex: 2;
  position: relative;
  transition: 0.3s all ease;
  margin-top: 0;
  width: 200px;
  min-height: 48px;
}

.review-textarea {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 8px;
  padding: 0 12px;
  background: #F3F3F4;
  flex: 2;
  position: relative;
  transition: 0.3s all ease;
  margin-top: 0;
  min-height: 150px;
  width: 100%;
}


</style>

