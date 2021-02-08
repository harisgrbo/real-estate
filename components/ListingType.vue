<template>
  <div class="categories-list">
    <div class="modal-header">
      <h2>Izaberite vrstu oglasa</h2>
      <i class="material-icons" @click="$emit('close')">close</i>
    </div>
    <div class="content">
      <PublishRadioButton :options="listingTypes" @input="handleSelectedInput"></PublishRadioButton>
    </div>
  </div>
</template>

<script>
import { Component, Vue, Prop} from "nuxt-property-decorator";
import PublishRadioButton from "@/components/publishInputs/PublishRadioButton";

@Component({
  PublishRadioButton
})

export default class ListingType extends Vue{
  listingTypes = [];

  async created() {
    await this.fetchListingTypes();
  }

  async fetchListingTypes() {
    try {
      let res = await this.$axios.get('/listing_types');
      this.listingTypes = res.data.data;
    } catch(e) {
      console.log(e)
    }
  }

  handleSelectedInput(e) {
    this.$emit('selected-type', e);
  }
}
</script>

<style scoped lang="scss">
.categories-list {
  display: flex;
  flex-direction: column;
  padding: 0 24px;

  .modal-header {
    display: flex;
    align-items: center;
    height: 70px;
    border-bottom: 1px solid #dcdcdc;
    justify-content: space-between;

    h2 {
      font-size: 20px;
      font-weight: 500;
    }
  }

  .content {
    padding: 24px 0;

    ::v-deep ul {
      grid-template-columns: repeat(3, 1fr);

      .img-wrapper {
        margin-bottom: 0;
      }
    }
  }
}

::v-deep .radio-wrapper {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 24px;
  row-gap: 24px;

  label {
    margin-right: 0;
  }
}
</style>
