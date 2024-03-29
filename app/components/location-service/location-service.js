import {Platform} from 'react-native';
import {Constants, Location, Permissions} from 'expo';
import {DEBUG_HOME_COORDS, GEO_OPTIONS, LAT_DELTA, LAT_RANGE, LNG_DELTA, LNG_RANGE} from "../common/constants";
import geolib from 'geolib';

class LocationService {

    _killFunc;
    _currentLatLng;

    /**
     *
     */
    constructor() {
        if (Platform.OS === 'android' && !Constants.isDevice) {
            throw new Error('Oops, geolocation will not work on Sketch in an Android emulator. Try it on your device!')
        }
    }

    /**
     *
     */
    _getCoords(callback) {
        Location.getCurrentPositionAsync().then((location) => {
            if ("coords" in location) {
                callback(location.coords);
            }
            else {
                throw new Error('coords not available in location.');
            }
        });
    }

    /**
     *
     * @returns {*}
     */
    getCurrentRegion(callback) {

        this._getCoords((coords) => {

            const currRegion = {
                ...coords,
                latitudeDelta: LAT_DELTA,
                longitudeDelta: LNG_DELTA
            };

            callback(currRegion);
        });
    };

    /**
     *
     * @param coords
     * @returns {{latitude: number, longitude: number, latitudeDelta: number, longitudeDelta: number}}
     */
    getRegion(coords) {

        const bounds = this.getBounds(coords);
        const center = geolib.getCenter(coords);
        const latDelta = bounds.maxLat - bounds.minLat;
        const lngDelta = bounds.maxLng - bounds.minLng;
        const latFudge = latDelta * 1.1;
        const lngFudge = lngDelta * 1.2;

        const region = {
            latitude: Number.parseFloat(center.latitude),
            longitude: Number.parseFloat(center.longitude),
            latitudeDelta: latDelta + latFudge,
            longitudeDelta: lngDelta + lngFudge
        };

        return region;
    }

    /**
     *
     * @param coord
     * @returns {{latMin: number, lngMin: number, latMax: *, lngMax: *}}
     */
    getPolygonBounds(coord) {

        // Map increase LAT going north.
        // Map increases LNG going east.

        const latMin = coord.latitude - (LAT_RANGE / 2);
        const lngMin = coord.longitude - (LNG_RANGE / 2);

        return {
            latMin: latMin,
            lngMin: lngMin,
            latMax: latMin + LAT_RANGE,
            lngMax: lngMin + LNG_RANGE
        }
    }

    /**
     *
     * @param coord
     */
    getPolygon(coord) {
        const {latMin, lngMin, latMax, lngMax} = this.getPolygonBounds(coord);
        return [
            {
                latitude: latMin,
                longitude: lngMin,
            },
            {
                latitude: latMax,
                longitude: lngMin,
            },
            {
                latitude: latMax,
                longitude: lngMax,
            },
            {
                latitude: latMin,
                longitude: lngMax,
            },
        ]
    }

    /**
     *
     * @param coordArray
     */
    getBounds(coordArray) {
        return geolib.getBounds(coordArray);
    }

    /**
     *
     * @param callback
     */
    startPoll(callback) {

        this.stopPoll();

        this._killFunc = Location.watchPositionAsync(GEO_OPTIONS, (location) => {

            let latLng = {
                latitude: location.coords.latitude,
                longitude: location.coords.longitude
            };

            this._currentLatLng = latLng;
            callback(latLng);
        });
    }

    /**
     *
     */
    stopPoll() {
        if (this._killFunc && 'remove' in this._killFunc) {
            this._killFunc.remove();
        }
    }
}

export default LocationService;
