import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, View, Text, Button, TouchableOpacity} from 'react-native';
import {
    LIST_ITEM_HEIGHT, LIST_ITEM_BG_COLOR, PAD_UNIT, TEXT_COLOR_2_DISABLED,
    TEXT_COLOR_2, LIST_ITEM_BG_COLOR_DISABLED
} from '../common/styles-common';
import {COMPLETE_STEP_STATE} from "../task/step-state";
import {COMPLETE_TASK_STATE} from "../task/task-state";

class TaskListItem extends React.Component {

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

        const isTaskComplete = this.props.taskState === COMPLETE_TASK_STATE;

        const styles = StyleSheet.create({
            taskListItem: {
                flex: 1,
                flexDirection: 'row',
                backgroundColor: isTaskComplete ? LIST_ITEM_BG_COLOR_DISABLED : LIST_ITEM_BG_COLOR,
                height: LIST_ITEM_HEIGHT,
                marginTop: 1,
                padding: PAD_UNIT,
                alignItems: 'center',
                justifyContent: 'center'
            },
            title: {
                flex: 1,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-start'
            },
            titleText: {
                color: isTaskComplete ? TEXT_COLOR_2_DISABLED : TEXT_COLOR_2,
            }
        });

        const checkMark = isTaskComplete ?
                          <View><Text style={{color: 'green', fontSize: 24}}>&nbsp;&#10003;</Text></View> : null;

        return (
            <TouchableOpacity onPress={this._onSelectTask}>
                <View style={styles.taskListItem}>
                    <View style={styles.title}>
                        <Text style={styles.titleText}>
                            {this.props.title}
                        </Text>
                        {checkMark}
                    </View>
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

export default TaskListItem;

