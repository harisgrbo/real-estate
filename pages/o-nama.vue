<template>
    <div class="packages-wrap">
        <h2>MojKvadrat.ba</h2>
        <p>MojKvadrat.ba u vlasništvu ... Sarajevo pruža online usluge prodaje, kupovine i iznajmljivanja
            nekretnina, rezervacije smještaja (booking sistem) samostalno ili uz pomoć agencija za nekretnine.</p>
        <p>Platforma omogućava korisnicima da pregledaju i postavljaju oglase za prodaju ili iznajmljivanje, rezervišu
            smještaj sa posebnim akcentom na stanove, kuće, garaže, zemljišta i poslovne prostore. Također možete
            reklamirati svoju kompaniju i usluge koje se pružaju na web stranici ako se odnose na tržište
            nekretnina.</p>
        <p>
            Oglašivačima nudimo mogućnost registracije kao agencije za nekretnine, ili kao investitora, uz pogodnosti
            koje su prikazane na stranici paketa.</p>
        <p>Za one koji traže nekretninu garantujemo konstantno širenje baze korisnika, oglasa za prodaju ili najam novih
            stanova i lokala sa sekundarnog tržišta kao i kompanija i usluga koje posluju u branši.</p>

        <div class="w-full flex flex-col info">
            <p>... Sarajevo</p>
            <p>Skraćeni naziv društva je: ...</p>
            <p>Sjedište Društva nalazi se ulici ..., u Sarajevu, naselje ..., Općina
                ...</p>
            <p>MBS: 65-01-0226-19</p>
            <p>Tel: +387 61 078 809</p>
            <p>Mail: mojkvadratsarajevo@gmail.com</p>
        </div>
    </div>
</template>

<script>
import {Component, Vue} from "nuxt-property-decorator";
import AgencyPackages from "../components/AgencyPackages";

@Component({
    components: {
        AgencyPackages,
    },
    layout: (ctx) => ctx.$device.isMobile ? 'mobile' : 'home',
})

export default class Onama extends Vue {
}
</script>

<style scoped lang="scss">
@mixin for-phone-only {
    @media (max-width: 599px) {
        @content;
    }
}

.packages-wrap {
    display: flex;
    width: 1280px;
    margin: 0 auto;
    margin-top: 120px;
    min-height: 600px;
    flex-direction: column;

    h2 {
        font-size: 28px;
        font-weight: 500;
        margin-bottom: 36px;
    }

    p {
        font-size: 16px;
        font-weight: 300;
        margin-bottom: 12px;
        line-height: 21px;
    }

    @include for-phone-only {
        padding: 24px;
        width: 100%;
        margin-top: 0;
    }

    .info {
        margin-top: 48px;
        border-top: 1px solid #f1f1f1;
        padding-top: 32px;

        p {
            font-size: 14px;
            font-weight: 600;
        }
    }
}
</style>
