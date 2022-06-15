<template>
    <div class="preview-wrapper-inner mx-auto w-full">
        <div class="inner">
            <div class="advertising-options">
                <ul>
                    <li v-for="(option, index) in advertising_options" :key="index" @click="selectAdvertisment(option)"
                        :class="[selectedAdvertisment === option.id ? 'selected' : '']">
                        <img :src="selectedAdvertisment === option.id ? '/GreenCheck.svg' : '/EmptyCheck.svg'" alt="">
                        <img src="/IzdvojenaKategorija.svg" alt="mainoption" class="main">
                        <div class="text-wrapper">
                            <p>{{ option.title }}</p>
                            <!--                      <p>{{ option.description }}</p>-->
                        </div>
                    </li>
                </ul>
            </div>
            <div class="advertising-calculator">
                <ActionButton placeholder="Sponzoriši"
                              :style-options="{ color: '#fff', height: '48px', marginTop: '36px' }"
                              @action="highlightListing"></ActionButton>
            </div>
        </div>
    </div>
</template>

<script>
import {Component, Vue} from "nuxt-property-decorator";

@Component({
    components: {},
    layout: (ctx) => ctx.$device.isMobile ? 'mobile' : 'settings',
    middleware: ['auth']
})
export default class Sponzorisanje extends Vue {
    advertising_options = [];
    selectedAdvertisment = null;

    async created() {
        await this.fetchSponsorship()
    }

    async fetchSponsorship() {
        try {
            let res = await this.$axios.get('/sponsorship/packages');
            this.advertising_options = res.data.data;

            if (this.advertising_options.length) {
                this.selectedAdvertisment = this.advertising_options[0].id;
            }
        } catch (e) {
            console.log(e)
        }
    }

    selectAdvertisment(o) {
        this.selectedAdvertisment = o.id;
    }

    async highlightListing() {
        try {
            let res = await this.$axios.post('/listings/' + this.$route.params.id + '/sponsor', {
                sponsorship_id: this.selectedAdvertisment
            })

            this.$toast.open({
                message: "Uspješno ste se sponzorisali oglas",
                type: 'error',
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
}


.content {
    display: flex;
    flex-direction: column;
    margin-top: 36px;

    .grid-cards {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        grid-column-gap: 24px;
        grid-row-gap: 24px;
        padding: 0;

        @include for-phone-only {
            grid-template-columns: repeat(2, 1fr);
            grid-column-gap: 12px;
            grid-row-gap: 12px;
        }

        ::v-deep a {
            width: 100%;
        }


        ::v-deep .image-wrapper img {
            width: 100%;

            @include for-phone-only {
                height: 254px;
                min-height: 254px;
            }
        }
    }
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

.content {
    @include for-phone-only {
        padding: 0;
    }
}
</style>
