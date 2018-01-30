import {TASK_T_ORDERED, TASK_T_UNORDERED} from "./task";
import {LAT_RANGE, LNG_RANGE} from "../common/constants";

class TaskEvaluator {

    /**
     *
     * @param task
     * @param marker
     * @returns {*}
     */
    evaluate(task, marker) {

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

        const step = steps[0];

        if (this._withinRange(step.marker.coordinate, coord)) {
            steps.unshift();
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
        return steps.map((step) => {
            return this._withinRange(step.marker.coordinate, coord);
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

        const latMin = stepCoord.latitude - (LAT_RANGE / 2);
        const lngMin = stepCoord.longitude - (LNG_RANGE / 2);
        const latMax = latMin + LAT_RANGE;
        const lngMax = lngMin + LNG_RANGE;

        const cLat = coord.latitude;
        const cLng = coord.longitude;

        console.log('latMin,lngMin', latMin, ',', lngMin, 'latMax,lngMax', latMax, ',', lngMax);

        return (cLat >= latMin) && (cLat <= latMax) && (cLng >= lngMin) && (cLng <= lngMin);
    }
}

export default TaskEvaluator;
