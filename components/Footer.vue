<template>
    <!-- This example requires Tailwind CSS v2.0+ -->
    <!-- This example requires Tailwind CSS v2.0+ -->
    <footer class="bg-white footer-main" aria-labelledby="footer-heading">
        <div class="max-w-7xl mx-auto">
            <div class="xl:grid xl:grid-cols-3 xl:gap-8">
                <div class="mt-12 mobile-footer grid grid-cols-3 gap-8 xl:mt-0 xl:col-span-2">
                    <div>
                        <h3 class="text-sm font-semibold text-gray-900 font-bold tracking-wider">Linkovi</h3>
                        <ul role="list" class="mt-4">
                            <li>
                                <nuxt-link to="/prijavi-gresku" class="text-sm text-black font-normal tracking-wider">
                                    Prijavi grešku na stranici
                                </nuxt-link>
                            </li>


                            <li>
                                <nuxt-link to="/agencije" class="text-sm text-black font-normal tracking-wider">
                                    Agencije
                                </nuxt-link>
                            </li>


                            <li>
                                <nuxt-link to="/investitori" class="text-sm text-black font-normal tracking-wider">
                                    prodaja sarajevo
                                </nuxt-link>
                            </li>


                            <li>
                                <nuxt-link to="/paketi" class="text-sm text-black font-normal tracking-wider">
                                    iznajmljivanje
                                </nuxt-link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 class="text-sm font-semibold text-gray-900 font-bold tracking-wider">MojKvadrat.ba</h3>
                        <ul role="list" class="mt-4">
                            <li>
                                <nuxt-link to="/kontakt" class="text-sm text-black font-normal tracking-wider">
                                    Kontaktirajte nas
                                </nuxt-link>
                            </li>

                            <li>
                                <nuxt-link to="/o-nama" class="text-sm text-black font-normal tracking-wider"> O nama
                                </nuxt-link>
                            </li>

                            <li>
                                <nuxt-link to="/uslovi-koristenja"
                                           class="text-sm text-black font-normal tracking-wider"> Uslovi korištenja
                                </nuxt-link>
                            </li>
                        </ul>
                    </div>
                    <div class="contact-info">
                        <h3 class="text-sm font-semibold text-gray-900 font-bold tracking-wider">Kontakt informacije</h3>
                        <ul role="list" class="mt-4">
                            <li>
                                <p class="text-sm text-black font-normal tracking-wider"> HIM d.o.o. Sarajevo </p>
                            </li>

                            <li>
                                <p class="text-sm text-black font-normal tracking-wider"> Kranjčevićeva 11D </p>
                            </li>

                            <li>
                                <p class="text-sm text-black font-normal tracking-wider">+387 61 078 809 </p>
                            </li>

                            <li>
                                <p class="text-sm text-black font-normal tracking-wider">
                                    mojkvadratsarajevo@gmail.com</p>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="mt-12 border-t border-gray-200 pt-2">
                <p class="text-sm font-semibold text-black xl:text-cente copyright">&copy; {{ $moment().year() }} HIM d.o.o -
                    MojKvadrat.ba - sva prava zadržana.</p>
            </div>
        </div>
    </footer>
</template>
<script>
export default {
    name: "Footer.vue"
}
</script>
<style lang="scss" scoped>
@mixin for-phone-only {
    @media (max-width: 599px) {
        @content;
    }
}

footer {
    padding: 36px 0;
    background: #F2F2F2;
    margin-top: 48px;

    @include for-phone-only {
        padding: 0 24px;
        margin-top: 0;
    }

    img.logo {
        min-height: 56px !important;
        height: 56px !important;
        width: auto !important;
        @include for-phone-only {
            min-height: 40px !important;
            height: 40px !important;
            width: auto !important;
        }
    }
}

.mobile-footer {
    @include for-phone-only {
        padding-top: 24px;
        grid-template-columns: repeat(1, 1fr);
    }
}

li {
    margin-top: 12px;
    color: #757575 !important;

    a, p {
        color: #757575 !important;
        font-weight: 400 !important;
    }

    &:hover {
        text-decoration: underline;
    }
}

.copyright {
    font-weight: 200 !important;
}

h3 {
    font-weight: 600 !important;
    font-size: 14px;
}

.contact-info p:hover {
    text-decoration: none !important;
}

.footer-main {
    @include for-phone-only {
        padding-bottom: 100px !important;
        position: relative;
        z-index: 1;
    }
}
</style>

