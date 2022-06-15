<template>
    <div class="form-wrapper">
        <div class="inner" v-if="!messageSent">
            <img src="/mojkvadratnew.png" class="img-logo" alt="" @click="$router.push('/')">
            <h2 class="mt-4 text-left w-full">Zaboravljena šifra</h2>
            <div class="rounded-md bg-yellow-50 p-4 mb-6 w-full">
                <div class="flex">
                    <div class="flex-shrink-0">
                        <!-- Heroicon name: solid/exclamation -->
                        <svg class="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                             fill="currentColor" aria-hidden="true">
                            <path fill-rule="evenodd"
                                  d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                                  clip-rule="evenodd"/>
                        </svg>
                    </div>
                    <div class="ml-3">
                        <h3 class="text-sm font-medium text-yellow-800">
                            Pažnja
                        </h3>
                        <div class="mt-2 text-sm text-yellow-700">
                            <p>
                                Dobit ćete mail sa instrukcijama za reset šifre
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <form @submit.prevent="sendResetMail">
                <TextField type="text" label="Email" placeholder="johndoe@mail.com" v-model="email"
                           class="mb-6 mt-1"></TextField>
                <ActionButton class="w-full" :style-options="{ color: '#fff', marginTop: '24px' }" :loading="loading"
                              type="submit" placeholder="Pošalji zahtjev na email"></ActionButton>
            </form>
        </div>
        <div class="inner" v-else>
            <!-- This example requires Tailwind CSS v2.0+ -->
            <div class="rounded-md bg-blue-50 p-4">
                <div class="flex">
                    <div class="flex-shrink-0">
                        <!-- Heroicon name: solid/information-circle -->
                        <svg class="h-5 w-5 text-blue-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                             fill="currentColor" aria-hidden="true">
                            <path fill-rule="evenodd"
                                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                                  clip-rule="evenodd"/>
                        </svg>
                    </div>
                    <div class="ml-3 flex-1 md:flex md:justify-between">
                        <p class="text-sm text-blue-700">Dobili ste instrukcije na email, u slučaju da nemate mail u
                            inboxu provjerite spam.</p>
                        <p class="mt-3 text-sm md:mt-0 md:ml-6">
                            <nuxt-link to="/" class="whitespace-nowrap font-medium text-blue-700 hover:text-blue-600">
                                Početna <span aria-hidden="true">&rarr;</span></nuxt-link>
                        </p>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
import {Component, Vue} from "nuxt-property-decorator";
import TextField from "@/components/inputs/TextField";
import ActionButton from "@/components/actionButtons/ActionButton";

@Component({
    components: {ActionButton, TextField},
})

export default class zaboravljenasifra extends Vue {
    email = '';
    loading = false;
    messageSent = false;

    async sendResetMail() {
        this.loading = true;

        try {
            await this.$axios.post('/reset/password', {email: this.email})

            this.messageSent = true;
        } catch (e) {
            if (e.response.status) {
                this.$toast.open({
                    message: "Došlo je do greške, pokušajte ponovo",
                    type: 'error',
                    duration: 5000
                });
            }
            this.loading = false;
        }
    }
}
</script>

<style scoped lang="scss">
@mixin for-laptop {
    @media (min-width: 768px) and (max-width: 1023px) {
        @content;
    }
}

@mixin for-desktop-up {
    @media (min-width: 1200px) {
        @content;
    }
}

@mixin for-big-desktop-up {
    @media (min-width: 1800px) {
        @content;
    }
}

@mixin for-phone-only {
    @media (max-width: 599px) {
        @content;
    }
}

.form-wrapper {
    width: 700px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    overflow-y: scroll;
    padding: 10px;
    height: 100vh;
    justify-content: flex-start;

    .inner {
        width: 70%;
        margin: 0 auto;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        @include for-phone-only {
            width: 100%;
        }
    }


    @include for-phone-only {
        width: 100%;
        padding: 24px 16px;
        height: 100%;
        min-height: 100vh;
        justify-content: flex-start;


    }

    h2 {
        font-weight: 500;
        font-size: 24px;
        margin-bottom: 36px;
        text-align: left;
    }
}

button {
    width: 100%;
    margin-top: 16px;
}

label {
    font-weight: 600;
    font-size: 15px;
    padding-bottom: 8px !important;
}

.logo {
    width: 120px;
    margin: 36px auto;
}

.first-part {
    font-size: 20px;
    font-weight: 600;
    font-family: 'NunitoSans', sans-serif;;
    color: #002F34;
    margin-left: 5px;
}

.second-part {
    font-size: 20px;
    font-weight: 500;
    font-family: 'NunitoSans', sans-serif;;
    color: #002F34;
}

.img-logo {
    width: 160px;
    margin: 0 auto;
    margin-bottom: 46px;
    cursor: pointer;
    height: auto;
}

.login-u {
    width: 100%;
    padding-top: 24px;
    margin-top: 24px;
    border-top: 1px solid #f1f1f1;

    p {
        min-width: fit-content;
        margin-right: 8px;
        color: #727272;
    }

    a {
        &:hover {
            text-decoration: underline;
            cursor: pointer;
        }
    }
}

form {
    width: 100%;
}

::v-deep button {
    background: #FC8709;
    color: #fff !important;
    border: none;
}
</style>
