import {TASK_T_ORDERED, TASK_T_UNORDERED} from "./task";
import LocationService from "../location-service/location-service";

class TaskEvaluator {

    /**
     *
     * @param task
     * @param marker
     * @returns {*}
     */
    evaluateMarker(task, marker) {

        let newSteps = task.steps;
        const coord = marker.coordinate;

        if (task.taskType === TASK_T_ORDERED) {
            newSteps = this._handleOrdered(newSteps, coord);
        }
        else if (task.taskType === TASK_T_UNORDERED) {
            newSteps = this._handleUnordered(newSteps, coord);
        }

        task.steps = newSteps;
        return task;
    }

    /**
     *
     * @param steps
     * @param coord
     * @returns {*}
     * @private
     */
    _handleOrdered(steps, coord) {

        if (steps.length > 0) {

            const firstStep = steps[0];

            if (this._withinRange(firstStep.marker.coordinate, coord)) {
                steps.shift();
            }
        }

        return steps;
    }

    /**
     *
     * @param steps
     * @param coord
     * @returns {*}
     * @private
     */
    _handleUnordered(steps, coord) {
        return steps.filter((step) => {
            return !this._withinRange(step.marker.coordinate, coord);
        });
    }

    /**
     *
     * @param stepCoord
     * @param coord
     * @returns {boolean}
     * @private
     */
    _withinRange(stepCoord, coord) {

        const {latMin, lngMin, latMax, lngMax} = (new LocationService).getPolygonBounds(stepCoord);
        const cLat = coord.latitude;
        const cLng = coord.longitude;

        console.log('cLat,cLng', cLat, ',', cLng, 'latMin,lngMin', latMin, ',', lngMin, 'latMax,lngMax', latMax, ',', lngMax, '(cLat >= latMin)', (cLat >= latMin), '(cLat <= latMax)', (cLat <= latMax), '(cLng >= lngMin)', (cLng >= lngMin), '(cLng >= lngMin)', (cLng >= lngMin));

        // TODO: Look at how this is affected by North versus South hemisphere :(
        return (cLat >= latMin) && (cLat <= latMax) && (cLng >= lngMin) && (cLng >= lngMin);
    }
}

export default TaskEvaluator;
