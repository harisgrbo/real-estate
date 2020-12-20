<template>
  <div>
    pretraga
  </div>
</template>

<script>
import { Component, Vue} from "nuxt-property-decorator";

@Component({
  components: {
  },
  layout() { return "home" },
  async asyncData(ctx) {
    let results = [];
    let meta = {
      categories: [],
      aggregations: []
    };
    let query = [];
    let queryPayload = {}

    if (ctx.route.query.q) {
      try {
        let response = await ctx.app.$axios.get(`/listings/search?q=${ctx.route.query.q}`)
        results = response.data.data;
        meta = response.data.meta;
        query = JSON.parse(ctx.route.query.q)
        console.log(response, ' res')

        query.forEach(item => {
          queryPayload[item.name] = Object.assign({}, item);
        });

        console.log(response)
      } catch (e) {
        // @TODO: Error handling
      }
    }

    return {
      results,
      meta,
      queryPayload
    }
  },

})

export default class Homepage extends Vue {
}
</script>

<style scoped>

</style>
