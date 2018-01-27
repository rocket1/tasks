import React from 'react';
import MapView from 'react-native-maps';
import {StyleSheet, View, Text} from 'react-native';
import {connect} from 'react-redux';

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

    /**
     *
     * @returns {XML}
     */
    render() {
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

                <Text style={styles.info}>{this.props.loadedTask.title}</Text>

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
        backgroundColor: '#ffffff'
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
    }
});

const mapStateToProps = state => {
    return {
        loadedTask: state.loadedTask
    };
};

const MapScreen = connect(mapStateToProps)(ConnectedMapScreen);

export default MapScreen;

