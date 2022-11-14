<template>
    <div class="box">
        <div
            class="flex flex-col items-center w-full">
            <div class="flex items-start px-4 pt-4 w-full">
                <div class="w-full flex justify-start w-full flex-row items-start">
                    <img alt="Icewall Tailwind HTML Admin Template" class="rounded-sm avatar"
                         :src="user.avatar_url !== null ? user.avatar_url  : '/noimage.jpeg'" />
                    <div class="ml-4 text-left mt-0">
                        <div class="font-semibold text-sm">
                            <h2>{{ user.name }}</h2>
<!--                            <span v-if="user.rating !== null" class="flex flex-row items-center">-->
<!--                 <star-rating :star-size="12" :increment="0.5" :inline="true" :read-only="true"-->
<!--                              v-model="user.rating"></star-rating>-->
<!--              </span>-->
                        </div>
                        <dd class="mt-1">
                            <span
                                class="px-2 py-1 text-green-800 text-xs font-semibold uppercase bg-green-100 rounded-sm agency">{{
                                    user_type(user.user_type)
                                }}</span>
                        </dd>
                    </div>
                </div>
            </div>
            <div class="text-left px-5 pb-5 info w-full">
                <div class="flex items-start justify-center flex-col text-gray-700 mt-2 w-full">
                    <div class="flex flex-row items-center mb-1 text-sm"
                         v-if="user.hasOwnProperty('email') && user.hasOwnProperty('email')">
                        <p>{{ user.email }}</p>
                    </div>
                    <div class="flex flex-row items-center text-sm mb-1"
                         v-if="user.hasOwnProperty('location') && user.location !== null">
                        <p>{{ user.location }}</p>
                    </div>
                    <div class="flex flex-row items-center text-sm main-number"
                         v-if="user.hasOwnProperty('phone_number') && user.phone_number !== null">
                        <p>{{ user.phone_number }}</p>
                    </div>
                </div>
            </div>
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

    async sendMessage() {
        if (this.message.length === 0) {
            this.$toast.open({
                message: 'Morate upisati poruku',
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
                key: Math.floor(Math.random() * 100).toString()
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

    beforeOpen() {
        document.body.style.overflow = 'hidden';
    }

    beforeClose() {
        document.body.style.overflow = 'auto';
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
    min-width: 360px;
    width: 360px;
    max-width: 360px;
    max-height: 216px;
    min-height: 16px;
    position: relative;
    z-index: 10;
    border: 2px solid #f1f1f1;
    background: #fff;

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
        min-width: 300px;
        width: 300px;
        max-width: 300px;
    }
}

img {
    height: 80px;
    width: 80px;
    min-width: 80px;
}

.info p {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 300px;
    color: #000;
    font-weight: 300;

    @include for-phone-only {
        max-width: 180px;
    }
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

.main-number {
    margin-top: 6px;
    p {
        font-size: 18px;
        font-weight: 600;
    }
}
</style>
