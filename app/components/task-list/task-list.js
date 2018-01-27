import React from 'react';
import {FlatList} from 'react-native';
import TaskListItem from './task-list-item';

class TaskList extends React.PureComponent {

    /**
     *
     * @param item
     * @param index
     * @private
     */
    _keyExtractor = (item, index) => item.id;

    /**
     *
     * @param task
     * @private
     */
    _renderItem = ({item}) => <TaskListItem {...item} onSelectTask={this.props.onSelectTask}/>;

    /**
     *
     * @returns {XML}
     */
    render() {
        return (
            <FlatList
                data={this.props.tasks}
                extraData={this.state}
                keyExtractor={this._keyExtractor}
                renderItem={this._renderItem}
            />
        );
    }
}

export default TaskList;
