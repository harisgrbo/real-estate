<template>
    <aside class="ml-0 lg:ml-6 xl:ml-6 up:ml-6 sticky-top">
        <div class="main-user-wrapper">
            <div class="flex flex-row">
                <div class="flex w-14 min-w-14 h-14 items-center justify-center rounded-full overflow-hidden img-wrap">
                    <img :src="user.avatar_url !== null ? user.avatar_url  : '/noimage.jpeg'" alt=""
                         class="object-contain w-full min-w-full" />
                </div>
                <div class="flex flex-col items-start justify-start pl-4 w-full">
                    <div class="flex flex-row items-center justify-between w-full cursor-pointer">
                        <h2 @click="goToUser(user)" class="text-lg font-medium text-black text-left leading-5">{{
                                user.name
                            }}</h2>
                        <dd>
                            <span
                                class="px-2 py-1 text-green-800 text-xs font-semibold uppercase bg-green-100 rounded-sm">{{
                                    user_type(user.user_type)
                                }}</span>
                        </dd>
                    </div>
                    <dd class="mt-1 flex flex-row items-center justify-start text-sm">
                        <span :class="['p-1 mr-2 rounded-full status', user.online ? 'bg-green-500' : 'bg-gray-300']"></span>
                        {{ user.online ? 'Online' : 'Offline' }}
                    </dd>
                    <div class="flex items-center justify-start text-gray-700 mt-2 w-full"
                         v-if="user.working_agency !== null">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24"
                             stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
                        </svg>
                        <p>{{ user.working_agency.name }}</p>
                    </div>
                </div>
            </div>
            <div class="flex w-full contact" v-if="$auth.user">
                <div class="w-full">
                    <div class="w-full flex flex-col items-center justify-between" v-if="isMe">
                        <div class="w-full flex items-center justify-center">
                            <ActionButton v-if="listing.completed_at === null"
                                          @action="handleEditListing" class="w-full mr-sm"
                                          placeholder="Uredi"></ActionButton>
                            <ActionButton v-if="listing.completed_at === null"
                                          :style-options="{ color: '#fff !important', background: '#FC8709', borderColor: 'transparent' }"
                                          placeholder="Završi" @action="$emit('finish-listing')"
                                          class="w-full ml-sm no-hover"></ActionButton>
                        </div>
                    </div>
                    <div class="w-full flex flex-row items-center justify-between mobile-buttons" v-else>
                        <ActionButton @action="$modal.show('contact-user')"
                                      placeholder="Poruka" class="w-full mr-sm"></ActionButton>
                        <a class="call-btn" target="_blank" :href="`https://wa.me/${user.phone_number}`">
                            <img src="/whatsapp.png" alt="" />
                        </a>
                        <a class="call-btn" :href="`viber://chat?number=${user.phone_number}`" target="_blank">
                            <img src="/viber.png" alt="" />
                        </a>

                    </div>
                </div>
                <!--        <button class="report-user" v-if="!isMe">-->
                <!--          <font-awesome-icon icon="user-slash"></font-awesome-icon>-->
                <!--          {{ type === 'agencija'? 'Prijavi agenciju' : 'Prijavi fizičko lice' }}-->
                <!--        </button>-->
            </div>
        </div>
        <client-only>
            <modal @before-open="beforeOpen" @before-close="beforeClose" name="contact-user" :adaptive="true"
                   height="100%">
                <div class="modal-inner">
                    <div class="modal-header">
                        <h2>Poruka za {{ user.name }}</h2>
                        <i class="material-icons" @click="$modal.hide('contact-user')">close</i>
                    </div>
                    <div class="modal-content">
                        <textarea v-model="message"></textarea>
                        <action-button :style-options="{ color: '#fff', width: '100%' }" class="mt-4"
                                       placeholder="Pošalji poruku" @action="sendMessage"
                                       :loading="loading"></action-button>
                    </div>
                </div>
            </modal>
        </client-only>
        <!--    <button class="mt-4 report" @click="blockUser(user)" v-if="$auth.user && ($auth.user.id !== user.id)">-->
        <!--      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="red">-->
        <!--        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.618 5.984A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016zM12 9v2m0 4h.01" />-->
        <!--      </svg>-->
        <!--      Blokiraj korisnika</button>-->
        <div class="booking rounded-md" v-if="isBooking && !isMe && !$device.isMobile">
            <client-only>
                <form @submit.prevent>
                    <div class="price-wrap flex flex-col justify-start mb-4">
                        <div class="flex flex-row items-center w-full">
                            <p class="text-xl font-bold">{{ numberWithCommas(price) + ' KM' }}</p>
                            <p class="pl-2 text-lg font-thin">/ noć {{ perguest ? 'po osobi' : '' }}</p>
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
                        <div class="flex flex-col" v-if="perguest">
                            <label class="text-xs text-gray-400 font-medium mb-2 uppercase mt-4">Broj gostiju</label>
                            <div class="relative flex-grow w-full">
                                <svg xmlns="http://www.w3.org/2000/svg"
                                     class="h-3 w-3 text-gray-600 w-4 h-full mx-2 absolute pointer-events-none"
                                     fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
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
                            <div class="font-thin mb-2 text-md w-full flex flex-row items-center justify-between">
                                Cijena:
                                <span>
                  {{ price + ' KM' }} {{ perguest ? 'po osobi' : '' }}
                </span>
                            </div>
                            <div class="font-thin mb-2 text-md w-full flex flex-row items-center justify-between">Broj
                                noćenja: <span>{{ numOfDays }}</span></div>
                            <div class="font-thin mb-2 text-md w-full flex flex-row items-center justify-between"
                                 v-if="perguest">Broj gostiju: <span>{{ number_of_guests }}</span></div>
                            <div
                                class="font-light total text-md w-full flex flex-row items-center justify-between pt-3 mt-3 border-t border-gray-400">
                                Ukupno: <span
                                class="font-semibold text-lg">{{ numberWithCommas(totalBookingPrice) + ' KM' }}</span>
                            </div>
                        </div>
                    </div>
                    <ActionButton @action="handleBookingRequest" :style-options="{ width: '100%' }"
                                  placeholder="Pošalji upit za rezervaciju"></ActionButton>
                </form>
            </client-only>
        </div>
