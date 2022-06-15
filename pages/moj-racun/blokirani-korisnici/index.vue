<template>
    <div class="preview-wrapper-inner w-full mx-auto">
        <ul class="breadcrumbs">
            <li>
                <nuxt-link to="/moj-racun">Moj račun</nuxt-link>
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24"
                     stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                </svg>
                <p>Blokirani korisnici</p>
            </li>
        </ul>
        <div class="saved-content w-full">
            <div>
                <div class="mobile-grid w-full" v-if="blockedUsers.length">
                    <UserCard placeholder="Odblokiraj" @do-action="unblockUser(user)" v-for="user in blockedUsers"
                              :key="user.id" :id="user.id" :user="user"/>
                </div>
                <NotFound v-else src="/blocked.svg" text="Nemate blokiranih korisnika"></NotFound>
            </div>
        </div>
    </div>
</template>

<script>
import {Component, Vue} from "nuxt-property-decorator";

import UserCard from "@/components/UserCard";
import NotFound from "../../../components/global/NotFound";

@Component({
    components: {
        NotFound,
        UserCard,
    },
    layout: (ctx) => ctx.$device.isMobile ? 'mobile' : 'settings',
})

export default class blokiraniKorisnici extends Vue {

    blockedUsers = [];

    async created() {
        await this.fetchBlockedUsers();
    }

    async fetchBlockedUsers() {
        try {
            let response = await this.$axios.get('/profile/users/blocked');
            this.blockedUsers = response.data.data;
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

    async unblockUser(u) {
        try {
            let index = this.blockedUsers.findIndex(item => item.id === u.id);

            let res = await this.$axios.delete('/profile/users/' + u.id + '/block');

            this.blockedUsers.splice(index, 1)

            this.$toast.open({
                message: "Odblokirali ste korisnika " + u.name,
                type: 'success',
                duration: 5000
            });

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

.preview-wrapper-inner {
    margin-top: 32px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-direction: column;
    border-radius: 6px;
    padding: 24px;

    @include for-phone-only {
        padding: 24px !important;
        height: 100% !important;
    }
}

.cw-ul {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 36px;
    border-bottom: 1px solid #f1f1f1 !important;
    margin-top: 24px;

    li {
        font-size: 14px !important;
        line-height: 26px !important;
        margin-right: 24px;
        padding-bottom: 8px;
        height: 40px;
        position: relative;
        cursor: pointer;
        font-weight: 500;
        color: #727272;

        &:last-child {
            margin-right: 0;
        }

        &.active {
            font-weight: 500;
            color: #000;

            &::after {
                content: '';
                position: absolute;
                left: 0;
                right: 0;
                bottom: 0;
                border-bottom: 1px solid #000;
            }
        }
    }
}

.user-card-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    row-gap: 32px;
    column-gap: 24px;
}

h1 {
    color: rgb(72, 72, 72) !important;
}

.no-image {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    img {
        height: 400px;

        @include for-phone-only {
            height: 250px;
        }
    }

    p {
        font-size: 20px;
        font-weight: 500;
        margin-top: 24px;
    }
}

.mobile-grid {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 14px;
    @include for-phone-only {
        display: grid;
        grid-template-columns: repeat(1, 1fr);
        gap: 14px;
    }
}

.saved-content {
    margin-top: 36px;
}
</style>
