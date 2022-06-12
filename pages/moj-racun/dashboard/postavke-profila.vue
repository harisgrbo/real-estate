<template>
    <div v-if="initialInfoLoaded" class="w-full">
        <div class="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-3 xl:grid-cols-3 up:grid-cols-3 gap-4">
            <TextField v-model="id" label="ID broj" placeholder="1234567"></TextField>
            <TextField v-model="web" label="Web adresa" placeholder="www.adresa.ba"></TextField>
            <TextField v-model="location" label="Lokacija" placeholder="Sarajevo"></TextField>
        </div>
        <div class="flex flex-col sm:ml-0 my-6">
            <div class="border-2 border-dashed shadow-sm border-gray-200 dark:border-dark-5 rounded-md p-5">
                <div class="h-auto relative image-fit cursor-pointer zoom-in mx-auto">
                    <img v-show="banner_url !== '' && banner_url != null" class="banner-wrap w-full rounded-md" alt=""
                         :src="banner_url">
                    <div title="Remove this profile photo?"
                         class="tooltip w-5 h-5 flex items-center justify-center absolute rounded-full text-white bg-theme-24 right-0 top-0 -mr-2 -mt-2">
                        <i data-feather="x" class="w-4 h-4"></i></div>
                </div>
                <div class="mx-auto cursor-pointer relative mt-5">
                    <action-button @action="updateProfileInfo" placeholder="Promijeni baner na profilu"></action-button>

                    <input @change="updateBanner" type="file" class="w-full h-full top-0 left-0 absolute opacity-0">
                </div>
            </div>
        </div>
        <label class="px-2 text-md pb-2 font-semibold text-gray-900">O vama</label>
        <client-only>
            <vue-editor class="mt-2" v-model="description"/>
        </client-only>
        <action-button :loading="loading" @action="updateProfileInfo" class="mt-4"
                       placeholder="Sačuvaj"></action-button>
    </div>
    <div v-else>
        <LoadingBar :override="true"></LoadingBar>
    </div>
</template>

<script>
import {Component, Vue} from "nuxt-property-decorator";
import TextField from "@/components/inputs/TextField";
import ActionButton from "@/components/actionButtons/ActionButton"
import TextAreaField from "../../../components/inputs/TextAreaField";
import LoadingBar from "../../../components/LoadingBar";

@Component({
    components: {
        LoadingBar,
        TextAreaField,
        TextField,
        ActionButton,
    },
    middleware: ['auth'],
    layout() {
        return "home"
    }
})
export default class urediProfil extends Vue {
    id = '';
    initialInfoLoaded = false;
    location = '';
    description = '';
    web = '';
    banner_url = '';
    agency = {
        external_id: '',
        location: '',
        description: '',
        web: '',
        banner_url: ''
    };
    loading = false;

    async created() {
        await this.fetchMyAgency();
        this.setInputs();
        this.initialInfoLoaded = true;
    }

    async updateBanner(event) {
        if (event.target.files.length) {
            let image = event.target.files[0];
            let formData = new FormData();
            formData.append('banner', image);

            try {
                await this.$axios.post('/profile/business/banner', formData, {
                    'headers': {
                        'Content-Type': 'multipart/form-data'
                    }
                })

                await this.fetchMyAgency();
                this.setInputs();
            } catch (e) {
                alert("Baner nije moguce postaviti")
            }
        }
    }

    setInputs() {
        this.id = this.agency.external_id;
        this.location = this.agency.location;
        this.description = this.agency.description;
        this.web = this.agency.web;
        this.banner_url = this.agency.banner_url;
    }

    async fetchMyAgency() {
        try {
            this.agency = (await this.$axios.get('/profile/business')).data.data;
        } catch (e) {
            console.log(e)
        }
    }

    async updateProfileInfo() {
        this.loading = true;
        try {
            let payload = {};

            if (this.id !== this.agency.id) {
                payload.external_id = this.id
            }

            if (this.location !== this.agency.location) {
                payload.location = this.location;
            }

            if (this.web !== this.agency.web) {
                payload.web = this.web;
            }

            if (this.description !== this.agency.description) {
                payload.description = this.description;
            }

            await this.$axios.put('/profile/business', payload)

            this.$toast.open({
                message: "Uspješno ste se spasili izmjene!",
                type: 'success',
                duration: 5000
            });

            this.loading = false;
        } catch (error) {
            this.loading = false;

            console.log(error)
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

.content {
    @include for-phone-only {
        padding-top: 0;
    }
}

.box {
    box-shadow: none;
    border-bottom: 1px solid #f1f1f1;
    padding-bottom: 24px;
}

.banner-wrap {
    height: fit-content;
    max-height: 200px;
    width: auto;
}
</style>

