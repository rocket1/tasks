import {TASK_T_ORDERED, TASK_T_UNORDERED} from "./task";
import LocationService from "../location-service/location-service";
import {COMPLETE_STEP_STATE} from "./step-state";

class TaskEvaluator {

    /**
     *
     * @param task
     * @param marker
     * @returns {*}
     */
    evaluateMarker(task, marker) {

        const newTask = {...task};
        let newSteps = newTask.steps;
        const coord = marker.coordinate;

        if (newTask.taskType === TASK_T_ORDERED) {
            newSteps = this._handleOrdered(newSteps, coord);
        }
        else if (newTask.taskType === TASK_T_UNORDERED) {
            newSteps = this._handleUnordered(newSteps, coord);
        }

        newTask.steps = newSteps;
        return newTask;
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

            let firstStep = steps.find( (step) => {
                const stepComplete = step.stepState === COMPLETE_STEP_STATE;
                return step.stepState !== stepComplete;
            });

            steps[0] = this._markCompleteIfInRange(firstStep, coord);
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
            return this._markCompleteIfInRange(step, coord);
        });
    }

    /**
     *
     * @param step
     * @returns {*}
     * @private
     */
    _markCompleteIfInRange(step, coord) {
        if (this._withinRange(step.marker.coordinate, coord)) {
            step.stepState = COMPLETE_STEP_STATE;
        }
        return step;
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

        // TODO: Look at how this is affected by North versus South hemisphere :(
        return (cLat >= latMin) && (cLat <= latMax) && (cLng >= lngMin) && (cLng <= lngMax);
    }
}

export default TaskEvaluator;
