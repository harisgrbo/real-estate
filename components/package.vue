<template>
    <div class="package-wrapper hover:shadow-md">
        <div class="package-header">
            <p class="package-type">{{ packageType }}</p>
            <div>
                <b>{{ price }}</b>
                <p class="value">KM</p>
                <p class="charge">/mjesecno</p>
            </div>
            <p class="pdv">sa PDV-om</p>
        </div>
    </div>
</template>

<script>
import {Component, Prop, Vue} from "nuxt-property-decorator";

@Component({
    components: {},
})

export default class Package extends Vue {
    @Prop({}) packageType;
    @Prop({}) price;
}
</script>

<style scoped lang="scss">
.package-wrapper {
    display: flex;
    flex-direction: column;
    width: 100%;
    border-radius: 8px;
    overflow: hidden;
    background: #fff;

    .package-header {
        background: #fff;
        border: 1px solid #000;
        border-bottom: 10px solid #1B1E31;
        padding: 16px;
        color: #000;
        font-family: 'NunitoSans', sans-serif;;
        border-radius: 8px;

        .package-type {
            border-radius: 6px;
            font-size: 19px;
            width: fit-content;
            font-weight: 600;
            text-transform: uppercase;
            margin-bottom: 24px;
            color: #000;
        }

        > div {
            display: flex;
            flex-direction: row;
            align-items: flex-start;

            .value {
                font-size: 22px;
                font-weight: 600;
                margin-left: 8px;
            }

            b {
                font-size: 28px;
                font-weight: 600;
            }

            .charge {
                font-size: 22px;
                font-weight: 400;
            }
        }

        .pdv {
            margin-top: 12px;
            font-size: 15px;
            font-weight: 400;
        }
    }

    .package-content {
        padding: 0 24px;

        ul {
            width: 100%;
            display: flex;
            flex-direction: column;

            li {
                height: 60px;
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: flex-start;

                img {
                    margin-right: 12px;
                }
            }
        }

        button {
            height: 50px;
            border-radius: 8px;
            background: #0B8489;
            border: none;
            color: #fff;
            width: 100%;
            font-family: 'NunitoSans', sans-serif;;
            font-size: 15px;
            font-weight: 500;
            margin-bottom: 24px;
            cursor: pointer;

            &:focus {
                outline: none;
            }

        }
    }
}
</style>
