<template>
    <div class="listing-wrapper mx-auto flex flex-col w-full lg:w-1280 xl:w-1280 up:w-1280" v-if="!error">
        <div v-if="$device.isMobile" class="mobile-topbar">
            <button @click="$router.go(-1)" type="button"
                    class="mr-4 inline-flex items-center p-1  rounded-full text-black">
                <!-- Heroicon name: solid/plus -->
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75" />
                </svg>

            </button>
            <div class="flex flex-row items-center">
                <button @click="shareListing()" type="button"
                        class="inline-flex items-center p-1 text-black">
                    <!-- Heroicon name: solid/plus -->
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" />
                    </svg>

                </button>
            </div>
        </div>
        <div class="listing-content mt-0">
<!--            <ins class="adsbygoogle"-->
<!--                 v-if="!$device.isMobile"-->
<!--                 style="display:flex;margin: 0 auto 24px auto;width:728px;height:90px"-->
<!--                 data-ad-client="ca-pub-3745186233711216"-->
<!--                 data-ad-slot="5734023899"></ins>-->
            <div class="listing-content-inner">
                <div class="listing-content-wrapper relative flex flex-row">
                    <div class="flex flex-col w-full relative add-width">
                        <div class="mobile-images">
                            <div v-if="listing.thumbnail !== null" class="h-full relative cursor-pointer mobile-new">
                                <div :class="'item' + img.id" v-for="(img, index) in images" :key="index" class="h-full w-full">
                                    <img :src="img.url" alt="" @click="openGallery(index)" class="object-cover h-full product-image" />
                                </div>
                                <div
                                    class="absolute bottom-4 left-4 z-10 py-1 px-3 bg-white rounded-sm text-sm font-semibold image-counter-border">
                                    {{ listing_meta.image_count + ' slika u galeriji' }}
                                </div>
                                <div
                                    v-if="$auth.user && $auth.user.id !== listing.user.id"
                                    @click="toggleSaveListing"
                                    class="absolute top-4 right-4 save h-10 w-10 z-10 bg-white rounded-full flex items-center justify-center text-sm font-semibold image-counter-border">
                                    <svg xmlns="http://www.w3.org/2000/svg" :fill="[ listingSaved ? '#FC8709' : 'none']" viewBox="0 0 24 24" stroke-width="1.5" :stroke="[ listingSaved ? '#FC8709' : '#000']" class="w-6 h-6">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                                    </svg>
                                </div>

                            </div>
                            <div v-else class="no-image-grid h-full">
                                <img src="/noimage.jpeg" alt="" />
                            </div>
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
                        <div class="w-full mt-4 mb-2" v-if="!$device.isMobile">
                            <div v-if="listing" class="flex flex-row items-center mb-4">
                                <p class="text-md mr-md text-black font-normal listing-type">{{ listing.listing_type.title }}</p>
                                <h2>{{ listing.title }}</h2>
                            </div>
                            <div class="w-full flex flex-row justify-between items-center mt-md">
                                <div class="flex flex-row items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none"
                                         viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1"
                                              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1"
                                              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                                    </svg>
                                    <p class="min-w-min text-md text-gray-700 font-normal underline">
                                        {{ listing.district + ', ' + listing.address }}</p>
                                </div>
                            </div>
                        </div>

                        <div class="mobile-wrapper">
                            <!-- mobile -->
                            <div v-if="$device.isMobile" class="mx-3 mt-2 flex flex-col">
                                <div v-if="listing" class="flex flex-col items-start my-md">
                                    <p class="text-md mb-2 text-black font-normal listing-type">{{ listing.listing_type.title }}</p>
                                    <h2>{{ listing.title }}</h2>
                                </div>
                                <div class="flex flex-row items-center mt-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none"
                                         viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                                    </svg>
                                    <p class="text-sm text-gray-700 font-semibold mobile-address">
                                        {{ listing.district + ', ' + listing.address }}</p>
                                </div>
                                <div class="addresses">
                                    <div class="flex flex-row items-center justify-start items-center price-main-wrapper">
                                        <div class="flex flex-row items-center justify-between" v-if="listing.price !== 0">
                                            <div class="flex flex-row items-center">
                                                <p :class="[listing.hasOwnProperty('discount') ? 'line-through text-md' : 'text-xl font-bold']">
                                                    {{ numberWithCommas(listing.price) + ' KM' }}</p>
                                                <p v-if="listing.hasOwnProperty('discount')" class="text-xl font-medium ml-4">
                                                    {{
                                                        'Akcija - ' + numberWithCommas(listing.price - (listing.price * (listing.discount * 100) / 100)) + ' KM'
                                                    }}
                                                </p>
                                                <p class="pl-2 text-lg font-thin" v-if="listing.is_booking">/ noć
                                                    {{ listing.per_guest ? 'po osobi' : '' }}</p>
                                            </div>
                                            <div v-if="!listing.is_booking && !listing.is_rent && listing.price_per_square !== null"
                                                 class="price-per-square">
                                                {{ numberWithCommas(listing.price_per_square.toFixed()) + ' KM/ m²' }}
                                            </div>
                                        </div>
                                        <div v-else class="flex flex-row items-center justify-between">
                                            <p class="text-xl font-bold">Na upit</p>
                                        </div>
                                        <div class="addresses mobile">
                                            <div
                                                v-for="(attr, index) in specialAttributes"
                                                :key="index"
                                                class="flex flex-row items-center inside mr-2 relative special-icons"
                                            >
                                                <img v-if="attr.name === 'Broj kreveta'" src="/double-bed.png" alt="" />
                                                <img v-if="attr.name === 'Broj soba'" src="/002-bed.png" alt="" />
                                                <img v-if="attr.name === 'Broj gostiju'" src="/guests.png" alt="" />
                                                <img v-if="attr.name === 'Kvadratura'" src="/001-area.png" alt="" />
                                                <img v-if="attr.name === 'Okućnica'" src="/001-fence.png" alt="" />
                                                {{ attr.value }}
                                                <p v-if="attr.name === 'Kvadratura' || attr.name === 'Okućnica'">
                                                    m²
                                                </p>
                                                <div id="tooltip-default" role="tooltip"
                                                     class="top-9 inline-block absolute z-10 py-2 px-3 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm duration-300 tooltip dark:bg-gray-700">
                                                    {{ attr.name }}
                                                    <div class="tooltip-arrow" data-popper-arrow></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

