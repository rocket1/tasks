import React from 'react';
import MapView from 'react-native-maps';
import {StyleSheet, View, Text} from 'react-native';
import {connect} from 'react-redux';
import StepList from './step-list';
import {
    LIST_ITEM_HEIGHT, BG_COLOR, LIST_HEADER_BG_COLOR, LIST_HEADER_TEXT_COLOR
} from '../common/styles-common';

class ConnectedMapScreen extends React.Component {

    static navigationOptions = {
        title: 'Map',
    };

    state = {
        region: {},
        markers: []
    };

    /**
     *
     * @param props
     */
    constructor(props) {
        super(props);
        this._setInitRegion = this._setInitRegion.bind(this);
        this._onMapReady = this._onMapReady.bind(this);
    }

    /**
     *
     */
    componentWillMount() {
        this._setInitRegion();
    }

    /**
     *
     * @private
     */
    _onMapReady() {
        this._setInitRegion();
    }

    /**
     *
     * @private
     */
    _setInitRegion() {

        const region = {
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
        };

        this.setState({region});
    }

    /**
     *
     * @param region
     */
    _onRegionChange = (region) => {
        this.setState({region});
    };

    _onSelectStep = () => {

    };

    /**
     *
     * @returns {XML}
     */
    render() {

        const task = this.props.loadedTask;

        return (
            <View style={styles.container}>
                <MapView
                    style={styles.map}
                    region={this.state.region}
                    onRegionChange={this._onRegionChange}
                    onMapReady={this._onMapReady}>

                    {this.state.markers.map(marker => (
                        <MapView.Marker
                            coordinate={marker.coordinate}
                            key={marker.key}
                        />
                    ))}

                </MapView>

                <View style={styles.info}>

                    <View style={styles.taskHeader}><Text style={styles.taskHeaderTitle}>{task.title}</Text></View>

                    <StepList steps={task.steps} onSelectStep={this._onSelectStep}/>
                </View>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        alignItems: 'center',
        backgroundColor: BG_COLOR
    },
    map: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: '50%',
    },
    info: {
        position: 'absolute',
        top: '50%',
        left: 0,
        right: 0,
        bottom: 0,
    },
    taskHeader: {
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        backgroundColor: LIST_HEADER_BG_COLOR,
        height: LIST_ITEM_HEIGHT,
        marginTop: 1,
        padding: 3,
    },
    taskHeaderTitle: {
        color: LIST_HEADER_TEXT_COLOR,
        fontWeight: 'bold'
    },
    stepList: {}
});

const mapStateToProps = state => {
    return {
        loadedTask: state.loadedTask
    };
};

const MapScreen = connect(mapStateToProps)(ConnectedMapScreen);

export default MapScreen;

