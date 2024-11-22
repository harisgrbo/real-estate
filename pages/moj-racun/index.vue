<template>
    <div class="account-wrapper-a preview-wrapper-inner">
        <div class="account-wrapper-inner">
            <div class="sidenav">
                <h1 class="heading-account">Moj račun</h1>
                <div class="grid grid-cols-3 gap-4 pb-1 mobile-grid">
                    <div v-for="(tab, index) in tabs"
                         :key="index"
                         :class="['rounded-tl-lg relative rounded-tr-lg sm:rounded-tr-none relative group bg-white p-6 overflow-hidden shadow-md hover:shadow-lg divide-y divide-gray-200 sm:divide-y-0 rounded-lg']">
                        <div class="warning" v-if=" tab.name === 'Plaćanja'">
                            <span>Uskoro dostupna opcija</span>
                        </div>
                        <div>
              <span class="flex items-start justify-start">
                <!-- Heroicon name: outline/clock -->
                 <img class="max-h-12" :src="'/settings/' + tab.icon" alt="" />
              </span>
                        </div>
                        <div class="mt-8">
                            <h3 class="text-lg font-medium">
                                <nuxt-link :to="{ path: '/moj-racun/' + tab.slug }"
                                           class="focus:outline-none">
                                    <span class="absolute inset-0" aria-hidden="true"></span>
                                    {{ tab.name }}
                                </nuxt-link>
                            </h3>
                            <p class="mt-2 text-sm text-gray-700">
                                {{
                                    tab.desc
                                }}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {Component, Vue} from "nuxt-property-decorator";

@Component({
    layout: (ctx) => ctx.$device.isMobile ? 'mobile' : 'settings',
    middleware: ['auth'],
})
export default class accountpage extends Vue {

    tabs = [
        {
            name: "Uredi profil",
            slug: "uredi-profil",
            icon: "010-technical-support.svg",
            desc: 'Uređivanje ličnih podataka i promjena avatara'
        },
        {
            name: "Spašeni oglasi",
            slug: 'spaseno',
            icon: '013-help.svg',
            desc: 'Spašeni oglasi'
        },
        {
            name: "Moji oglasi",
            slug: 'moji-oglasi',
            icon: '016-toolbox.svg',
            desc: 'Lista Vaših objavljenih oglasa'
        },
        {
            name: "Blokirani korisnici",
            slug: "blokirani-korisnici",
            icon: '028-browser.svg',
            desc: 'Lista blokiranih korisnika'
        },
        {
            name: "Obavijesti",
            slug: "notifikacije",
            icon: '049-laptop.svg',
            desc: 'Upravljanje obavijestima'
        },
        {
            name: "Pratioci/Pratim",
            slug: 'pratioci-pratim',
            icon: '034-rating-2.svg',
            desc: 'Lista korisnika koje pratite i koji Vas prate'
        },
        {
            name: "Moji upiti za rezervacije",
            slug: "moje-rezervacije",
            icon: '050-chat.svg',
            desc: 'Moji zahtjevi za iznajmljivanje (booking) prema drugim korisnicima'
        },
        {
            name: "Zahtjevi za iznajmljivanje",
            slug: "oglasi-koje-izdajem",
            icon: '008-calendar.svg',
            desc: 'Zahtjevi za iznajmljivanje upućeni meni kao vlasniku oglasa'
        },
        {
            name: "Poruke",
            slug: "poruke",
            icon: '012-email.svg',
            desc: 'Poruke i konverzacije'
        },
    ]

    goToUser() {
        if (this.$auth.user) {
            if (this.$auth.user.user_type === 'agency' || this.$auth.user.user_type === 'investor') {
                this.$router.push('/pravno-lice/' + this.$auth.user.id)
            } else if (this.$auth.user.user_type === 'agent') {
                this.$router.push('/agent/' + this.$auth.user.id)
            } else {
                this.$router.push('/korisnik/' + this.$auth.user.id)
            }
        } else {
            this.$router.push('/prijava')
        }
    }

    created() {
        if (this.$auth.user && this.$auth.user.user_type === 'agency') {
            this.tabs.unshift({
                name: "Dashboard",
                slug: "dashboard/analitika",
                icon: "014-browser-6.svg",
                desc: 'Glavni dashboard, statistika oglasa, agenti za nekretnine'
            });

            let index = this.tabs.findIndex(item => item.name === 'Moji oglasi');

            if (index !== -1) {
                this.tabs.splice(index, 1);
            }
        }
    }
}


</script>

<style lang="scss" scoped>

@mixin for-phone-only {
    @media (max-width: 599px) {
        @content;
    }
}

.preview-wrapper-inner {
    margin-top: 32px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-direction: column;
    border-radius: 6px;
    padding: 24px;
    min-height: 100% !important;
    height: 100% !important;

    @include for-phone-only {
        padding: 24px !important;
        height: 100% !important;
    }
}

.account-wrapper-a {
    padding-bottom: 36px;

    @include for-phone-only {
        padding: 14px !important;
    }

    .account-wrapper-inner {
        width: 100%;

        @include for-phone-only {
            width: 100%;
            padding-bottom: 70px;
            margin: 0;
        }

        .sidenav {
            display: flex;
            flex: 2;
            box-sizing: border-box;
            border-radius: 6px;
            flex-direction: column;

            @include for-phone-only {
                padding: 0px;
            }


            .info {
                display: flex;
                align-items: center;
                height: 60px;
                justify-content: flex-start;
                margin-bottom: 32px;

                @include for-phone-only {
                    margin-bottom: 12px;
                }

                p {
                    margin-right: 12px;
                    font-size: 16px;

                    &:first-child {
                        font-weight: 500;
                    }
                }

                a {
                    color: #002F34;

                    &:hover {
                        text-decoration: underline;
                    }
                }
            }

            .heading-account {
                overflow-wrap: break-word !important;
                //font-family: Circular, -apple-system, BlinkMacSystemFont, Roboto, "Helvetica Neue", sans-serif !important;
                font-size: 26px !important;
                font-weight: 500 !important;
                line-height: 1.125em !important;
                color: #000 !important;
                margin-bottom: 24px;
            }

            h2 {
                //font-family: 'NunitoSans', sans-serif;
                font-weight: 500;
                font-size: 20px;
                margin-bottom: 36px;
            }

        }

        .main-wrapper {
            display: flex;
            flex: 8;
            padding: 24px;
            background: #fff;
            margin-left: 24px;
            box-sizing: border-box;
            border-radius: 6px;
            position: relative;
            height: calc(100vh - 117px);
            overflow: scroll;
        }
    }
}


.icon {
    margin-right: 12px;
    font-size: 18px;
    color: #9BAABD;
}

.dashboard-class {
    background: #F7F9FF;
}

.mobile-grid {
    @include for-phone-only {
        display: flex;
        flex-direction: column;
    }
}

.go-to-profile {
    height: 42px;
    width: fit-content;
    padding: 0 16px;
    border: 1px solid #1F2937;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 6px;
    font-weight: 500;

    &:hover {
        background: #fff;
    }
}

.warning {
    display: flex;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 10;
    background-color: rgba(255, 255, 255, 0.7);

    span {
        width: 100%;
        background: #1F2937;
        color: #fff;
        font-size: 14px;
        padding: 8px 12px;
        border-top-left-radius: 8px;
        border-bottom-right-radius: 8px;
        height: fit-content;
        width: fit-content;
    }
}

</style>