<!--        <div class="flex justify-center mt-4 mb-4" v-if="!$device.isMobile">-->
<!--            <a href="https://www.korpa.ba" target="_blank">-->
<!--                <img :src="$device.isMobile ? '/korpasmall.jpg' : '/korpanew.jpg'" alt="" />-->
<!--            </a>-->
<!--        </div>-->
    </aside>
</template>

<script>
import {Component, Prop, Vue} from "nuxt-property-decorator";
import UserMedals from "@/components/UserMedals";
import ActionButton from "./actionButtons/ActionButton";
import TextField from "./inputs/TextField";

@Component({
    components: {
        TextField,
        ActionButton,
        UserMedals
    },
})

export default class UserProfile extends Vue {
    @Prop({}) user;
    @Prop({}) authUser;
    @Prop({}) isRent;
    @Prop({}) isBooking;
    @Prop({}) type;
    @Prop() perguest
    @Prop() listing
    @Prop() id;
    @Prop() price;
    @Prop({type: Boolean}) vat;
    @Prop({type: Array, default: () => []}) bookings;

    message = '';
    loading = false;
    otherListings = [];
    otherListingsLoaded = false;
    range = {
        start: new Date(),
        end: new Date(),
    }
    masks = {
        input: 'DD-MM-YYYY',
    }
    number_of_guests = 1

    get disabledDates() {
        return this.bookings.map(item => {
            return {
                start: this.$moment(item.starts_at).toDate(),
                end: this.$moment(item.ends_at).toDate(),
            }
        })
    }

    // mounted() {
    //     this.$nextTick(() => {
    //         try {
    //             // this is required for each ad slot (calling this once will only load 1 ad)
    //             (window.adsbygoogle = window.adsbygoogle || []).push({});
    //         } catch (error) {
    //             console.error(error)
    //         }
    //     })
    // }

    async blockUser(u) {
        try {
            let res = await this.$axios.post('/profile/users/' + u.id + '/block');

            this.$toast.open({
                message: "Blokirali ste korisnika " + u.name,
                type: 'success',
                duration: 5000
            });

        } catch (e) {
            console.log(e)
        }
    }

    user_type(t) {
        if (t === 'agency') {
            return 'Agencija'
        } else if (t === 'user') {
            return 'korisnik'
        } else if (t === 'agent') {
            return 'Agent'
        } else if (t === 'investor') {
            return 'Investitor'
        } else {
            return 'Admin'
        }
    }

    beforeOpen() {
        document.body.style.overflow = 'hidden';
    }

    beforeClose() {
        document.body.style.overflow = 'auto';
    }

    async created() {
        if (this.type === 'agency') {
            await this.getOtherListings();
        }

        console.log(this.user)
    }

