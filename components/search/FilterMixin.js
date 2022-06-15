import {Component, Prop, Vue} from 'nuxt-property-decorator';

@Component({})
export default class FilterMixin extends Vue {

    @Prop({
        required: true,
        type: Object
    }) filter;

    @Prop({
        type: Boolean,
        default: false
    }) attr;

    @Prop({}) value;

    set = false;

    created() {
        if (this.value) {
            this.set = true
        }
    }

    get displayName() {
        return this.filter.display_name || this.filter.name;
    }

    clear() {
        this.set = false;
        this.$emit('clear')
    }

    buildValue(type, value, name = null) {
        return {
            name: name || (this.attr ? this.filter.id + '' : this.filter.name),
            attr: this.attr,
            value: value,
            type: type
        }
    }
}
