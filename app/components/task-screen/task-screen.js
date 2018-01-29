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
     * @param taskId
     * @private
     */
    _onSelectTask = (taskId) => {
        this.props.loadTask(taskId);
        const title = this.props.tasks.find((task) => task.id === taskId).title;
        this.props.navigation.navigate('Map', {title: title});
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
        loadTask: taskId => dispatch(loadTask(taskId))
    };
};

const TaskScreen = connect(mapStateToProps, mapDispatchToProps)(ConnectedTaskScreen);

export default TaskScreen;

