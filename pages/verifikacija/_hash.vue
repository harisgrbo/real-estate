<template>
    <div v-if="success" class="success">
        <div class="rounded-md bg-green-50 p-4">
            <div class="flex">
                <div class="flex-shrink-0">
                    <!-- Heroicon name: solid/check-circle -->
                    <svg class="h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                         fill="currentColor" aria-hidden="true">
                        <path fill-rule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                              clip-rule="evenodd"/>
                    </svg>
                </div>
                <div class="ml-3">
                    <h3 class="text-sm font-medium text-green-800">Verifikacija uspješna</h3>
                    <div class="mt-2 text-sm text-green-700">
                        <p>Uspješno ste verifikovali email.</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {Component, Vue} from "nuxt-property-decorator";
import Navbar from "@/components/includes/Navbar";
import Footer from "@/components/Footer"

@Component({
    middleware: ['auth'],
    components: {Navbar, Footer},
    layout: (ctx) => ctx.$device.isMobile ? 'mobile' : 'settings',
})

export default class Verifikacija extends Vue {
    success = false;

    async mounted() {
        await this.verify();
    }

    async verify() {
        this.success = false;

        try {
            const hash = this.$route.params.hash;
            const expires = this.$route.query.expires || '';
            const signature = this.$route.query.signature || '';
            const id = this.$auth.user.id;

            await this.$axios.get(`/email/verify/${id}/${hash}?signature=${signature}&expires=${expires}`);

            this.success = true;

            await this.$auth.fetchUser();
        } catch (e) {
            alert("Nismo u mogućnosti da vam verifikujemo email");
        }
    }
}
</script>

<style lang="scss">
@mixin for-phone-only {
    @media (max-width: 599px) {
        @content;
    }
}

.success {
    @include for-phone-only {
        padding: 24px;
    }
}
</style>