<!--                                    <div-->
<!--                                        v-for="(attr, index) in specialAttributes"-->
<!--                                        :key="index"-->
<!--                                        class="flex flex-row items-center mr-2"-->
<!--                                    >-->
<!--                                        <img v-if="attr.name === 'Broj kreveta'" src="/double-bed.png" alt="" />-->
<!--                                        <img v-if="attr.name === 'Broj soba'" src="/door.svg" alt="" />-->
<!--                                        <img v-if="attr.name === 'Broj gostiju'" src="/guests.png" alt="" />-->
<!--                                        <img v-if="attr.name === 'Kvadratura'" src="/m2.png" alt="" />-->
<!--                                        {{ attr.value }}-->
<!--                                    </div>-->
                                </div>
                            </div>
                            <div class="flex flex-row items-center justify-start mb-6 items-center price-main-wrapper" v-if="!$device.isMobile">
                                <div class="flex flex-row items-center justify-between" v-if="listing.price !== 0">
                                    <div class="flex flex-row items-center">
                                        <p :class="[listing.hasOwnProperty('discount') ? 'line-through text-md' : 'text-xl font-bold']">
                                            {{ numberWithCommas(listing.price) + ' KM' }}</p>
                                        <p v-if="listing.hasOwnProperty('discount')" class="text-xl font-medium ml-4">
                                            {{
                                                'Akcija - ' + numberWithCommas(listing.price - (listing.price * (listing.discount * 100) / 100)) + ' KM'
                                            }}
                                        </p>
                                        <p class="pl-2 text-lg font-thin" v-if="listing.is_booking">/ noć
                                            {{ listing.per_guest ? 'po osobi' : '' }}</p>
                                    </div>
                                    <div v-if="!listing.is_booking && !listing.is_rent && listing.price_per_square !== null"
                                         class="price-per-square">
                                        {{ numberWithCommas(listing.price_per_square.toFixed()) + ' KM/ m²' }}
                                    </div>
                                </div>
                                <div v-else class="flex flex-row items-center justify-between">
                                    <p class="text-xl font-bold">Na upit</p>
                                </div>
                                <div class="addresses" v-if="!$device.isMobile">
                                    <div
                                        v-for="(attr, index) in specialAttributes"
                                        :key="index"
                                        class="flex flex-row items-center mr-2 relative special-icons"
                                    >
                                        <img v-if="attr.name === 'Broj kreveta'" src="/double-bed.png" alt="" />
                                        <img v-if="attr.name === 'Broj soba'" src="/door.svg" alt="" />
                                        <img v-if="attr.name === 'Broj gostiju'" src="/guests.png" alt="" />
                                        <img v-if="attr.name === 'Kvadratura'" src="/povrsina.png" alt="" />
                                        <img v-if="attr.name === 'Okućnica'" src="/m2.png" alt="" />
                                        {{ attr.value }}
                                        <p v-if="attr.name === 'Kvadratura' || attr.name === 'Okućnica'">
                                            m²
                                        </p>
                                        <div id="tooltip-default" role="tooltip"
                                             class="top-9 inline-block absolute z-10 py-2 px-3 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm duration-300 tooltip dark:bg-gray-700">
                                            {{ attr.name }}
                                            <div class="tooltip-arrow" data-popper-arrow></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <ul role="list" class="main-info px-3 lg:px-0 xl:px-0 up:px-0">
                                <li>
                                    <p class="text-md text-black font-normal">{{ listing.city.name }}</p>
                                </li>
                                <li v-if="!$device.isMobile">
                                    <p class="text-md text-black font-normal">{{ listing.address }}</p>
                                </li>
                                <li>
                                    <p class="text-md text-black font-normal">{{
                                            $moment(listing.published_at).fromNow()
                                        }}</p>
                                </li>
                                <li>
                                    <p class="text-md text-black font-normal">{{ 'Pregleda: ' + view_count }}</p>
                                </li>
                                <li v-if="listing.city.country !== null">
                                    <p class="text-md text-black font-normal">{{ listing.city.country.name }}</p>
                                </li>
                                <li>
                                    <p class="text-md text-black font-normal">{{ 'ID: ' + listing.id }}</p>
                                </li>
                            </ul>

                            <div class="mt-6 mobile-places-btn">
                                <ActionButton @action="$modal.show('map-modal')" placeholder="Mapa"
                                              :style-options="{ width: 'auto'}"
                                              :loading="false" @acition="$modal.show('places')"></ActionButton>
                                <ActionButton v-if="!listing.is_booking" @action="$modal.show('places'); fetchPlaces();"
                                              placeholder="U blizini"
                                              :style-options="{ width: 'auto'}"
                                              :loading="false" @acition="$modal.show('places')"></ActionButton>
                                <ActionButton v-if="listing.is_booking" @action="$modal.show('places-poi'); fetchPlaces();"
                                              placeholder="Zanimljivosti"
                                              :style-options="{ width: 'auto' }"
                                              :loading="false" @acition="$modal.show('places')"></ActionButton>
                            </div>
                            <div class="separator"></div>
                            <div class="px-3 lg:px-0 xl:px-0 up:px-0">
                                <ul role="list"
                                    :class="['border-t border-b border-gray-200 mobile-grid informations', showMoreInfo ? 'expand' : '']">
                                    <li class="flow-root list-info" v-for="(info, i) in normalAttributes" :key="i">
                                        <div class="relative flex items-center space-x-4 inner-info-border">
                                            <div class="inner-info">
                                                <h3>
                                                    {{ info.name }}:
                                                </h3>
                                                <p>{{
                                                        info.value === 'true' || info.value === true ? 'Da' : info.value
                                                    }}</p>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            <div v-if="RentSpecialAttributes.length && listing.listing_type.shortname !== 'sell'">
                                <div class="separator"></div>
                                <h3 class="text-2xl font-semibold text-gray-900 mx-3 mb-8 lg:mx-0 xl:mx-0 up:mx-0">
                                    Šta ovaj smještaj posjeduje
                                </h3>
                                <ul role="list" class="mt-3 mobile-grid ammenities">
                                    <li v-for="(attr, index) in RentSpecialAttributes"
                                        :key="index"
                                        class="col-span-1 flex">
                                        <img :src="'/' + attr.name + '.png'" alt="" />
                                        <div
                                            class="flex-1 flex items-center justify-between border-t border-r border-b border-gray-200 bg-white rounded-r-md truncate">
                                            <div
                                                class="flex-1 px-4 py-2 text-sm truncate flex flex-row items-center justify-between">
                                                <div class="text-md text-black font-medium">{{ attr.name }}</div>
                                                <p class="text-gray-500" v-if="typeof (attr.value) !== 'boolean'">
                                                    {{ attr.value === 'true' ? '' : attr.value }}</p>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            <div class="mx-5 lg:mx-0 xl:mx-0 up:mx-0" v-if="checkboxAttributes.length">
                                <div class="separator"></div>
                                <h3 class="text-2xl font-semibold text-gray-900">
                                    Nekretnina posjeduje
                                </h3>
                                <ul role="list"
                                    :class="['mt-6 border-t border-b border-gray-200 py-0 mobile-grid', checkboxAttributes.length > 10 ? 'compress' : '']">
                                    <li class="flow-root" v-for="(info, index) in checkboxAttributes" :key="index">
                                        <div class="relative -m-2 p-2 flex items-center space-x-4 rounded-xl">

                                            <div>
                                                <h3 class="text-md font-light text-gray-900">
                                                    <div class="focus:outline-none">
                                                        <span aria-hidden="true"></span>
                                                        {{ info.name }}
                                                    </div>
                                                </h3>
                                                <p class="mt-1 text-md text-black font-medium">{{
                                                        attrTranslate(info.value)
                                                    }}</p>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                                <span v-show="checkboxAttributes.length > 10" @click="$modal.show('detailed-attributes')"
                                      class="rounded-md show-more-btn no-padding border border-gray-800 py-4 flex flex-row items-center min-w-min justify-start text-md font-medium mt-4 hover:underline cursor-pointer">
              Prikaži više
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24"
                   stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
              </svg>
            </span>
                            </div>
                            <div class="relative z-10 bg-white mt-6">
                                <h3 class="text-2xl font-semibold text-gray-900 mb-6 lg:mx-0 xl:mx-0 up:mx-0 mx-3">Detaljni
                                    opis</h3>
                                <p :class="['description mx-3 lg:mx-0 xl:mx-0 up:mx-0', descriptionRows > 200 ? 'minimize' : 'maximize']"
                                   id="opis" v-html="listing.description"></p>
                                <span v-show="descriptionRows > 200" @click="$modal.show('detailed-desc')"
                                      class="py-4 rounded-md flex flex-row items-center show-more-btn min-w-min justify-start text-md font-medium mt-4 hover:underline cursor-pointer">
                                  Prikaži više
                                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24"
                                       stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                                  </svg>
                                </span>
                            </div>
