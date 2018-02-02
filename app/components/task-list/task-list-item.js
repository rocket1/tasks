import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, View, Text, Button, TouchableOpacity} from 'react-native';
import {LIST_ITEM_HEIGHT, LIST_ITEM_BG_COLOR, PAD_UNIT} from '../common/styles-common';

class TaskListItem extends React.Component {

    shouldComponentUpdate(nextProps) {
        const differentTitle = this.props.title !== nextProps.title;
        const differentDone = this.props.done !== nextProps.done
        return differentTitle || differentDone;
    }

    /**
     *
     * @private
     */
    _onSelectTask = () => {
        this.props.onSelectTask({...this.props});
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
        backgroundColor: LIST_ITEM_BG_COLOR,
        height: LIST_ITEM_HEIGHT,
        marginTop: 1,
        padding: PAD_UNIT,
        alignItems: 'flex-start',
        justifyContent: 'center'
    },

});

export default TaskListItem;

