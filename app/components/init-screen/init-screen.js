import React from 'react';
import {connect} from 'react-redux';
import {StyleSheet, View, Text, Button, ActivityIndicator} from 'react-native';
import {loadInitRegion} from '../../redux/actions';
import LocationService from "../location-service/location-service";
import {DEBUG_HOME_COORDS} from "../common/constants";
import {BG_COLOR} from "../common/styles-common";

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

        this.state = {
            initDone: false
        };

        this._initRegion();
    }

    /**
     *
     * @private
     */
    _initRegion() {
        (new LocationService).getCurrentRegion((region) => {
            this.props.loadInitRegion(region);
            // setTimeout(() => {
                this.setState({
                    initDone: true
                });
            // }, 1000);
        });
    }

    _handleTaskBtnClick = () => {
        this.props.navigation.navigate('Tasks');
    };

    /**
     *
     * @returns {*}
     */
    render() {
        return (
            <View style={styles.mainView}>
                {/*{!this.state.initDone && <ActivityIndicator size="large" color="#000000"/>}*/}
                {this.state.initDone && <Button onPress={this._handleTaskBtnClick} title='My Tasks'/>}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    mainView: {
        backgroundColor: '#fff',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
});

const mapDispatchToProps = dispatch => {
    return {
        loadInitRegion: region => dispatch(loadInitRegion(region))
    };
};

const InitScreen = connect(null, mapDispatchToProps)(ConnectedInitScreen);

export default InitScreen;


