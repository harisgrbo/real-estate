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

  // @Watch('loaded')
  // updateOnLoaded(newVal, oldVal) {
  //   if (newVal && ! oldVal) {
  //     this.initMarkers()
  //   }
  // }

  map = null;
  markers = [];
  markerCluster = null;
  zoom = 6;
  lastOpenedInfoWindow = null;

  mounted() {
    console.log(this.locations)
    let zoom = 6;

    this.map = new google.maps.Map(document.getElementById('map'), {
      zoom: zoom,
      center: this.center,
      strictBounds: true,
      // minZoom: 8,
      // maxZoom: 8,
      // restriction: {
      //   latLngBounds: {
      //     north: 15.75,
      //     south: 42.65,
      //     east: 19.6,
      //     west: 45.233,
      //   },
      // },
    });

    this.map.addListener("dragend", this.setLocation)
    this.map.addListener("zoom_changed", this.setLocation)

    this.initMarkers();

  }

  openInfo() {
    console.log('test')
  }

  // renderListingCard(listing) {
  //   let className = Vue.extend(InfoWindow)
  //
  //   let instance = new className({
  //     propsData: {
  //       listing: listing
  //     },
  //     $moment: this.$moment
  //   });
  //
  //   instance.$mount();
  //
  //   return instance.$el;
  // }

  initMarkers() {
    // if (this.markerCluster) this.markerCluster.clearMarkers();

    this.markers = this.locations.map(item => {
      let loc = {
        lat: parseFloat(item.location.lat),
        lng: parseFloat(item.location.lng)
      }

      let marker = new google.maps.Marker({
        position: loc,
        clickable: true
      });

      let self = this;
      //
      // marker.info = new google.maps.InfoWindow({
      //   content: this.renderListingCard(item)
      // });

      google.maps.event.addListener(marker, 'click', function() {
        self.closeLastOpenedInfoWindow();
        marker.info.open(self.map, marker);
        self.lastOpenedInfoWindow = marker.info;
      });

      return marker;

    });

    // this.markerCluster = new MarkerClusterer(this.map, this.markers, {
    //   imagePath:
    //     "https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m",
    // });
  }

  repaint() {
    this.initMarkers()
  }

  setLocation() {
    if (! this.map) return;

    let center = {
      lat: this.map.getCenter().lat(),
      lng: this.map.getCenter().lng()
    };

    this.$emit('center', center);

    let aNorth = this.map
      .getBounds()
      .getNorthEast()
      .lat();
    let aEast = this.map
      .getBounds()
      .getNorthEast()
      .lng();
    let aSouth = this.map
      .getBounds()
      .getSouthWest()
      .lat();
    let aWest = this.map
      .getBounds()
      .getSouthWest()
      .lng();

    let br = [aSouth,  aEast];
    let tl = [aNorth, aWest];

    this.$emit("changed", {
      br: br,
      tl: tl
    });
  }
  closeLastOpenedInfoWindow() {
    if (this.lastOpenedInfoWindow) {
      this.lastOpenedInfoWindow.close();
    }
  }
}
</script>

<style scoped lang="scss">
#map {
  height: 100vh;
  /* The height is 400 pixels */
  width: 100%;
  /* The width is the width of the web page */
}
</style>
