import React from 'react';
// import MapView from 'react-native-maps';
import {StyleSheet, View, Text} from 'react-native';

class MapScreen extends React.Component {

    static navigationOptions = {
        title: 'Map',
    };

    render() {
        return (
            <View style={styles.container}>

                {/*<MapView*/}
                    {/*initialRegion={{*/}
                        {/*latitude: 37.78825,*/}
                        {/*longitude: -122.4324,*/}
                        {/*latitudeDelta: 0.0922,*/}
                        {/*longitudeDelta: 0.0421,*/}
                    {/*}}*/}
                {/*/>*/}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default MapScreen;

