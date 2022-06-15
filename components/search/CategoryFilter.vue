<template>
    <div class="category-filter">
        <ul class="flex flex-row items-center justify-start w-full pb-4">
            <li
                v-for="category in categories"
                :key="category.id"
                :class="['font-normal text-sm mr-4 cursor-pointer', value && category.id === value.value ? 'rounded-4 p-2 bg-gray-100' : '']"
                @click="handleChange($event, category.id)"
            >{{ category.title }}
            </li>
        </ul>
    </div>
</template>

<script>
import FilterMixin from "./FilterMixin.js";
import {Component, Prop, Vue} from "nuxt-property-decorator";

@Component({
    mixins: [FilterMixin]
})
export default class CategoryFilter extends Vue {
    @Prop({
        required: true,
        type: Array
    }) categories;

    @Prop({
        required: false
    }) filter;

    handleChange(e, id) {
        let data = this.buildValue("match", id, "category_id");
        this.$emit("input", data);
    }
};
</script>

<style lang="scss" scoped>

</style>
