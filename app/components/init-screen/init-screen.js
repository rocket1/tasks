import React from 'react';
import {connect} from 'react-redux';
import {StyleSheet, View, Text} from 'react-native';
import {loadInitRegion} from '../../redux/actions';
import LocationService from "../location-service/location-service";
import {DEBUG_HOME_COORDS} from "../common/constants";

class ConnectedInitScreen extends React.Component {

    /**
     * Used by react-navigation
     * @param navigation
     */
    static navigationOptions = {
        title: 'Home',
    };

    /**
     *
     * @param props
     */
    constructor(props) {
        super(props);
        this._initRegion();
    }

    /**
     *
     * @private
     */
    _initRegion() {
        (new LocationService).getCurrentRegion((region) => {
            this.props.loadInitRegion(region);
            this.props.navigation.navigate('Tasks');
        });
    }

    /**
     *
     * @returns {*}
     */
    render() {
        return (
            <View><Text>Loading tasks...</Text></View>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        loadInitRegion: region => dispatch(loadInitRegion(region))
    };
};

const InitScreen = connect(null, mapDispatchToProps)(ConnectedInitScreen);

export default InitScreen;


