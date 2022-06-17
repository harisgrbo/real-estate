<template>
    <div class="preview-wrapper-inner mx-auto w-full">
        <ul class="breadcrumbs">
            <li>
                <nuxt-link to="/moj-racun">Moj račun</nuxt-link>
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24"
                     stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                </svg>
                <p>Obavijesti</p>
            </li>
        </ul>
        <div class="flex flex-row pb-8 justify-between notifications-wrap" v-if="notifications.length">
            <ul class="divide-y w-full">
                <li class="notification flex flex-col items-start justify-start relative bg-white hover:bg-gray-50 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600"
                    v-for="(notification, index) in notifications" :key="index">
                    <div class="flex justify-between w-full items-start">
                        <div class="min-w-0 flex-1">
                            <div class="block focus:outline-none" v-if="notification.data.user">
                                <p class="text-sm font-medium text-gray-900 truncate">{{
                                        notification.data.user.name
                                    }}</p>
                            </div>
                        </div>
                        <time datetime="2021-01-27T16:35" class="flex-shrink-0 whitespace-nowrap text-sm text-gray-500">
                            {{ $moment(notification.created_at).fromNow() }}
                        </time>
                    </div>
                    <div class="mt-4">
                        <p class="line-clamp-2 font-normal text-sm text-gray-900 desc">
                            {{ notification.data.text }}
                        </p>
                    </div>
                    <button v-if="notification.data.action" @click.prevent="handleAction(notification.data)"
                            type="button">
                        Pogledaj
                    </button>
                </li>
            </ul>
        </div>
        <NotFound v-else src="/notifications.png" text="Nemate obavijesti"></NotFound>

    </div>
</template>

<script>
import {Component, Vue} from "nuxt-property-decorator";
import NotFound from "../../../components/global/NotFound";

@Component({
    components: {
        NotFound
    },
    layout: (ctx) => ctx.$device.isMobile ? 'mobile' : 'settings',
    async asyncData(ctx) {
        let notifications = [];

        try {
            let res = await ctx.app.$axios.get('/profile/notifications')
            notifications = res.data.data;
        } catch (e) {
            console.log(e)
        }

        return {
            notifications
        }
    }
})
export default class notifikacije extends Vue {
    handleAction(a) {
        const prepend = a.action[0] === '/' ? '' : '/';

        this.$router.push(prepend + a.action);
    }
}
</script>

<style scoped lang="scss">
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

    @include for-phone-only {
        padding: 14px !important;
        height: 100% !important;
    }
}

.notification {
    margin-bottom: 16px;
    transition: 0.3s all ease;
    padding: 14px;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    @include for-phone-only {
        padding: 14px !important;
        margin-bottom: 14px;
    }

    p {
        font-size: 16px;
        font-weight: 400;

        &.desc {
            font-size: 14px;
        }
    }

}

h1 {
    color: rgb(72, 72, 72) !important;
}

.postavke {
    height: fit-content;
}

.notifications-wrap {
    margin-top: 36px;
    width: 100%;
    height: 100%;

    button {
        height: 40px;
        border-radius: 4px;
        background: #FC8709 !important;
        width: fit-content;
        color: #fff;
        padding: 0 12px;
        margin-top: 12px;
        font-size: 14px;
    }
}
</style>
