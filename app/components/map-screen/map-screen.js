import React from 'react';
import MapView from 'react-native-maps';
import {View, Text} from 'react-native';
import {connect} from 'react-redux';
import StepList from './step-list';
import LocationService from '../location-service/location-service';
import styles from './map-screen-styles';

class ConnectedMapScreen extends React.Component {

    // static navigationOptions = {
    //     title: 'Map',
    // };

    static navigationOptions = ({navigation}) => ({
        title: navigation.state.params.title,
    });

    state = {
        region: null,
        markers: []
    };

    _ref;

    /**
     *
     * @param props
     */
    constructor(props) {
        super(props);
        this._setInitRegion = this._setInitRegion.bind(this);
        this._onMapReady = this._onMapReady.bind(this);
        this._setRegion = this._setRegion.bind(this);
        this._setMarkers = this._setMarkers.bind(this);
        this._onRegionChange = this._onRegionChange.bind(this);
        this._task = this.props.loadedTask;
        this._locService = new LocationService;
    }

    /**
     *
     */
    componentDidMount() {
        this._setInitRegion();
        console.log('componentDidMount');
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
    _setMarkers(markers) {
        this.setState({
            markers: markers
        });
    }

    /**
     *
     * @param marker
     * @private
     */
    _addMarker(marker) {

        this.setState({
            markers: [...this.state.markers, marker]
        });
    }

    /**
     *
     * @private
     */
    _setInitRegion() {
        this._locService.getCurrentRegion((region) => {
            this._locService.getCurrentMarker((marker) => {
                this._setRegion(region);
                const markers = this._task.steps.map((step) => {
                    return step.marker;
                });
                this._setMarkers(markers);
                this._addMarker(marker);
            })
        });
    };

    /**
     *
     * @param region
     */
    _onRegionChange = (region) => {
        // this._setRegion(location);
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
        // console.log('ref? ' , this._ref);
        setTimeout(() => {
            // console.log('fitting?');
            // this._ref.fitToSuppliedMarkers(
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

        if (this.state.region) {

            return (
                <View style={styles.container}>
                    <MapView
                        ref={(ref) => {
                            this._ref = ref;
                        }}
                        onLayout={this._onLayout}
                        mapType="hybrid"
                        style={styles.map}
                        region={this.state.region}
                        zoomControlEnabled={true}
                        onRegionChange={this._setRegion}
                        onRegionChangeComplete={this._onRegionChangeComplete}
                        onMapReady={this._onMapReady}>

                        {this.state.markers.map((marker, index) => (
                            <MapView.Marker
                                coordinate={marker.coordinate}
                                key={index}
                                pinColor={marker.pinColor}
                            />
                        ))}

                    </MapView>

                    <View style={styles.info}>
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

