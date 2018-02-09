export const GEO_OPTIONS = {
    enableHighAccuracy: true,
    timeInterval: 1000,
    distanceInterval: 1
};

// TODO: Maybe play with these values,
// or maybe make them dynamic based on config for the step.
export const LAT_RANGE = .0001;
export const LNG_RANGE = .00015;

export const CIRCLE_RADIUS = 15; // in meters

export const TASK_DESC_MAP = {
    ORDERED: "To complete this task, visit all the places in order.",
    UNORDERED: "To complete this task, visit all the places in no particular order.",
    VISIT: "To complete this task, visit the location."
};

export const LAT_DELTA = .001;
export const LNG_DELTA = .001;
