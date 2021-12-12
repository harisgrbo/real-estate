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

.categories-list {
  display: flex;
  flex-direction: column;
  padding: 12px;

  @include for-phone-only {
    padding: 16px !important;
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

.content {
  ::v-deep ul {
    @include for-phone-only {
      grid-template-columns: repeat(2, 1fr);
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