<!--                            <div v-if="listing.is_booking" class="flex w-full flex-col">-->
<!--                                <div class="separator"></div>-->
<!--                                <div class="flex flex-row items-center mb-6 justify-between w-full">-->
<!--                                    <h3 class="text-2xl font-semibold text-gray-900 lg:mx-0 xl:mx-0 up:mx-0 mx-3">-->
<!--                                        Dojmovi</h3>-->

<!--                                    <ActionButton :class="[ $device.isMobile ? 'mr-5' : '']"-->
<!--                                                  v-if="$auth.user && !authUser && listing.is_booking"-->
<!--                                                  placeholder="Ostavi dojam" :style-options="{ width: 'auto'}"-->
<!--                                                  :loading="false" @action="$modal.show('leave-review')"></ActionButton>-->
<!--                                </div>-->

<!--                                <div class="bg-white w-full px-5 lg:px-0 xl:px-0 up:px-0" v-if="listing_reviews.length">-->
<!--                                    <div class="grid grid-cols-2 mobile-reviews gap-8">-->
<!--                                        <div v-for="review in listing_reviews" class="shadow-md rounded-md"-->
<!--                                             :key="review.id">-->
<!--                                            <div class="flex text-sm text-gray-500 space-x-4 px-4">-->
<!--                                                <div class="flex-none py-4">-->
<!--                                                    <img-->
<!--                                                        src="https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80"-->
<!--                                                        alt="" class="w-10 h-10 bg-gray-100 rounded-full">-->
<!--                                                </div>-->
<!--                                                <div class="flex-1 py-4">-->
<!--                                                    <h3 class="font-medium text-gray-900">-->
<!--                                                        {{ review.user ? review.user.name : 'Username' }}</h3>-->
<!--                                                    <p>-->
<!--                                                        <time datetime="2021-07-16">-->
<!--                                                            {{ $moment(review.created_at).format('DD.MM.YYYY') }}-->
<!--                                                        </time>-->
<!--                                                    </p>-->

