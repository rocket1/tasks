import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, View, Text, Button, TouchableOpacity} from 'react-native';

class TaskListItem extends React.PureComponent {

    /**
     *
     * @private
     */
    _onSelectTask = () => {
        this.props.onSelectTask(this.props.id);
    };

    /**
     *
     * @returns {XML}
     */
    render() {

        return (
            <TouchableOpacity onPress={this._onSelectTask} style={styles.taskListItem}>
                <View>
                    <Text>
                        {this.props.title}
                    </Text>
                </View>
            </TouchableOpacity>
        );
    }
}

TaskListItem.propTypes = {
    onSelectTask: PropTypes.func,
    title: PropTypes.string,
    id: PropTypes.string
};

const styles = StyleSheet.create({
    taskListItem: {
        flex: 1,
        backgroundColor: '#ffffff',
        height: 48,
        marginTop: 1,
        padding: 3,
        alignItems: 'flex-start',
        justifyContent: 'center'
    },

});

export default TaskListItem;

