import LocationService from './location-service';
import {LOCATION_POLL_INTERVAL} from '../common/constants';

class LocationPoll {

    _timeout = null;
    _locService;

    /**
     *
     */
    constructor() {
        this._locService = new LocationService;
    }

    /**
     *
     */
    startPoll(callback) {

        this.stopPoll();

        this._timeout = setTimeout(() => {
            this._locService.getCurrentMarker((location) => {
                callback(location);
                this.startPoll(callback);
            });

        }, LOCATION_POLL_INTERVAL)
    }

    /**
     *
     */
    stopPoll() {
        if (this._timeout) {
            clearTimeout(this._timeout);
        }
        this._timeout = null;
    }
}

export default LocationPoll;