<!--                                                    <div class="flex items-center mt-4">-->
<!--                                                        <svg v-for="(i, index) in review.rating" :key="index"-->
<!--                                                             class="text-yellow-400 h-5 w-5 flex-shrink-0"-->
<!--                                                             xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"-->
<!--                                                             fill="currentColor" aria-hidden="true">-->
<!--                                                            <path-->
<!--                                                                d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>-->
<!--                                                        </svg>-->
<!--                                                    </div>-->
<!--                                                    <div class="mt-4 prose prose-sm max-w-none text-black">-->
<!--                                                        <p>{{ review.review }}</p>-->
<!--                                                    </div>-->
<!--                                                </div>-->
<!--                                            </div>-->
<!--                                        </div>-->
<!--                                    </div>-->
<!--                                </div>-->
<!--                                <NotFound src="/review.svg" text="Nema dojmova" v-else/>-->
<!--                            </div>-->
                            <div class="w-full px-3 pb-6 lg:px-0 xl:px-0 up:px-0 relative z-10 bg-white mt-5" v-if="listing.panorama_url !== null">
                                <div class="flex flex-row items-center w-full justify-between mb-6 mobile-col">
                                    <h3 class="text-2xl font-semibold text-gray-900lg:mx-0 xl:mx-0 up:mx-0">360° virtuelni
                                        prikaz</h3>
                                    <a :href="listing.panorama_url" target="_blank"
                                       class="rounded-md show-more-btn no-padding border border-gray-800 py-4 flex flex-row items-center min-w-min justify-start text-md font-medium mt-4 hover:underline cursor-pointer">
                                        Otvori preko cijelog ekrana
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-1" fill="none"
                                             viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                  d="M9 5l7 7-7 7"/>
                                        </svg>
                                    </a>
                                </div>
                                <div v-if="listing.panorama_url !== null">
                                    <client-only>
                                        <iframe scrolling="no" :src="listing.panorama_url"/>
                                    </client-only>
                                </div>
                            </div>
                            <div class="w-full px-3 pb-6 lg:px-0 xl:px-0 up:px-0 relative z-10 bg-white" v-if="listing.video_url !== null">
                                <div class="separator"></div>
                                <h3 class="text-2xl font-semibold text-gray-900 mb-6 lg:mx-0 xl:mx-0 up:mx-0">Video</h3>
                                <client-only>
                                    <iframe scrolling="no" :src="listing.video_url"/>
                                </client-only>
                            </div>
                            <div v-if="$device.isMobile" class="book-article">
                                <div class="flex flex-row items-center justify-between w-full">
                                    <div class="flex flex-row items-center" v-if="listing.price !== 0">
                                        <p :class="[listing.hasOwnProperty('discount') ? 'line-through text-md' : 'text-xl font-bold']">
                                            {{ numberWithCommas(listing.price) + ' KM' }}</p>
                                        <p v-if="listing.hasOwnProperty('discount')" class="text-md font-medium ml-4">
                                            {{
                                                'Akcija - ' + numberWithCommas(listing.price - (listing.price * (listing.discount * 100) / 100)) + ' KM'
                                            }}
                                        </p>
                                        <p class="pl-2 text-lg font-thin" v-if="listing.is_booking">/ noć
                                            {{ listing.per_guest ? 'po osobi' : '' }}</p>
                                    </div>
                                    <div v-else class="flex flex-row items-center">
                                        <p class="text-xl font-bold">Na upit</p>
                                    </div>
                                </div>
                                <ActionButton v-if="$auth.user && !authUser && listing.is_booking" placeholder="Rezerviši"
                                              :style-options="{ width: 'auto' }" :loading="false"
                                              @action="toggleBookingModal()"></ActionButton>
                            </div>
                            <div class="w-full px-3 pb-6 lg:px-0 xl:px-0 up:px-0 relative bg-white z-10 similar" v-if="similarListings.length">
                                <div class="separator"></div>
                                <h3 class="text-2xl font-semibold text-gray-900 mb-6 lg:mx-0 xl:mx-0 up:mx-0">Slični oglasi</h3>
                                <div class="flex flex-row w-1280 relative similar">
                                    <div class="flex flex-row w-full overflow-x-scroll">
                                        <div class="similar-inner"></div>
                                        <SearchListingCard v-for="listing in similarListings" :listing="listing"
                                                           :key="listing.id"></SearchListingCard>
                                    </div>
                                </div>
                            </div>
                            <div class="user-wrap relative z-10" v-if="$device.isMobile">
                                <UserProfile :listing="listing" :bookings="bookings" :perguest="listing.per_guest"
                                             :auth-user="authUser" :vat="listing.vat_included" :price="listing.price"
                                             :id="listing.id" :user="listing.user"
                                             :is-rent="listing.is_rent" :is-booking="listing.is_booking"
                                             :type="listing.user.user_type" @send-booking-request="sendBookingRequest()"
                                             @finish-listing="handleFinishListing"></UserProfile>
                            </div>
                        </div>

                        <client-only>

                        </client-only>
