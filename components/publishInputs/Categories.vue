<template>
    <div class="categories-list-wrap w-full">
        <ul v-if="loading === false" role="list"
            class="pb-6 flex flex-col lg:grid up:grid xl:grid xl:grid-cols-2 lg:grid-cols-2 up:grid-cols-2 gap-6 w-full">
            <li v-for="(cat, index) in categories" :key="index" @click="selectCategory(cat)"
                class="relative border text-wrap"
                :class="[ 'flow-root', selectedCategory !== null? (cat.id === selectedCategory.id? 'selected': ''): null ]">
                <div class="w-full text-semibold title">
                    {{ cat.title }}
                </div>
                <div class="flex">
                    <img :src="'/cats/' + cat.slug + '.png'" alt="" />
                </div>
            </li>
        </ul>
        <LoadingBar v-else :override="true"></LoadingBar>
    </div>
</template>

<script>
import {Component, Vue} from "nuxt-property-decorator";

@Component({})
export default class Categories extends Vue {
    categories = []
    selectedCategory = null;
    loading = false;

    async fetchCategories() {
        this.loading = true;
        try {
            let response = await this.$axios.get('/categories');
            this.categories = response.data.data;

            this.loading = false;
        } catch (e) {
            console.log(e)
        }
    }

    selectCategory(c) {
        this.selectedCategory = c;
        this.$emit('selected-category', c);
    }

    async created() {
        await this.fetchCategories();
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

.categories-list-wrap {
    width: 100%;
    display: flex;
    justify-content: center;
    position: relative;

    @include for-phone-only {
        padding-bottom: 15px;
    }

    .loading {
        height: 40px;
    }
}

.selected {
    border: 2px solid #1F2937;
    font-weight: 600 !important;


    @include for-phone-only {
        background: #f9f9f9 !important;
        border: 2px solid #000 !important;
    }
}

a {
    font-weight: 400;
    color: #000;
    font-size: 16px;

    &:hover, &:active, &:visited {
        outline: none;
        border: none;
    }
}

ul {
    @include for-phone-only {
        grid-gap: 12px;
        display: grid;
        grid-template-columns: repeat(2, 1fr);
    }
}

ul li {
    -webkit-box-align: center !important;
    -webkit-box-pack: justify !important;
    background-color: #fff !important;
    border: 1px solid #f1f1f1 !important;
    background: #f1f1f1 !important;
    color: #000 !important;
    box-sizing: border-box !important;
    border-radius: 4px !important;
    display: flex !important;
    justify-content: space-between !important;
    align-items: center !important;
    width: 100% !important;
    min-height: 68px !important;
    cursor: pointer !important;
    padding: 0px 16px !important;
    outline: none !important;
    font-weight: 600;

    img {
        height: auto;
        width: 60px !important;
    }

    @include for-phone-only {
        border: 1px solid #f1f1f1 !important;
        background: #fff !important;
        color: #000 !important;
        padding: 12px !important;
        width: 100% !important;
        min-height: fit-content;
        height: fit-content;
        flex-direction: column-reverse !important;
        justify-content: center !important;
        align-items: center !important;
        border-radius: 8px;
        font-weight: 600 !important;
        display: flex;
        max-height: fit-content;

        img {
            height: 50px;
            width: 50px;
            border-radius: 7px;
        }

        .title {
            text-align: center;
            margin-top: 6px;
            font-size: 16px;
            font-weight: 400;
        }
    }
}
</style>
