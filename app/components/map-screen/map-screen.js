import React from 'react';
import MapView from 'react-native-maps';
import {View, Text} from 'react-native';
import {connect} from 'react-redux';
import StepList from './step-list';
import LocationService from '../location-service/location-service';
import styles from './map-screen-styles';
import TaskEvaluator from "../task/task-evaluator";
import {DEBUG_HOME_COORDS, TASK_DESC_MAP} from "../common/constants";
import {loadInitRegion} from "../../redux/actions";

class ConnectedMapScreen extends React.Component {

    /**
     * Used by react-navigation
     * @param navigation
     */
    static navigationOptions = ({navigation}) => ({
        title: navigation.state.params.title,
    });

    state = {
        region: null,
        markers: [],
        polygons: [],
        myMarker: null
    };

    _mapRef;
    _isMounted;
    _locService;
    _taskEvaluator;

    /**
     *
     * @param props
     */
    constructor(props) {

        super(props);

        this._task = this.props.loadedTask;

        this._onMapReady = this._onMapReady.bind(this);
        this._setRegion = this._setRegion.bind(this);
        this._setTaskMarkers = this._setTaskMarkers.bind(this);
        this._onRegionChange = this._onRegionChange.bind(this);

        this._locService = new LocationService;
        this._taskEvaluator = new TaskEvaluator;
    }

    /**
     *
     */
    componentDidMount() {

        /**
         * TODO: Use Emitter for this maybe.
         * See: https://medium.com/@TaylorBriggs/your-react-component-can-t-promise-to-stay-mounted-e5d6eb10cbb
         */

        this._isMounted = true;

        const markers = this._task.steps.map((step) => {
            return step.marker;
        });

        this._setTaskMarkers(markers);
        this._setPolygons(markers);

        console.log('componentDidMount');
    }

    /**
     *
     */
    componentWillUnmount() {
        this._locService.stopPoll();
        this._isMounted = false;
        console.log('componentWillUnmount');
    }

    /**
     *
     * @private
     */
    _startLocationPoll() {

        this._locService.startPoll((coords) => {

            if (this._isMounted) {

                const myMarker = {
                    'title': 'My Location',
                    'pinColor': '#ffff00',
                    "coordinate": coords
                };

                // console.log('mymarker:', myMarker);
                this._setMyMarker(myMarker);
                this._task = this._taskEvaluator.evaluateMarker(this._task, myMarker);
            }
        });
    }

    /**
     *
     * @private
     */
    _onMapReady() {
        console.log('onMapReady');
    }

    /**
     *
     * @param region
     * @private
     */
    _setRegion(region) {
        // this.setState({
        //     region: region
        // });
    }

    /**
     *
     * @private
     */
    _setTaskMarkers(markers) {
        this.setState({
            markers: markers
        });
    }

    /**
     *
     * @param marker
     * @private
     */
    _setMyMarker(marker) {
        this.setState({
            myMarker: marker
        });
    }

    /**
     *
     * @param markers
     * @private
     */
    _setPolygons(markers) {

        const polygons = markers.map((marker) => {
            return this._locService.getPolygon(marker.coordinate);
        });

        this.setState({
            polygons: polygons
        });
    }

    /**
     *
     * @param region
     */
    _onRegionChange = (region) => {
        console.log('onRegionChange');
    };

    /**
     *
     */
    _onRegionChangeComplete = () => {
        // console.log('onRegionChangeComplete');
    };

    _onLayout = () => {
        this._startLocationPoll();
    };

    _onSelectStep = () => {

    };

    /**
     *
     * @returns {XML}
     */
    render() {

        if (this.props.initRegion) {

            const myMarker = this.state.myMarker ? <MapView.Marker
                coordinate={this.state.myMarker.coordinate}
                key='0'
                pinColor={this.state.myMarker.pinColor}
            /> : null;

            const polyGons = this.state.polygons.map((polygon, index) => (
                    <MapView.Polygon
                        key={index}
                        coordinates={polygon}
                        fillColor="rgba(0, 200, 0, 0.5)"
                        strokeColor="rgba(0,0,0,0.5)"
                        strokeWidth={2}
                    />
                )
            );

            return (
                <View style={styles.container}>
                    <MapView
                        ref={(ref) => {
                            this._mapRef = ref;
                        }}
                        onLayout={this._onLayout}
                        mapType="hybrid"
                        style={styles.map}
                        initialRegion={this.props.initRegion}
                        region={this.state.region ? this.state.region : this.props.initRegion}
                        zoomControlEnabled={true}
                        onRegionChange={this._setRegion}
                        onRegionChangeComplete={this._onRegionChangeComplete}
                        onMapReady={this._onMapReady}>

                        {polyGons}

                        {myMarker}

                        {this.state.markers.map((marker, index) => (
                            <MapView.Marker
                                coordinate={marker.coordinate}
                                key={index}
                                pinColor={marker.pinColor}
                            />
                        ))}

                    </MapView>

                    <View style={styles.info}>

                        <View style={styles.taskHeader}><Text
                            style={styles.taskHeaderTitle}>{TASK_DESC_MAP[this._task.taskType]}</Text></View>

                        <StepList steps={this._task.steps} onSelectStep={this._onSelectStep}/>
                    </View>

                </View>
            );
        }
        else {
            return null;
        }
    }
}

const mapStateToProps = state => {
    return {
        initRegion: state.initRegion,
        loadedTask: state.loadedTask
    };
};

const MapScreen = connect(mapStateToProps)(ConnectedMapScreen);

export default MapScreen;