<!--                        <ins class="adsbygoogle"-->
<!--                             v-if="!$device.isMobile"-->
<!--                             style="display:block; text-align:center; width:100%"-->
<!--                             data-ad-layout="in-article"-->
<!--                             data-ad-format="fluid"-->
<!--                             data-ad-client="ca-pub-3745186233711216"-->
<!--                             data-ad-slot="7663416760"></ins>-->
                    </div>
                    <div class="user-wrap relative z-10" v-if="!$device.isMobile">
                        <UserProfile :listing="listing" :bookings="bookings" :perguest="listing.per_guest"
                                     :auth-user="authUser" :vat="listing.vat_included" :price="listing.price"
                                     :id="listing.id" :user="listing.user" :followed="isFollowed"
                                     :is-rent="listing.is_rent" :is-booking="listing.is_booking"
                                     :type="listing.user.user_type" @send-booking-request="sendBookingRequest"
                                     @finish-listing="handleFinishListing"></UserProfile>
                    </div>
                </div>
                <client-only>
                    <modal @before-open="beforeOpen" @before-close="beforeClose" name="places" :adaptive="true"
                           height="100%">
                        <div class="modal-inner">
                            <div class="modal-header">
                                <h3>U krugu 2km od lokacije nekretnine</h3>
                                <i class="material-icons" @click.prevent="$modal.hide('places')">close</i>
                            </div>
                            <div class="modal-content places-modal">
                                <div class="filters rounded-md">
                                    <ul class="main-tabs">
                                        <li v-for="(place, index) in places" :key="index"
                                            @click="selectPlace(place.results, index)"
                                            :class="[ 'cursor-pointer', index === x ? 'active' : '']">
                                            <p>{{ translatePlaces(index) }}</p>
                                        </li>
                                    </ul>
                                    <div class="mt-3">
                                        <div class="places-grid" v-if="selectedPlace !== null">
                                            <div v-for="(p, index) in selectedPlace" :key="index"
                                                 class="flex flex-row items-center justify-start">
                                                <img :src="p.icon" :alt="p.name" class="mr-2" />
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
                    <modal @before-open="beforeOpen" @before-close="beforeClose" name="places-poi" :adaptive="true"
                           height="100%">
                        <div class="modal-inner">
                            <div class="modal-header">
                                <h3>Zanimljivosti u blizini nekretnine</h3>
                                <i class="material-icons" @click.prevent="$modal.hide('places-poi')">close</i>
                            </div>
                            <div class="modal-content places-modal">
                                <div class="filters rounded-md">
                                    <div class="places-grid" v-if="selectedPlace !== null">
                                        <div v-for="p in bookingPoi()" :key="p.id"
                                             class="flex flex-col items-start justify-start">
                                            <div class="flex flex-row items-center">
                                                <img :src="p.icon" :alt="p.name" class="mr-2" />
                                                {{ p.name }}
                                            </div>
                                            <div class="flex mt-1 flex-row items-center">
                                                <svg class="text-yellow-300 h-4 w-4 mr-1 flex-shrink-0"
                                                     xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                                                     fill="currentColor" aria-hidden="true">
                                                    <path
                                                        d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
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
                    <modal @before-open="beforeOpen" @before-close="beforeClose" name="leave-review" :adaptive="true"
                           height="100%">
                        <div class="modal-inner">
                            <div class="modal-header">
                                <h3>Ostavite dojam</h3>
                                <i class="material-icons" @click.prevent="$modal.hide('leave-review')">close</i>
                            </div>
                            <div class="modal-content places-modal">
                                <TextAreaField label="Opišite ukratko vaše iskustvo"
                                               v-model="review_description"></TextAreaField>
                                <label class="block text-md font-semibold text-gray-900 mt-4">Ocjena za
                                    nekretninu</label>
                                <div class="w-full flex flex-row items-center justify-start">
                                    <svg v-for="(i, index) in 5" :key="index" xmlns="http://www.w3.org/2000/svg"
                                         class="h-4 w-4" fill="#1F2937" viewBox="0 0 24 24" stroke="#fff">
                                        <path v-show="i <= review_rating" stroke-linecap="round" stroke-linejoin="round"
                                              stroke-width="2"
                                              d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/>
                                    </svg>
                                </div>
                                <input class="review-input" type="range" min="1" max="5" placeholder="Ocjena od 1 do 5"
                                       v-model="review_rating"/>
                                <ActionButton placeholder="Ostavi dojam"
                                              :style-options="{ border: 'none', color: '#fff', height: '52px', fontSize: '13px', width: 'auto', marginTop: '24px' }"
                                              :loading="false"
                                              @action="submitReview(); $modal.hide('leave-review')"></ActionButton>
                            </div>
                        </div>
                    </modal>
                </client-only>
                <client-only>
                    <modal @before-open="beforeOpen" @before-close="beforeClose" name="map-modal" class="map-desktop"
                           :adaptive="true" height="100%">
                        <div class="modal-inner">
                            <div class="modal-header">
                                <h2>Lokacija nekretnine</h2>
                                <i class="material-icons" @click="$modal.hide('map-modal')">close</i>
                            </div>
                            <div class="modal-content">
                                <RealEstateLocationMap v-show="listing"
                                                       :location="listing.location"></RealEstateLocationMap>
                            </div>
                        </div>
                    </modal>
                </client-only>
                <client-only>
                    <modal @before-open="beforeOpen" @before-close="beforeClose" name="booking" :adaptive="true"
                           height="100%">
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
                                                    <p class="text-xl font-medium">
                                                        {{ numberWithCommas(listing.price) + ' KM' }}</p>
                                                    <p class="pl-2 text-lg font-thin">/ noć
                                                        {{ listing.per_guest ? 'po osobi' : '' }}</p>
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
                                                                <label
                                                                    class="text-xs text-gray-400 font-medium mb-2 uppercase">dolazak</label>
                                                                <div class="relative flex-grow w-full">
                                                                    <svg
                                                                        class="text-gray-600 w-4 h-full mx-3 absolute pointer-events-none"
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
                                                                <label
                                                                    class="text-xs text-gray-400 font-medium mb-2 uppercase">odlazak</label>
                                                                <div class="relative flex-grow w-full">
                                                                    <svg
                                                                        class="text-gray-600 w-4 h-full mx-3 absolute pointer-events-none"
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
                                                <div class="flex flex-col" v-if="listing.per_guest">
                                                    <label
                                                        class="text-xs text-gray-400 font-medium mb-2 uppercase mt-4">Broj
                                                        gostiju</label>
                                                    <div class="relative flex-grow w-full">
                                                        <svg xmlns="http://www.w3.org/2000/svg"
                                                             class="h-3 w-3 text-gray-600 w-4 h-full mx-3 absolute pointer-events-none"
                                                             fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path stroke-linecap="round" stroke-linejoin="round"
                                                                  stroke-width="2"
                                                                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"/>
                                                        </svg>
                                                        <input
                                                            class="flex-grow pl-8 pr-2 py-1 bg-gray-100 rounded w-full date-input shadow-md"
                                                            v-model="number_of_guests"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div v-show="numOfDays" class="mb-4 w-full flex total flex-col">
                                                <span class="text-lg font-medium mb-4">Troškovi</span>
                                                <div class="flex w-full flex-col items-start justify-between">
                                                    <div
                                                        class="font-thin mb-2 text-md w-full flex flex-row items-center justify-between">
                                                        Cijena:
                                                        <span>
                              {{ listing.price + ' KM' }} {{ listing.per_guest ? 'po osobi' : '' }}
                            </span>
                                                    </div>
                                                    <div
                                                        class="font-thin mb-2 text-md w-full flex flex-row items-center justify-between">
                                                        Broj noćenja: <span>{{ numOfDays }}</span></div>
                                                    <div
                                                        class="font-thin mb-2 text-md w-full flex flex-row items-center justify-between"
                                                        v-if="listing.per_guest">Broj gostiju: <span>{{
                                                            number_of_guests
                                                        }}</span></div>
                                                    <div
                                                        class="font-light total text-md w-full flex flex-row items-center justify-between pt-3 mt-3 border-t border-gray-400">
                                                        Ukupno: <span class="font-semibold text-lg">{{
                                                            numberWithCommas(totalBookingPrice) + ' KM'
                                                        }}</span></div>
                                                </div>
                                            </div>
                                            <ActionButton @action="sendBookingRequest(); $modal.hide('booking')"
                                                          :style-options="{ color: '#fff !important', background: '#FC8709 !important', width: '100%' }"
                                                          placeholder="Pošalji upit za rezervaciju"></ActionButton>
                                        </form>
                                    </client-only>
                                </div>
                            </div>
                        </div>
                    </modal>
                </client-only>
                <client-only>
                    <modal @before-open="beforeOpen" @before-close="beforeClose" name="detailed-desc" :adaptive="true"
                           height="100%">
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
                    <modal @before-open="beforeOpen" @before-close="beforeClose" name="detailed-attributes"
                           :adaptive="true" height="100%">
                        <div class="modal-inner">
                            <div class="modal-header">
                                <h3>Nekretnina posjeduje</h3>
                                <i class="material-icons" @click.prevent="$modal.hide('detailed-attributes')">close</i>
                            </div>
                            <div class="modal-content">
                                <ul role="list" class="mt-6 border-t border-b border-gray-200 py-0 mobile-grid">
                                    <li class="flow-root" v-for="(info, index) in checkboxAttributes" :key="index">
                                        <div
                                            class="relative -m-2 p-2 flex items-center space-x-4 rounded-xl hover:bg-gray-50 focus-within:ring-2 focus-within:ring-indigo-500">

                                            <div>
                                                <h3 class="text-sm font-medium text-gray-900">
                                                    <a class="focus:outline-none">
                                                        <span aria-hidden="true"></span>
                                                        {{ info.name }}
                                                    </a>
                                                </h3>
                                                <p class="mt-1 text-md text-black font-semibold">
                                                    {{ attrTranslate(info.value) }}</p>
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
import {Component, Vue} from "nuxt-property-decorator";
import ActionButton from "@/components/actionButtons/ActionButton";
import UserProfile from "@/components/UserProfile"
import SingleQuestion from "@/components/SingleQuestion"
import RealEstateLocationMap from "@/components/RealEstateLocationMap";
import TextField from "../../../components/inputs/TextField";
import TextAreaField from "../../../components/inputs/TextAreaField";
import Skeleton from "@/components/skeleton";
import NotFound from "../../../components/global/NotFound";
import SearchListingCard from "../../../components/SearchListingCard";

