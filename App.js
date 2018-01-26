import React from 'react';
import {StackNavigator} from 'react-navigation';
import TaskScreen from "./app/components/task-screen/task-screen";
import MapScreen from "./app/components/map-screen/map-screen";

const SimpleApp = StackNavigator({
    Tasks: {screen: TaskScreen},
    Map: {screen: MapScreen}
});

export default class App extends React.Component {
    render() {
        return <SimpleApp/>;
    }
}
