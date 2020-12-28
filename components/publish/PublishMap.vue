<template>
  <div id="map"></div>
</template>

<script>
import { Component, Vue, Prop, Watch} from "nuxt-property-decorator";

@Component({
})

export default class PublishMap extends Vue{

  @Prop({ type: Object, default: ()=>{}}) location;

  map = null;
  zoom = 12;
  marker = {}

  mounted() {
      let self = this;

      let center = {
        lat: parseFloat(self.location.location.lat),
        lng: parseFloat(self.location.location.lng)
      };
      // The map, centered at Uluru
      this.map = new google.maps.Map(document.getElementById("map"), {
        zoom: 12,
        center: center,
      });
      // The marker, positioned at Uluru
      this.marker = new google.maps.Marker({
        position: center,
        map: this.map,
      });

    }


  @Watch('location', { deep: true })
  onLocationChanged(val, oldVal) {
    this.map.setCenter({ lng: parseFloat(this.location.location.lng), lat: parseFloat(this.location.location.lat) })

    this.moveBus(this.map, this.marker);
  }

  moveBus( map, marker ) {
    this.marker.setPosition( new google.maps.LatLng( this.location.location.lat, this.location.location.lng ) );
    this.map.panTo( new google.maps.LatLng( this.location.location.lat, this.location.location.lng ) );
  };
}
</script>

<style scoped lang="scss">
#map {
  border-radius: 10px;
  margin-top: 24px;
  height: 400px;
  /* The height is 400 pixels */
  width: 100%;
  /* The width is the width of the web page */
}
</style>
