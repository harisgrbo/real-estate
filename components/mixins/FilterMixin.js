export default {
  props: {
    filter: {
      required: true,
      type: Object
    },
    attr: {
      type: Boolean,
      default: false
    },
    value: {}
  },
  data () {
    return {
      set: false
    }
  },
  created() {
    if (this.value) {
      this.set = true
    }
  },

  computed: {
    displayName() {
      return this.filter.display_name || this.filter.name;
    }
  },

  methods: {
    clear() {
      this.set = false;
      this.$emit('clear')
    },

    buildValue(type, value, name = null) {
      return {
        name: name || this.filter.name,
        attr: this.attr,
        value: value,
        type: type
      }
    }
  }
}
