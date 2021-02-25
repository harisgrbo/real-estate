<template>
  <div id="map"></div>
</template>

<script>
import { Component, Vue, Prop} from "nuxt-property-decorator";

@Component({
})

export default class SearchMap extends Vue{

  @Prop({ type: Array, default: ()=>[]}) locations;
  @Prop({
    type: Object,
    default: () => { return { lat: 43.8563, lng: 18.4131 } }
  }) center;
  @Prop() loaded;


  map = null;
  markers = [];
  markerCluster = null;
  zoom = 6;
  lastOpenedInfoWindow = null;

  mounted() {
    this.initMarkers();
  }

  initMarkers() {
    const uluru = { lat: 43.8563, lng: 18.4131 };

    const map = new google.maps.Map(document.getElementById("map"), {
      zoom: 14,
      center: uluru,
      mapId: '90b8b95b1bbd0bc9'
    });

    const svgMarker = {
      path:
        "M12 0c-4.198 0-8 3.403-8 7.602 0 6.243 6.377 6.903 8 16.398 1.623-9.495 8-10.155 8-16.398 0-4.199-3.801-7.602-8-7.602zm0 11c-1.657 0-3-1.343-3-3s1.342-3 3-3 3 1.343 3 3-1.343 3-3 3z",
      fillColor: "#D63946",
      fillOpacity: 1,
      strokeColor: "#D63946",
      strokeWeight: 3,
      rotation: 0,
      scale: 2,
      anchor: new google.maps.Point(15, 30),
    };

    this.markers = this.locations.map(item => {
      let loc = {
        lat: parseFloat(item.location.lat),
        lng: parseFloat(item.location.lng)
      }

      console.log(loc, 'loc na rezultatima')

      const marker = new google.maps.Marker({
        position: loc,
        map: map,
        icon: svgMarker
      });

      return marker;

    });
  }
}
</script>

<style scoped lang="scss">
#map {
  height: 100vh;
  width: 100%;
}
</style>
