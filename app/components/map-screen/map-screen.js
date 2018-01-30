import React from 'react';
import MapView from 'react-native-maps';
import {View, Text} from 'react-native';
import {connect} from 'react-redux';
import StepList from './step-list';
import LocationService from '../location-service/location-service';
import styles from './map-screen-styles';
import TaskEvaluator from "../task/task-evaluator";
import {TASK_DESC_MAP} from "../common/constants";

class ConnectedMapScreen extends React.Component {

    /**
     * Used by react-navigation
     * @param navigation
     */
    static navigationOptions = ({navigation}) => ({
        title: navigation.state.params.title,
    });

    state = {
        initRegion: null,
        region: null,
        markers: [],
        myMarker: null
    };

    _mapRef;
    _isMounted;

    /**
     *
     * @param props
     */
    constructor(props) {

        super(props);

        this._task = this.props.loadedTask;

        this._setInitRegion = this._setInitRegion.bind(this);
        this._onMapReady = this._onMapReady.bind(this);
        this._setRegion = this._setRegion.bind(this);
        this._setTaskMarkers = this._setTaskMarkers.bind(this);
        this._onRegionChange = this._onRegionChange.bind(this);

        this._locService = new LocationService;
    }

    /**
     *
     */
    componentWillMount() {
        this._setInitRegion();
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
        this._setInitRegion();
        this._setTaskMarkers();
        this._startLocationPoll();

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

        this._locService.startPoll((marker) => {

            if (this._isMounted) {

                const myMarker = {
                    'title': 'My Location',
                    'pinColor': '#ffff00',
                    'coordinate': {
                        'longitude': marker.coords.longitude,
                        'latitude': marker.coords.latitude,
                    }
                };

                this._setMyMarker(myMarker);

                this._task = (new TaskEvaluator).evaluateMarker(this._task, myMarker);
            }
        });
    }

    /**
     *
     * @private
     */
    _onMapReady() {
        this._setInitRegion();
        console.log('onMapReady');
    }

    /**
     *
     * @param region
     * @private
     */
    _setRegion(region) {
        this.setState({
            region: region
        });
    }

    /**
     *
     * @private
     */
    _setTaskMarkers() {

        const markers = this._task.steps.map((step) => {
            return step.marker;
        });

        this.setState({
            markers: markers
        });
    }

    _setMyMarker(marker) {
        this.setState({
            myMarker: marker
        });
    }

    /**
     *
     * @private
     */
    _setInitRegion() {
        this._locService.getCurrentRegion((region) => {
            console.log('Setting initial region:', region);
            this.setState({
                initRegion: region,
                region: region
            });
        });
    };

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
        console.log('onRegionChangeComplete');
    };

    _onLayout = () => {
        console.log('onLayout');
        // console.log('ref? ' , this._mapRef);
        setTimeout(() => {
            // console.log('fitting?');
            // this._mapRef.fitToSuppliedMarkers(
            //     this.state.markers,
            //     false, // not animated
            // );
        }, 2000);
    };

    _onSelectStep = () => {

    };

    /**
     *
     * @returns {XML}
     */
    render() {

        if (this.state.initRegion) {

            const myMarker = this.state.myMarker ? <MapView.Marker
                coordinate={this.state.myMarker.coordinate}
                key='0'
                pinColor={this.state.myMarker.pinColor}
            /> : null;

            return (
                <View style={styles.container}>
                    <MapView
                        ref={(ref) => {
                            this._mapRef = ref;
                        }}
                        onLayout={this._onLayout}
                        mapType="hybrid"
                        style={styles.map}
                        initialRegion={this.state.initRegion}
                        region={this.state.region}
                        zoomControlEnabled={true}
                        onRegionChange={this._setRegion}
                        onRegionChangeComplete={this._onRegionChangeComplete}
                        onMapReady={this._onMapReady}>

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
        loadedTask: state.loadedTask
    };
};

const MapScreen = connect(mapStateToProps)(ConnectedMapScreen);

export default MapScreen;

