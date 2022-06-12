<template>
    <div class="preview-wrapper-inner bg-white w-full px-20">
        <div class="account-wrapper-inner">
            <div class="sidenav w-full">
                <h1 class="heading-account"><b>{{ agencies.length }}</b> agencija za nekretnine</h1>
                <div class="grid-layout" v-if="agenciesLoaded">
                    <UserCard v-for="agency in agencies" :id="agency.id" :user="agency" :key="agency.id"/>
                </div>
                <div class="grid-layout" v-else>
                    <skeleton v-for="(i, index) in 3" :key="index" :height="$device.isMobile ? '178px' : '176px'"
                              :width="$device.isMobile ? '340px' : '360px'"></skeleton>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {Component, Vue} from "nuxt-property-decorator";
import Navbar from "@/components/includes/Navbar";
import AgencyCard from "@/components/AgencyCard"
import UserCard from "@/components/UserCard"
import skeleton from "../../components/skeleton";

@Component({
    components: {Navbar, skeleton, AgencyCard, UserCard},
    layout: (ctx) => ctx.$device.isMobile ? 'mobile' : 'settings',
})

export default class Agencies extends Vue {
    agencies = [];
    agenciesLoaded = false;

    async created() {
        await this.fetchAgencies();
    }

    async fetchAgencies() {
        this.agenciesLoaded = false;

        try {
            let res = await this.$axios.get('/agencies');

            this.agencies = res.data.data;

            this.agenciesLoaded = true;
        } catch (e) {
            console.log(e)
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
    overflow-y: scroll !important;
    min-height: calc(100vh - 80px) !important;
    height: auto !important;

    .account-wrapper-inner {
        display: flex;
        justify-content: space-between;
        height: 100%;
        box-sizing: border-box;
        width: 100%;

        @include for-phone-only {
            width: 100%;
            padding-bottom: 70px;
        }

        .sidenav {
            display: flex;
            flex: 2;
            box-sizing: border-box;
            border-radius: 6px;
            flex-direction: column;

            @include for-phone-only {
                padding: 24px;
            }

            h1 {
                font-size: 22px !important;
                font-weight: 500;
                margin-bottom: 24px;

            }

            .info {
                display: flex;
                align-items: center;
                height: 60px;
                justify-content: flex-start;
                margin-bottom: 32px;

                p {
                    margin-right: 12px;

                    &:first-child {
                        font-weight: 600;
                    }
                }

                a {
                    &:hover {
                        text-decoration: underline;
                    }
                }
            }


            h2 {
                //font-family: 'NunitoSans', sans-serif;;
                font-weight: 500;
                font-size: 20px;
                margin-bottom: 36px;
            }

            ul {
                padding: 0;
                width: 100%;
                display: grid;
                grid-template-columns: repeat(4, 1fr);
                grid-gap: 12px;
                row-gap: 12px;

                @include for-phone-only {
                    grid-template-columns: repeat(1, 1fr);
                }

                li {
                    display: flex;
                    height: fit-content;
                    padding: 24px;
                    line-height: 40px;
                    font-weight: 400;
                    box-shadow: rgba(0, 0, 0, 0.16) 0px 2px 8px !important;
                    border-radius: 6px;
                    box-sizing: border-box;
                    cursor: pointer;

                    a {
                        display: flex;
                        flex-direction: column;
                        align-items: flex-start;
                        justify-content: flex-start;
                    }

                    img {
                        height: 50px;
                    }

                    h4 {
                        font-size: 18px;
                        color: rgb(72, 72, 72) !important;
                        margin-top: 12px;
                        font-weight: 600;
                    }

                    p {
                        font-size: 17px;
                        font-weight: 300;
                        line-height: 1.375em !important;
                        height: 50px;
                        color: rgb(72, 72, 72) !important;
                    }
                }
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

.heading {
    word-wrap: break-word !important;
    font-size: 32px !important;
    font-weight: 600 !important;
    line-height: 1.125em !important;
    color: #484848 !important;
    margin-bottom: 36px !important;
}

a {
    transition: 0.3s all ease;
    color: #9BAABD;
}

.icon {
    margin-right: 12px;
    font-size: 18px;
    color: #9BAABD;
}

.swiper-container {
    //padding: 0 0 24px 0;
    padding: 8px 8px;
    width: 1324px;
    margin: 0 auto;
    box-sizing: border-box;
    padding-bottom: 36px;

}


.grid-layout {
    grid-template-columns: repeat(5, 1fr);
    padding: 0 !important;
    grid-row-gap: 16px;
    grid-column-gap: 16px;
    padding-bottom: 100px;

    ::v-deep .user-profile {
        min-width: 100%;
        width: 100%;
    }

    @include for-phone-only {
        grid-template-columns: repeat(1, 1fr);
        grid-row-gap: 16px;
        grid-column-gap: 16px;
    }
}

.swiper {
    box-sizing: border-box;
}

.swiper-wrapper {
    box-sizing: border-box;
}

.swiper-pagination-bullet.swiper-pagination-bullet-active {
    background: #d63946 !important;
}

::v-deep .mobile-user {
    @include for-phone-only {
        min-width: 100%;
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
}

::v-deep .box {
    @include for-phone-only {
        min-width: 100%;
        width: 100%;
        max-width: 100%;
    }
}
</style>

