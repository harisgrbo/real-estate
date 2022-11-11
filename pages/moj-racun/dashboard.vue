<template>
    <div class="preview-wrapper-inner flex col items-start justify-start">
        <ul class="expanded">
            <nuxt-link class="inner" :to="{ path: `/moj-racun/dashboard/${link.slug}`}" v-for="(link, index) in links"
                       :key="index">
                <li>
                    <p>{{ link.name }}</p>
                </li>
            </nuxt-link>
        </ul>
        <div class="dashboard-inner">
            <nuxt-child></nuxt-child>
        </div>
    </div>
</template>

<script>
import {Component, Vue} from "nuxt-property-decorator";
import StandardChart from "@/components/analytics/StandardChart";
import PieChart from "@/components/analytics/PieChart";

@Component({
    components: {
        StandardChart,
        PieChart
    },
    layout: (ctx) => ctx.$device.isMobile ? 'mobile' : 'settings',
    middleware: ['auth']
})

export default class Dashboard extends Vue {
    links = [
        {
            name: 'Analitika',
            slug: 'analitika',
            icon: '/052-presentation.svg'
        },
        {
            name: 'Postavke profila',
            slug: 'postavke-profila',
            icon: '/052-presentation.svg'
        },
        {
            name: 'Agenti za nekretnine',
            slug: 'agenti-za-nekretnine',
            icon: '/052-presentation.svg'
        },
        {
            name: 'Upravljanje oglasima',
            slug: 'upravljanje-oglasima',
            icon: '/052-presentation.svg'
        },
    ]

    currentTab = 0;
    showUl = true;

    toggleUlWidth() {
        this.showUl = !this.showUl;
    }
}
</script>

<style scoped lang="scss">
@mixin for-phone-only {
    @media (max-width: 599px) {
        @content;
    }
}

a {
    font-size: 16px;
    font-weight: 400;
}

.preview-wrapper-inner {
    margin-top: 32px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-direction: column;
    padding: 0 !important;
    height: 100% !important;

    @include for-phone-only {
        padding: 0 24px !important;
    }
}

.nuxt-link-active.inner {
    position: relative;
    color: #1F2937;
    font-size: 16px;
    font-weight: 500;

    &::after {
        content: '';
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        border-bottom: 2px solid #1F2937;
    }
}

.content {
    @include for-phone-only {
        padding: 0;
    }
}

ul.expanded {
    display: flex;
    width: 100%;
    flex-direction: row;
    align-items: center;
    margin-bottom: 36px;
    border-bottom: 1px solid #EBEBEB !important;
    justify-content: flex-start;

    @include for-phone-only {
        margin: 0;
        overflow-x: scroll;
        margin-bottom: 24px;
    }

    a {
        font-size: 14px !important;
        line-height: 26px !important;
        margin-right: 36px;
        padding-bottom: 8px;
        height: 40px;
        position: relative;
        cursor: pointer;
        font-weight: 500;
        width: fit-content;

        @include for-phone-only {
            min-width: fit-content;
        }

        &:last-child {
            margin-right: 0;
        }

        &.active {
            color: #0B8489;

            &::after {
                content: '';
                position: absolute;
                left: 0;
                right: 0;
                bottom: 0;
                border-bottom: 1px solid #0B8489;
            }
        }

        li {
            display: flex;
            height: 100%;
            justify-content: center;
            align-items: center;

            p {
                font-size: 16px;
                font-weight: 400;
            }

            img {
                height: 25px;
            }
        }
    }
}

.account-wrapper-a {
    padding-top: 40px;

    @include for-phone-only {
        width: 100%;
        padding: 16px;
        background: #fff;
    }
}

.dashboard-inner {
    width: 100%;
}

</style>
