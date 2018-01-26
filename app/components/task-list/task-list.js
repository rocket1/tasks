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
     * @param id
     * @private
     */
    _onPressItem = (id: string) => {
        this.props.navigate('Map');
    };

    /**
     *
     * @param item
     * @private
     */
    _renderItem = ({item}) => (
        <TaskListItem
            id={item.id}
            onPressItem={this._onPressItem}
            title={item.title}
        />
    );

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
