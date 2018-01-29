class LocationService {

    /**
     *
     */
    _getLocation(callback) {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition((location) => {
                if ("coords" in location) {
                    callback(location);
                }
                else {
                    throw new Error('coords not available in location.');
                }
            });
        } else {
            throw new Error('geolocation not available.');
        }
    }

    /**
     *
     * @param callback
     */
    getCurrentRegion(callback) {
        this._getLocation((location) => {
            const coords = location.coords;
            const cbReturn = {
                latitude: 45.523229,
                longitude: -122.584917,
                latitudeDelta: 0.03,
                longitudeDelta: 0.03,
            };
            // const cbReturn = {
            //     latitude: coords.latitude,
            //     longitude: coords.longitude,
            //     latitudeDelta: 2,
            //     longitudeDelta: 2,
            // };
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
                "taskId": 0,
                "title": "Current Location",
                "pinColor": "#ffff00",
                "coordinate": {
                    latitude: 45.523229,
                    longitude: -122.584917
                }
            };

            // const cbReturn = {
            //     "title": "Current Location",
            //     "coordinate": {
            //         latitude: coords.latitude,
            //         longitude: coords.longitude
            //     }
            // };

            callback(cbReturn);
        });
    }
}

export default LocationService;