    handleBookingRequest() {
        this.$emit('send-booking-request', {
            'guests': this.number_of_guests,
            'start': this.range.start,
            'end': this.range.end
        });
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

    get numOfDays() {
        return this.$moment(this.range.end).diff(this.$moment(this.range.start), 'days');
    }

    get totalBookingPrice() {
        if (this.perguest) {
            return this.price * this.numOfDays * this.number_of_guests;
        } else {
            return this.price * this.numOfDays
        }
    }

  goToUser(u) {
    if (u.user_type === 'agency' || u.user_type === 'investor') {
      this.$router.push('/pravno-lice/' + u.id)
    } else {
      this.$router.push('/users/' + u.id)
    }
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

    async getOtherListings() {
        this.otherListingsLoaded = false;
        try {
            let res = await this.$axios.get('/listings/' + this.id + '/other');
            this.otherListings = res.data.data;
            this.otherListingsLoaded = true;
        } catch (e) {
            console.log(e)
        }
    }

    get isMe() {
        if (this.$auth.user) {
            return this.$auth.user.id === this.user.id;
        }
    }

    numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }

    handleEditListing() {
        this.$router.push('/oglas/uredjivanje/' + this.id);
    }

    async sendMessage() {
        if (this.message.length === 0) {

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
                key: Math.floor(Math.random() * 100).toString(),
                listing_id: this.$route.params.id,
                type: 'listing'
            });

            this.$modal.hide('contact-user');

            this.loading = false;


            this.$toast.open({
                message: "Uspješno ste poslali poruku korisniku " + this.user.name,
                type: 'success',
                duration: 5000
            });


            this.message = '';
        } catch (e) {
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

aside {
    width: 360px;

    @include for-phone-only {
        width: 100%;
    }

    .contact {
        margin-top: 12px;

        ::v-deep button {
            width: 100%;
            margin-top: 16px;
        }

        button {
            &:first-child {
                margin-right: 8px;
            }

            &:last-child {
                margin-left: 0px;

            }
        }
    }

    .rent {
        margin-top: 24px;
    }

}

.main-user-wrapper {
    border: 1px solid rgb(221, 221, 221);
    border-radius: 4px;
    padding: 16px;
    box-shadow: rgb(0 0 0 / 12%) 0px 6px 16px;
    margin-bottom: 26px;

    @include for-phone-only {
        box-shadow: none;
        border: none;
        padding: 12px;
        margin-bottom: 0;
    }

    img {
        height: 100%;
        object-fit: cover;
    }
}

.price-wrap {

}

.date-input {
    height: 40px;
    background: #fff;
    font-size: 13px;
    border-radius: 6px;
}

.sticky-top {
    position: sticky;
    top: 80px;

    @include for-phone-only {
        position: static;
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

.report {
    color: red;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;

    &:hover {
        text-decoration: underline;
        cursor: pointer;
    }
}

.img-wrap {
    min-width: 56px;
}

.booking {
    border: 1px solid rgb(221, 221, 221);
    border-radius: 6px;
    padding: 16px;
    box-shadow: rgb(0 0 0 / 12%) 0px 6px 16px;
}

.total {
    border-top: 1px solid rgb(221, 221, 221);
    padding-top: 16px;
    margin-top: 24px;
}

.picker-wrap {
    background: #f9f9f9;
    border-radius: 6px;
    padding: 12px;
}

.total {
    border-top: 1px solid #f1f1f1;
}

.verified {
    font-size: 13px;
    font-weight: 300;

    img {
        height: 20px;
        width: auto;
        min-width: auto;
        margin-right: 8px;
    }
}

.no-hover {
    &:hover {
        background: red !important;
        color: #fff !important
    }
}

.mobile-buttons {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-column-gap: 14px;
    border-top: 1px solid #e0e0e0;
    padding-top: 12px;

    @include for-phone-only {
        border-top: none;
        padding-top: 0px;
    }
    button, a {
        min-width: 100%;
        background: #f1f1f1 !important;
        border: none !important;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 37px;
        margin-top: 0 !important;
        border-radius: 4px;

        @include for-phone-only {
            margin-bottom: 14px;
        }
    }
}
.call-btn {
    background: transparent;
    border: 2px solid #1F2937;
    color: #1F2937;
    height: 30px;

    img {
        width: 21px !important;
        height: auto !important;
        min-width: 15px !important;
    }
}

.status {
    font-size: 11px;
    font-weight: 300;
}
</style>
