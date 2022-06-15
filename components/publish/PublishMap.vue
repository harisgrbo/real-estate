<template>
    <div id="map"></div>
</template>

<script>
import {Component, Prop, Vue, Watch} from "nuxt-property-decorator";

@Component({})

export default class PublishMap extends Vue {

    @Prop({
        type: Object, default: () => {
        }
    }) location;

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
            zoom: 17,
            center: center,
            mapId: '90b8b95b1bbd0bc9',
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
            position: center,
            map: this.map,
            icon: svgMarker,
            draggable: true
        });

        google.maps.event.addListener(this.marker, 'dragend', function (e) {
            self.$emit('latlng', {
                lat: e.latLng.lat(),
                lng: e.latLng.lng()
            })
        })

    }


    @Watch('location', {deep: true})
    onLocationChanged(val, oldVal) {
        this.map.setCenter({lng: parseFloat(this.location.location.lng), lat: parseFloat(this.location.location.lat)})

        this.moveBus(this.map, this.marker);
    }

    moveBus(map, marker) {
        this.marker.setPosition(new google.maps.LatLng(this.location.location.lat, this.location.location.lng));
        this.map.panTo(new google.maps.LatLng(this.location.location.lat, this.location.location.lng));
    };
}
</script>

<style scoped lang="scss">
#map {
    border-radius: 6px;
    margin-top: 24px;
    height: 400px;
    /* The height is 400 pixels */
    width: 100%;
    /* The width is the width of the web page */
}
</style>
