import React from 'react';
import MapView from 'react-native-maps';
import {StyleSheet, View, Text} from 'react-native';

class MapScreen extends React.Component {

    static navigationOptions = {
        title: 'Map',
    };

    constructor(props) {
        super(props);
        this.state = {
            region: {
                latitude: 37.78825,
                longitude: -122.4324,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            },
            markers: [],
        };
    }

    onRegionChange = (region) => {
        this.setState({region});
    };

    onMapPress = (e) => {
        this.setState({
            markers: [
                ...this.state.markers,
                {
                    coordinate: e.nativeEvent.coordinate,
                    key: `marker_${this.state.markers.length}`,
                },
            ],
        });
    };

    render() {
        return (
            <View>
                <Text>Maps!</Text>
                <MapView
                    region={this.state.region}
                    onRegionChange={this.onRegionChange}
                    onPress={this.onMapPress}>

                    {this.state.markers.map(marker => (
                        <MapView.Marker
                            coordinate={marker.coordinate}
                            key={marker.key}
                        />
                    ))}

                </MapView>
            </View>
        );
    }
}
//
// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: '#fff',
//         alignItems: 'center',
//         justifyContent: 'center',
//     },
// });

export default MapScreen;