@Component({
    components: {
        SearchListingCard,
        NotFound,
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
                    hid: 'description',
                    name: 'description',
                    content: this.listing.description
                },
                {
                    name: 'keywords',
                    content: this.listing.title + ' Stanovi sarajevo zenica tuzla banjaluka stan na dan izdavanje rentanje renta'
                },
                { name: "keywords", content: this.listing.title + " nekretnine, stanovi, kuce, apartmani, more, mojkvadrat, novogradnja, stan na dan, sarajevo stan, sarajevo stanovi, sarajevo, poslovni prostor, garaza" },
            ],
        };
    },
    layout: (ctx) => ctx.$device.isMobile ? 'mobile' : 'article',
    async asyncData(ctx) {
        let listing = null;
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
            let response = await ctx.app.$axios.get('/listings/slug/' + ctx.params.slug);
            listing = response.data.data;
            listing_meta = response.data.meta;
            listingSaved = response.data.meta.saved;
            user = listing.user;
            isFollowed = response.data.meta.followed;
            isSaved = response.data.meta.saved;
            rating = response.data.meta.rating || 0;
            reviewCount = response.data.meta.review_count || 0;
            view_count = response.data.meta.view_count;
        } catch (e) {
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
            view_count,
            listing_meta
        }
    }
})
export default class Oglas extends Vue {
    types = {
        rent: 'Iznajmljivanje',
        sell: 'Prodaja',
        buy: 'Potraznja'
    }
    startStories = false;
    showTooltip = false;
    showMoreCafes = false;
    showMoreRestaurants = false;
    showMoreMalls = false;
    showMoreSchools = false;
    showMoreAtms = false;
    loading = false;
    number_of_guests = 1;
    questionTerm = '';
    showMoreInfo = false;
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
        "Zabranjeno pušenje"
    ];
    specialAttributes = [];
    similarListings = []
    specialAttributesKeys = [
        "Broj soba",
        "Kvadratura",
        "Okućnica",
        "Broj kreveta",
        "Broj gostiju"
    ];

    poi_places = [];
    bookings = [];

    items = [
        "https://picsum.photos/350/200/",
        "https://picsum.photos/400/201/",
        {
            url: "https://file-examples-com.github.io/5mb.mp4",
            type: "video",
        },
    ]

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

    galleryImages = [];

    handleGalleryImages() {
        return this.images
            .filter(item => {
                return item.url !== null
            })
            .map(item => {
            if (item.media_type === 'video') {
                return {
                    url: item.url,
                    type: 'video',
                }
            }

            return item.url;
        })
    }

    async handleGalleryModal() {
        try {
            let res = await this.$axios.get('/listings/' + this.listing.id + '/images');

            this.images = res.data.data;

            this.galleryImages = this.handleGalleryImages();
        } catch (e) {
            console.log(e)
        }
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

    async fetchSimilarListings() {
        try {
            let res = await this.$axios.get('/listings/' + this.listing.id + '/similar');

            this.similarListings = res.data.data;
        } catch (e) {
            console.log(e)
        }
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
        } catch (e) {
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
                    text: this.listing.address ? this.listing.address + ' ' + this.listing.listing_type.title : "",
                    url: window.location.href,
                })
                .then(() => console.log("Successful share"))
                .catch((error) => console.log("Error sharing", error));
        }
    }

    async sendBookingRequest(event) {
        if (this.$auth.user) {
            let start = this.$moment(event ? event.start : this.range.start);
            let end = this.$moment(event ? event.end : this.range.end);
            let guests = event ? event.guests : this.number_of_guests;

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
            await this.$router.push('/prijava')
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
        // this.$nextTick(() => {
        //     try {
        //         // this is required for each ad slot (calling this once will only load 1 ad)
        //         (window.adsbygoogle = window.adsbygoogle || []).push({});
        //     } catch (error) {
        //         console.error(error)
        //     }
        // })

        if (this.error) {
            this.$router.push('/404')
        }
        if (this.$device.isMobile) {
            window.addEventListener('scroll', this.handleScroll, true)
        }
    }

    get numOfDays() {
        return this.$moment(this.range.end).diff(this.$moment(this.range.start), 'days');
    }

    get totalBookingPrice() {
        if (this.listing.per_guest) {
            return this.listing.price * this.numOfDays * this.number_of_guests;
        } else {
            return this.listing.price * this.numOfDays
        }
    }

    toggleBookingModal() {
        this.$modal.show('booking')
    }

    handleScroll(e) {
        let currentScrollPosition = (document.documentElement && document.documentElement.scrollTop) ||
            document.body.scrollTop;
        if (currentScrollPosition < 10) {
            this.showBooking = false;
        } else if (currentScrollPosition > 50) {
            this.showBooking = true;
        }
    }

    translatePlaces(key) {
        if (key === 'atm') {
            return 'Bankomati'
        } else if (key === 'school') {
            return 'Škole'
        } else if (key === 'cafe') {
            return 'Kafići'
        } else if (key === 'restaurant') {
            return 'Restorani'
        } else if (key === 'shopping_mall') {
            return 'Šoping centri'
        } else if (key.substr(0, 6) === 'things') {
            return 'Sta raditi u blizini'
        }
    }

    async fetchPlaces() {
        try {
            let res = await this.$axios.$get('/listings/' + this.listing.id + '/places');
            this.places = res;
        } catch (e) {
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
        if (type === 'school') {
            let str = n;
            let res = str.replace('Elementary School', 'Osnovna škola')

            return res;
        } else if (type === 'atm') {
            let str = n;
            let res = str.replace('ATM', 'Bankomat')

            return res;
        }
    }

    async submitReview() {
        try {
            let res = await this.$axios.post(`/listings/${this.listing.id}/rent_reviews`, {
                review: this.review_description,
                rating: this.review_rating,
            })

            this.listing_reviews.push(res.data.data);

            this.review_rating = ''
        } catch (e) {
            if (e.response.status === 400) {
                this.$toast.open({
                    message: "Dojam možete ostaviti tek po isteku rezervacije",
                    type: 'error',
                    duration: 5000
                });
            }

        }
    }

    async fetchReviews() {
        try {
            let res = await this.$axios.get(`/listings/${this.listing.id}/rent_reviews`);

            this.listing_reviews = res.data.data;
        } catch (e) {
            console.log(e)
        }
    }

    get normalAttributes() {
        return this.listing.attributes.filter(item => item.value !== true && item.value !== false);
    }

    get checkboxAttributes() {
        return this.listing.attributes.filter(item => !(item.value !== true && item.value !== false));
    }

    get lightboxImages() {
        if (this.images.length) {
            return this.images.map((item) => {
                return {
                    src: item.url,
                    thumb: item.url,
                };
            });
        }
    }

    openGallery(index) {
        this.$refs.lightbox.showImage(index);
    }

    async toggleSaveListing() {
        try {
            if (!this.listingSaved) {
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

        } catch (e) {
            console.log(e)
        }
    }


    async handleFollow() {
        try {
            if (this.isFollowed) {
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

        } catch (e) {
            console.log(e)
        }
    }

    get owner() {
        if (this.$auth.user) {
            return this.listing.user.id === this.$auth.user.id;
        }
    }

    attrTranslate(attr) {
        if (attr === true) {
            return 'Da'
        } else if (attr === false) {
            return 'Ne'
        } else {
            return attr;
        }
    }

    async created() {
        await this.fetchSimilarListings();
        await this.handleGalleryModal();
        if (this.listing.listing_type.shortname === 'booking') {
            this.fetchBookings();
        }

        this.specialAttributes = this.getRentSpecialAttributes().slice();

        if (this.error) {
            return
        }

        this.RentSpecialAttributes = this.getSpecialAttributes();

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
    font-size: 22px;
    font-weight: 500 !important;
    padding: 0px !important;
    display: inline !important;
    line-height: 33px;

    @include for-phone-only {
        font-size: 18px;
        font-weight: 400!important;
        line-height: 20px !important;
        margin-bottom: 5px !important;
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
    min-height: 520px;

    @include for-phone-only {
        height: 400px;
        width: 100%;
        max-width: 100%;
        min-width: 100%;
        max-height: 400px;
        min-height: 400px;
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
        padding-bottom: 120px;
    }

    .profile-content {
        width: 20%;
        height: fit-content;
    }

    .listing-content {
        width: 1200px;
        margin: 0 auto;

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
                padding-bottom: 0px;
                position: relative;
                background: #fff;
                z-index: 1;
                border-top-left-radius: 10px;
                border-top-right-radius: 10px;
                padding-top: 331px;
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
                    padding-bottom: 0;
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

            .description {
                line-height: 25px;
                //max-height: 200px;
                //overflow: hidden;

                &.minimize {
                    max-height: 200px;
                    overflow: hidden;
                    font-size: 16px;
                    font-weight: 300;
                }
            }

        }
    }
}

.separator {
    border-top: 1px solid rgb(221, 221, 221);
    margin: 24px 0;
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

    ::v-deep .user-content-wrapper {
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
    border-radius: 30px !important;
    border: 1px solid #fff !important;
    height: 30px !important;

    ::v-deep svg {
        color: #444 !important;
    }

    @include for-phone-only {
        width: 25px !important;
        height: 25px !important;
        padding: 0 !important;
        top: 53% !important;

        ::v-deep svg {
            color: #444 !important;
            font-size: 20px !important;
        }
    }
}

.mobile-topbar {
    background: transparent;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 0 12px;
    height: 50px;
    min-height: 50px;
    width: 100%;

    @include for-phone-only {
        z-index: 2;
    }

    button {
        height: 30px;
        width: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
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

    ::v-deep button svg {
        height: 15px !important;
    }
}

::v-deep .vue-lb-container {
    background: rgba(0, 0, 0, 1) !important;

    @include for-phone-only {
        padding: 0 !important;
    }

    img {
        height: 800px;
        min-height: 800px;
        width: auto;

        @include for-phone-only {
            height: 80%;
            min-height: 80%;
        }
    }
}

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
            width: auto !important;
            min-width: 20px;
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
        font-family: 'NunitoSans', sans-serif;
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
    row-gap: 7px;

    li {
        background-color: #FC8709;
        padding: 4px 8px;
        line-height: 2.3em;
        white-space: nowrap;
        margin-right: 0.3em;
        -webkit-border-radius: 2px;
        -moz-border-radius: 2px;
        border-radius: 2px;
        color: #fff;

        @include for-phone-only {
            width: fit-content;
            margin-right: 0;
            min-width: fit-content;
            justify-content: flex-start;
            font-size: 12px;
            margin-right: 8px;
        }

        p {
            line-height: 18px;
            color: #fff;

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
            height: 30px;

            &.active-place-modal {
                border: 1px solid #000;
                border-radius: 8px;
                padding: 3px 8px;

                .img-wrapper {
                    img {
                        filter: invert(1);
                    }
                }
            }

            .img-wrapper {
                height: 50px;
                width: 50px;
                min-width: 50px;
                display: flex;
                align-items: center;
                justify-content: center;

            }

            p {
                min-width: fit-content;
                margin-top: 0px;
                text-overflow: ellipsis;
                white-space: nowrap;
                max-width: 80px;
                font-size: 14px;
                font-weight: 500 !important;
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
    background: #FC8709;
    left: 0px;
    right: 0px;
    padding: 12px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    transition: 0.3s all ease;
    height: 50px;
    color: #fff;
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
    min-height: 520px;
    max-height: 520px;
    border-radius: 4px;
    overflow: hidden;

    @include for-phone-only {
        position: fixed;
        top: 0;
        min-height: 400px;
        max-height: 400px;
        border-radius: 0;
        background-attachment: fixed;
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
        z-index: 1;
    }

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

.ammenities {
    @include for-phone-only {
        margin: 0 12px;
    }

    li {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        font-weight: 300;

        img {
            height: 19px !important;
            max-width: auto !important;
            min-width: auto !important;
            width: auto !important;

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
    grid-template-columns: repeat(1, 1fr);
    column-gap: 32px;

    @include for-phone-only {
        grid-template-columns: repeat(1, 1fr);
    }

    &.ammenities {
        grid-template-columns: repeat(2, 1fr);
        grid-row-gap: 4px;

        @include for-phone-only {
            grid-template-columns: repeat(1, 1fr);

        }
    }

    &.informations {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        column-gap: 0;
        max-width: 100%;
        flex-wrap: wrap;

        li {
            margin-bottom: 6px;
            margin-right: 6px;
            width: fit-content;
            min-width: fit-content;
            flex-wrap: wrap;
        }
    }
}

.show-more-btn {
    min-width: fit-content;
    max-width: fit-content;
    border: 1px solid #1F2937;
    height: 34px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 12px;
    font-size: 14px;
    font-weight: 200;


    @include for-phone-only {
        margin-left: 14px;
    }

    &.no-padding {
        @include for-phone-only {
            margin-left: 0;
        }
    }

}

.compress {
    max-height: 230px;
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
        padding: 0 12px;
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
    font-size: 14px;

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
    margin-left: 12px;

    &.mobile {
        @include for-phone-only {
            flex-direction: row !important;
            margin-bottom: 12px;
        }
    }

    @include for-phone-only {
        margin-top: 12px;
        flex-direction: column;
        align-items: flex-start;
        margin-left: 0;
    }

    img {
        height: 16px !important;
        width: auto !important;
        border-radius: 0 !important;
        margin-right: 6px;
        object-fit: contain !important;
        min-width: 12px !important;
    }

    > div.inside {
        width: fit-content;
        font-weight: 500;
        background: #fff;
        font-size: 15px;
        line-height: 8px;
        color: #000;
        border: 1px solid #e0e0e0;
        padding: 4px 8px;
        border-radius: 3px;

        img {
            height: 16px;
        }

        &:first-child {
            border-left: none;
        }
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
    max-width: 290px;

    @include for-phone-only {
        font-size: 13px !important;
        font-weight: 200 !important;
    }
}

.mobile-reviews {
    @include for-phone-only {
        grid-template-columns: repeat(1, 1fr);

        img {
            min-height: 50px;
        }
    }
}

::v-deep .not-found-wrapper {
    min-height: 200px;

    @include for-phone-only {
        min-height: 140px;
    }
}

@include for-phone-only {
    #map {
        height: 610px;
    }
}

.active p {
    font-weight: 600 !important;
    color: #000 !important;
}

#tooltip-default {
    display: none;
}

.special-icons {
    &:hover {
        cursor: pointer;

        #tooltip-default {
            display: flex;
            min-width: fit-content;
        }
    }
}

.similar {
    position: relative;

    @include for-phone-only {
        width: 100%;
    }

    .similar-inner {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        background: black;
        z-index: 10;
        width: 140px;
        background: rgb(2, 0, 36);
        background: linear-gradient(90deg, rgba(2, 0, 36, 0) 0%, rgba(255, 255, 255, 0.8674063375350141) 88%, rgba(255, 255, 255, 1) 100%);

        @include for-phone-only {
            width: 40px;
        }
    }
}

.similar ::v-deep .listing-card-wrapper {
    max-width: 240px;
    width: 240px;
    min-width: 240px;
    margin-right: 16px;

    &:last-child {
        margin-right: 0;
    }

    @include for-phone-only {
        margin-right: 12px;
    }
}

.gallery-container {
    columns: 340px;
    column-gap: 16px;
    width: 800px;
    margin: 0 auto;

    @include for-phone-only {
        width: 100%;
        columns: 130px;

    }

    img {
        display: flex;
        min-width: 100%;
        height: auto;
        cursor: pointer;
    }

    figure {
        break-inside: avoid-column;
        margin-bottom: 1rem;
    }

    figure > img {
        grid-row: 1 / -1;
        grid-column: 1;
    }

    figure a {
        color: black;
        text-decoration: none;
    }

    figcaption {
        grid-row: 2;
        grid-column: 1;
        background-color: rgba(255, 255, 255, .5);
        padding: .2em .5em;
        justify-self: start;
    }

    .landscape {
        grid-column-end: span 2;
    }
}

.image-counter-border {
    border: 1px solid #f1f1f1;
}

.mobile-new {
    @include for-phone-only {
        min-height: 400px;

        img {
            min-height: 400px;
            width: auto;
            object-fit: cover;
            max-height: 400px;
        }
    }
}

.inner-info {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 100%;

    h3 {
        color: #444;
        font-weight: 500;
        font-size: 15px;
        margin-right: 3px;
    }

    p {
        font-weight: 600;
        font-size: 15px;
    }
}

.inner-info-border {
    padding: 6px 0;
    font-size: 14px;

}

iframe {
    min-height: 600px;
    width: 100%;

    @include for-phone-only {
        min-height: 430px;
    }
}

.mobile-col {
    @include for-phone-only {
        display: flex;
        flex-direction: column;
        align-items: flex-start;

        a {
            width: 100%;
            min-width: 100%;
        }
    }
}

@include for-phone-only {
    ::v-deep .wrapper {
        min-height: 154px !important;
    }
}

.price-main-wrapper {
    padding: 16px 0;
    padding-bottom: 0;

    @include for-phone-only {
        padding: 0;
        border-top: none;
        border-bottom: none;
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
    }
}

.price-per-square {
    width: fit-content;
    font-weight: 700;
    background: #fff;
    font-size: 18px;
    line-height: 8px;
    color: #000;
    border-left: 1px solid #e0e0e0;
    padding-left: 12px;
    margin-left: 12px;
}

.mobile-wrapper {
    display: flex;
    flex-direction: column;
    position: relative;
    z-index: 10;
    background: #fff;

    @include for-phone-only {
        border-top-left-radius: 12px;
        border-top-right-radius: 12px;
        box-shadow: rgb(0 0 0 / 12%) 0px -12px 16px;
        padding-top: 12px;
    }
}

.add-width {
    width: 800px;
    padding: 12px;
    background: #fff;

    @include for-phone-only {
        width: 100%;
    }
}

.vue-insta-stories {
    position: fixed;
    height: 100vh;
    height: -webkit-fill-available;
    width: 100vw;
    top: 0;
    bottom :0;
    left: 0;
    right: 0;
    z-index: 1000;

    ::v-deep img {
        min-width: 100% !important;
        height: auto !important;
    }
}

.close-stories {
    position: fixed;
    z-index: 1001;
    width: 180px;
    height: 40px;
    border: 1px solid #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    left: calc(50% - 90px);
    bottom: 30px;
}

h3.text-2xl {
    @include for-phone-only {
        font-size: 20px !important;
        margin-bottom: 14px !important;
    }
}

.list-info {
    background: #f9f9f9;
    border: 1px solid #ddd;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 10px;

    h3 {
        min-width: fit-content;
        width: fit-content;
        font-size: 12px;
    }

    p {
        font-size: 12px;
        font-weight: bold;
    }
}

.listing-type {
    display: flex;
    padding: 10px 24px;
    font-weight: bold;
    background: #FC8709;
    color: #fff;
    border-radius: 3px;
    margin-right: 16px;

    @include for-phone-only {
        padding: 4px 8px;
        font-size: 13px;
    }
}

.similar ::v-deep .swiper {
    @include for-phone-only {
        min-height: 250px;
    }
}

.save {
    @include for-phone-only {
        top: 320px;
    }
}

.product-image {
    height: 100%;
    width: 100% !important;
    object-fit: cover;
}
</style>

