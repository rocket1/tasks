import {Platform} from 'react-native';
import {Constants, Location, Permissions} from 'expo';
import {GEO_OPTIONS} from "../common/constants";

class LocationService {

    _killFunc;
    _permsOk = false;

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
    _getLocation(callback) {
        Location.getCurrentPositionAsync().then((location) => {
            if ("coords" in location) {
                callback(location);
            }
            else {
                throw new Error('coords not available in location.');
            }
        });
    }

    /**
     *
     * @param callback
     */
    getCurrentRegion(callback) {

        this._getLocation((location) => {

            const coords = location.coords;

            const cbReturn = {
                latitude: coords.latitude,
                longitude: coords.longitude,
                latitudeDelta: 0.03,
                longitudeDelta: 0.03,
            };

            callback(cbReturn);
        });
    }

    /**
     *
     * @param callback
     */
    getCurrentMarker(callback) {

        this._getLocation((marker) => {

            const coords = marker.coords;

            const cbReturn = {
                "coordinate": {
                    latitude: coords.latitude,
                    longitude: coords.longitude
                }
            };

            callback(cbReturn);
        });
    }

    /**
     *
     * @param callback
     */
    startPoll(callback) {
        this.stopPoll();
        this._killFunc = Location.watchPositionAsync(GEO_OPTIONS, callback);
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
