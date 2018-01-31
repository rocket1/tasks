import React from 'react';
import {Provider} from 'react-redux';
import store from './app/redux/store';
import {StackNavigator} from 'react-navigation';
import TaskScreen from "./app/components/task-screen/task-screen";
import MapScreen from "./app/components/map-screen/map-screen";
import InitScreen from "./app/components/init-screen/init-screen";

const Navigator = StackNavigator({
    Init: {screen: InitScreen},
    Tasks: {screen: TaskScreen},
    Map: {screen: MapScreen}
});

export default class App extends React.Component {

    /**
     *
     * @returns {XML}
     */
    render() {
        return (
            <Provider store={store}>
                <Navigator/>
            </Provider>
        );
    }
}
