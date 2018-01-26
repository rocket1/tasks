import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import TaskList from '../task-list/task-list';
import {connect} from "react-redux";

class ConnectedTaskScreen extends React.Component {

    static navigationOptions = {
        title: 'Tasks',
    };

    /**
     *
     * @returns {XML}
     */
    render() {

        const {navigate} = this.props.navigation;

        return (
            <View style={styles.container}>
                <Text>This is a list of tasks</Text>
                <TaskList navigate={navigate} tasks={this.props.tasks}/>
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

const mapStateToProps = state => {
    return {tasks: state.tasks};
};

const TaskScreen = connect(mapStateToProps)(ConnectedTaskScreen);

export default TaskScreen;

