<template>
  <div id="map"></div>
</template>

<script>
import { Component, Vue, Prop, Watch} from "nuxt-property-decorator";

@Component({
})

export default class RealEstateLocationMap extends Vue{

  @Prop({}) location;

  map = null;
  zoom = 0;
  marker = {}
  nesto = [
    {
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#f5f5f5"
        }
      ]
    },
    {
      "elementType": "labels.icon",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#616161"
        }
      ]
    },
    {
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "color": "#f5f5f5"
        }
      ]
    },
    {
      "featureType": "administrative.land_parcel",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#bdbdbd"
        }
      ]
    },
    {
      "featureType": "poi",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#eeeeee"
        }
      ]
    },
    {
      "featureType": "poi",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#757575"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#e5e5e5"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#9e9e9e"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#ffffff"
        }
      ]
    },
    {
      "featureType": "road.arterial",
      "elementType": "labels",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "road.arterial",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#757575"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#dadada"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "labels",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#616161"
        }
      ]
    },
    {
      "featureType": "road.local",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "road.local",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#9e9e9e"
        }
      ]
    },
    {
      "featureType": "transit.line",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#e5e5e5"
        }
      ]
    },
    {
      "featureType": "transit.station",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#eeeeee"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#c9c9c9"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#9e9e9e"
        }
      ]
    }
  ]

  mounted() {
    if(location !== null) {
      let self = this;
      let center = {
        lat: parseFloat(self.location.location.lat),
        lng: parseFloat(self.location.location.lng)
      };
      // The map, centered at Uluru
      this.map = new google.maps.Map(document.getElementById("map"), {
        zoom: 15,
        center: {
          lat: parseFloat(self.location.location.lat),
          lng: parseFloat(self.location.location.lng)
        },
        disableDefaultUI: true,
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
      // The marker, positioned at Uluru
      this.marker = new google.maps.Marker({
        position: {
          lat: parseFloat(self.location.location.lat),
          lng: parseFloat(self.location.location.lng)
        },
        map: this.map,
        icon: svgMarker
      });

    }
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
@mixin for-phone-only {
  @media (max-width: 599px) {
    @content;
  }
}
#map {
  border-radius: 10px;
  height: 400px;
  /* The height is 400 pixels */
  width: 100%;
  /* The width is the width of the web page */

  @include for-phone-only {
    height: 200px;
  }
}
</style>
