<template>
  <div id="map"></div>
</template>

<script>
import { Component, Vue, Prop, Watch} from "nuxt-property-decorator";
import InfoWindow from '@/components/InfoWindow'

@Component({
})
export default class SearchMap extends Vue{

  @Prop({ type: Array, default: ()=>[]}) locations;
  @Prop({
    type: Object,
    default: () => { return { lat: 43.8563, lng: 18.4131 } }
  }) center;
  @Prop() current;
  @Prop() loaded;

  map = null;
  markers = [];
  markerCluster = null;
  zoom = 16;
  lastOpenedInfoWindow = null;

  mounted() {
    this.initMarkers();
  }

  @Watch('locations', {
    deep: true
  })
  reinitMarkers() {
    this.$nextTick(() => {
      this.initMarkers();
    })
  }

  @Watch('current')
  hoverHandle(newVal, oldVal) {
    if (newVal !== oldVal) {
      this.closeLastOpenedInfoWindow();

      if (this.markers[newVal]) {
        this.markers[newVal].info.open(this.map, this.markers[newVal]);
        this.lastOpenedInfoWindow = this.markers[newVal].info;
      }
    }
  }

  renderListingCard(listing) {
    let className = Vue.extend(InfoWindow)

    let instance = new className({
      propsData: {
        listing: listing
      },
      $moment: this.$moment
    });

    instance.$mount();

    return instance.$el;
  }

  closeLastOpenedInfoWindow() {
    if (this.lastOpenedInfoWindow) {
      this.lastOpenedInfoWindow.close();
    }
  }

  initMarkers() {
    const uluru = { lat: 43.8563, lng: 18.4131 };

    const map = new google.maps.Map(document.getElementById("map"), {
      zoom: 16,
      center: uluru,
      mapId: '90b8b95b1bbd0bc9'
    });

    this.map = map;

    const svgMarker = {
      path: "M12 22c0 18 20 40 20 40s20-22 20-40a20 20 0 0 0-40 0zm12 0a8 8 0 1 1 8 8 8 8 0 0 1-8-8z",
      fillColor: "#234176",
      fillOpacity: 1,
      strokeColor: "#234176",
      strokeWeight: 3,
      rotation: 0,
      scale: 0.7,
      anchor: new google.maps.Point(15, 30),
    };


    this.markers = this.locations.map(item => {
      let loc = {
        lat: parseFloat(item.location.lat),
        lng: parseFloat(item.location.lng)
      }

      let marker = new google.maps.Marker({
        position: loc,
        map: map,
        icon: svgMarker,
        clickable: true,
      });

      let self = this;

      marker.info = new google.maps.InfoWindow({
        content: this.renderListingCard(item)
      });

      google.maps.event.addListener(marker, 'click', function() {
        self.closeLastOpenedInfoWindow();
        marker.info.open(map, marker);
        self.lastOpenedInfoWindow = marker.info;
      });

      return marker;
    });
  }
}
</script>

<style scoped lang="scss">
#map {
  height: calc(100vh - 60px);
  width: 100%;
  outline: none !important;
  border: none !important
}

::v-deep .gm-style-iw {
  padding-right: 0px;
  padding-bottom: 0px;
  max-width: 270px !important;
  max-height: 356px;
  min-width: 0px;
  padding: 0 !important;
}

  ::v-deep .gm-style-iw-c {
    box-shadow: none !important;
  }


::v-deep .gm-ui-hover-effect {
  z-index: 9999 !important;
  background: #fff !important;
  border-raidus: 5px!important;
  height: 20px!important;
  width: 20px!important;
  right: 8px!important;
  top: 8px!important;
  display: flex!important;
  align-items: center!important;
  justify-content: center!important;
  font-weight: bold !important;
  outline: none !important;
  border: none !important;
}
</style>
