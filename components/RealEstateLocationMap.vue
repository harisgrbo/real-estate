<template>
    <div id="map"></div>
</template>

<script>
import {Component, Prop, Vue, Watch} from "nuxt-property-decorator";

@Component({})
export default class RealEstateLocationMap extends Vue {

    @Prop({}) location;

    map = null;
    marker = {}

    mounted() {
        if (location !== null) {
            let self = this;
            let center = {
                lat: parseFloat(self.location.lat),
                lng: parseFloat(self.location.lng)
            };
            // The map, centered at Uluru
            this.map = new google.maps.Map(document.getElementById("map"), {
                zoom: 17,
                center: {
                    lat: parseFloat(self.location.lat),
                    lng: parseFloat(self.location.lng)
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
                    lat: parseFloat(self.location.lat),
                    lng: parseFloat(self.location.lng)
                },
                map: this.map,
                icon: svgMarker
            });

        }
    }

    @Watch('location', {deep: true})
    onLocationChanged(val, oldVal) {
        this.map.setCenter({lng: parseFloat(this.location.lng), lat: parseFloat(this.location.lat)})

        this.moveBus(this.map, this.marker);
    }

    moveBus(map, marker) {
        this.marker.setPosition(new google.maps.LatLng(this.location.lat, this.location.lng));
        this.map.panTo(new google.maps.LatLng(this.location.lat, this.location.lng));
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
    border-radius: 6px;
    height: 400px;
    /* The height is 400 pixels */
    width: 100%;
    /* The width is the width of the web page */

    @include for-phone-only {
        height: 200px;
    }
}
</style>
