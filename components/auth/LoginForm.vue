<template>
    <div class="form-wrapper">
        <nuxt-img src="/mojkvadratnew.png" class="img-logo" alt="" @click="$router.push('/')" />

        <h2 class="mt-4">Prijava</h2>
        <form @submit.prevent.stop="handleLogin()">
            <TextField type="text" label="Email" placeholder="johndoe@mail.com" v-model="payload.username"
                       class="mb-6 mt-1"></TextField>
            <TextField type="password" label="Šifra" placeholder="*******" v-model="payload.password"
                       class="mt-1"></TextField>
            <ActionButton class="w-full" :style-options="{ color: '#fff', marginTop: '24px' }" :loading="loading"
                          type="submit" placeholder="Prijavi se"></ActionButton>
            <button class="google-btn" @click="handleGoogleLogin($event)">
                <nuxt-img src="/google-btn.png" alt="" />
                Prijavi se sa Google računom
            </button>
        </form>
        <div class="flex flex-row items-center justify-between w-full mt-4 pt-4 links">
            <div class="flex items-center text-left login-u">
                <nuxt-link :to="{ path: '/registracija' }" class="text-red-600">Registruj se</nuxt-link>
            </div>
            <div class="flex items-center text-right">
                <nuxt-link :to="{ path: '/zaboravljena-sifra' }" class="underline">Zaboravljena šifra?</nuxt-link>
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

export default class LoginForm extends Vue {
    payload = {
        grant_type: 'password',
        client_id: 2,
        client_secret: 'NxQqmRUUd4GWpAkNNwGpCilDYvhuU7E6C0xQSWuU',
        username: '',
        password: '',
    }
    loading = false;

    async handleGoogleLogin(e) {
        e.preventDefault();
        e.stopPropagation();
        try {
            let res = await this.$axios.get('/auth/google');

            window.location.replace(res.data.url);
        } catch (e) {
            console.log(e)
        }
    }

    async handleLogin(e) {
        this.loading = true;

        try {
            let res = await this.$auth.loginWith("local", {data: this.payload});
            // this.$auth.setUser(this.payload)
            this.$router.push('/')
        } catch (e) {
            if (e.response.status === 400) {
                this.$toast.open({
                    message: "Pogrešni podaci",
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
    width: 70%;
    margin: auto;
    display: flex;
    flex-direction: column;
    overflow-y: scroll;
    padding: 10px;
    justify-content: center;


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
    p {
        min-width: fit-content;
        margin-right: 8px;
        color: #727272;
    }

    a {
        width: fit-content;
        &:hover {
            text-decoration: underline;
            cursor: pointer;
        }
    }
}

.links {
    border-top: 1px solid #ededed;
}

::v-deep button {
    background: #FC8709;
    color: #fff !important;
    border: none;
}

.google-btn {
    display: flex;
    align-items: center;
    -webkit-transition: background-color 0.15s ease-in-out;
    transition: background-color 0.15s ease-in-out;
    border-radius: 4px;
    outline: none;
    font-size: 14px;
    font-weight: 600;
    line-height: 1;
    text-align: center;
    cursor: pointer;
    background-color: #f1f1f1;
    color: #343434 !important;
    justify-content: center;
    width: 100%;
    height: 36px;
    transition: 0.3s all ease;

    img {
        margin-right: 12px;
        height: auto;
        width: 20px;
    }

    &:hover {
        background: #e0e0e0;
    }
}
</style>
