import {TASK_T_ORDERED, TASK_T_UNORDERED} from "./task";
import LocationService from "../location-service/location-service";
import {COMPLETE_STEP_STATE, INCOMPLETE_STEP_STATE} from "./step-state";
import {CIRCLE_MARKER_T, POLYGON_MARKER_T} from "../location-service/marker-types";
import {CIRCLE_RADIUS} from "../common/constants";
import geolib from 'geolib';
import {COMPLETE_TASK_STATE} from "./task-state";

class TaskEvaluator {

    /**
     *
     * @private
     */
    _taskComplete(task) {
        return task.steps.find(step => step.stepState === INCOMPLETE_STEP_STATE) === undefined;
    }

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

        if (this._taskComplete(newTask)) {
            newTask.taskState = COMPLETE_TASK_STATE;
        }

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

            let firstIncompleteStep = steps.find((step) => {
                return step.stepState === INCOMPLETE_STEP_STATE;
            });

            firstIncompleteStep = this._markCompleteIfInRange(firstIncompleteStep, coord);
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
     * @param coord
     * @returns {*}
     * @private
     */
    _markCompleteIfInRange(step, coord) {

        let rangeFunc;

        switch (step.marker.markerType) {
            case POLYGON_MARKER_T:
                rangeFunc = this._withinRangePolygon;
                break;
            case CIRCLE_MARKER_T:
                rangeFunc = this._withinRangeCircle;
                break;
            default:
                throw new Error('Marker type not found.');
        }

        if (rangeFunc(step.marker.coordinate, coord)) {
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
    _withinRangePolygon(stepCoord, coord) {

        const {latMin, lngMin, latMax, lngMax} = (new LocationService).getPolygonBounds(stepCoord);

        const cLat = coord.latitude;
        const cLng = coord.longitude;

        // TODO: Look at how this is affected by North versus South hemisphere :(
        return (cLat >= latMin) && (cLat <= latMax) && (cLng >= lngMin) && (cLng <= lngMax);
    }

    /**
     *
     * @param stepCoord
     * @param coord
     * @returns {boolean}
     * @private
     */
    _withinRangeCircle(stepCoord, coord) {
        return geolib.isPointInCircle(
            stepCoord,
            coord,
            CIRCLE_RADIUS
        );
    }
}

export default TaskEvaluator;
