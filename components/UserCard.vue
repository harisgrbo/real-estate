<template>
    <div class="box cursor-pointer" @click="goToUser(user)">
        <div
            class="flex flex-col items-center w-full">
            <img class="mx-auto h-24 w-24 rounded-full" :src="user.avatar_url !== null ? user.avatar_url  : '/noimage.jpeg'" :alt="user.name">
            <p class="text-sm mt-2 leading-6 bg-gray-100 rounded-md text-xs p-1 px-2 text-gray-600">{{ user_type(user) }}</p>
            <h3 class="mt-2 text-base font-semibold leading-7 tracking-tight text-gray-900">{{ user.name }}</h3>
            <p class="text-sm mt-2 leading-6 text-gray-600" v-if="user.hasOwnProperty('phone_number') && user.phone_number !== null">{{ user.phone_number }}</p>
        </div>
    </div>
</template>

<script>
import {Component, Prop, Vue} from "nuxt-property-decorator";
import ActionButton from "@/components/actionButtons/ActionButton"

@Component({
    components: {
        ActionButton
    },
    layout() {
        return "account"
    }
})
export default class UserCard extends Vue {
    @Prop({}) user;
    @Prop({}) placeholder;
    message = '';

    removeUser(e) {
        this.$emit('remove-user', e)
    }

    goToUser(u) {
        if (u.user_type === 'agency' || u.user_type === 'investor') {
            this.$router.push('/pravno-lice/' + u.id)
        } else {
            this.$router.push('/users/' + u.id)
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

}
</script>

<style scoped lang="scss">
@mixin for-phone-only {
    @media (max-width: 599px) {
        @content;
    }
}

.box {
    border-radius: 6px;
    min-width: 180px;
    width: 180px;
    max-width: 180px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    position: relative;
    z-index: 10;
    border: 1px solid #f1f1f1;
    background: #fff;
    padding: 16px 0;
    height: 222px;
    min-height: 222px;

    h2 {
        font-size: 16px;
    }

    &:hover {
        h2 {
            text-decoration: underline;
        }
    }

    &:last-child {
        margin-right: 12px;
    }


    @include for-phone-only {
        min-width: 180px;
        width: 180px;
        max-width: 180px;
        height: 200px;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: flex-start;
    }
}

img {
    height: 80px;
    width: 80px;
    min-width: 80px;
}

.info-box {
    border-right: 1px solid #f1f1f1;

    &:last-child {
        border-right: 0;
    }
}

.avatar {
    object-fit: contain;
}

.agency {
    font-size: 9px;
}
</style>
