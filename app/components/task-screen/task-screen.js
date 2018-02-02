import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import TaskList from '../task-list/task-list';
import {connect} from 'react-redux';
import {loadTask} from '../../redux/actions';
import {BG_COLOR} from '../common/styles-common';

class ConnectedTaskScreen extends React.Component {

    /**
     * Used by react-navigation
     * @param navigation
     */
    static navigationOptions = {
        title: 'Tasks',
    };

    /**
     *
     * @param task
     * @private
     */
    _onSelectTask = (task) => {
        this.props.loadTask(task);
        this.props.navigation.navigate('Map', {title: task.title});
    };

    /**
     *
     * @returns {XML}
     */
    render() {
        return (
            <View style={styles.container}>
                <TaskList onSelectTask={this._onSelectTask} tasks={this.props.tasks}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: BG_COLOR,
    },
});

const mapStateToProps = state => {
    return {
        tasks: state.tasks,
        loadedTask: state.loadedTask
    };
};

const mapDispatchToProps = dispatch => {
    return {
        loadTask: task => dispatch(loadTask(task))
    };
};

const TaskScreen = connect(mapStateToProps, mapDispatchToProps)(ConnectedTaskScreen);

export default TaskScreen;

