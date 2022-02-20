<template>
  <div id="map"></div>
</template>

<script>
import { Component, Vue, Prop, Watch} from "nuxt-property-decorator";
import InfoWindow from '@/components/InfoWindow'

@Component({})
export default class SearchMap extends Vue{
  @Prop({ type: Array, default: ()=>[]}) locations;
  @Prop({
    type: Object,
    default: () => { return { lat: 43.8563, lng: 18.4131 } }
  }) center;
  @Prop() current;
  @Prop() loaded;
  @Prop({ type: Number, default: 14 }) zoom;

  map = null;
  markers = [];
  markerCluster = null;
  lastOpenedInfoWindow = null;
  boundsChangedListener = null;

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

  boundsChangedHandler() {
    let bounds = this.map.getBounds();

    let center = bounds.getCenter();
    let ne = bounds.getNorthEast();

    let r = 3963.0;

    let lat1 = center.lat() / 57.2958;
    let lon1 = center.lng() / 57.2958;
    let lat2 = ne.lat() / 57.2958;
    let lon2 = ne.lng() / 57.2958;

    let dis = r * Math.acos(Math.sin(lat1) * Math.sin(lat2) +
      Math.cos(lat1) * Math.cos(lat2) * Math.cos(lon2 - lon1));

    this.$emit('moved', {
      dist: dis,
      lat: center.lat(),
      lng: center.lng(),
      zoom: this.map.getZoom()
    })
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
    const uluru = this.center;

    const map = new google.maps.Map(document.getElementById("map"), {
      zoom: this.zoom,
      center: uluru,
      mapId: '90b8b95b1bbd0bc9',
      // disableDefaultUI: false,
      fullscreenControl: true,
    });

    this.map = map;
    this.map.addListener('dragend', this.boundsChangedHandler);
    this.map.addListener('zoom_changed', this.boundsChangedHandler);

    const image = {
      url: 'http://www.homedepot.com/catalog/swatchImages/35/04/04a604de-8b52-4cd8-a394-6286f00b438d_35.jpg',
    };

    this.markers = this.locations.map(item => {
      let loc = {
        lat: parseFloat(item.location.lat),
        lng: parseFloat(item.location.lng)
      }

      let marker = new google.maps.Marker({
        position: loc,
        map: map,
        clickable: true,
        icon: image,
        label: {
          text: item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + ' KM' ,
          color: 'black',
          fontSize: '15px',
          fontWeight: 'bold',
          className: 'marker-label'
        }
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

::v-deep .marker-label {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  border-radius: 28px;
  box-shadow: rgb(0 0 0 / 4%) 0px 0px 0px 1px inset, rgb(0 0 0 / 18%) 0px 2px 4px;
  color: rgb(255, 255, 255);
  height: 28px;
  padding: 0px 8px;
  position: relative;
  transform: scale(1);
  transform-origin: 50% 50%;
  transition: transform 250ms cubic-bezier(0, 0, 0.1, 1) 0s;
  transition: 0.3s all ease;

  &:hover {
    transform: scale(1.4);
  }
}
::v-deep .gmnoprint img { max-width: none; }

::v-deep img {
  max-width: 100% !important;
}

.gmnoprint img {
  max-width: none;
}

.gmaps * {box-sizing: content-box;}
</style>
