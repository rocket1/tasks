import React from 'react';
import {StyleSheet, View, Text, Button, FlatList} from 'react-native';
import TaskListItem from './task-list-item';

class TaskList extends React.PureComponent {

    state = {
        selected: (new Map(): Map<string, boolean>)
    };

    _keyExtractor = (item, index) => item.id;

    _onPressItem = (id: string) => {
        // // updater functions are preferred for transactional updates
        // this.setState((state) => {
        //     // copy the map rather than modifying state.
        //     const selected = new Map(state.selected);
        //     selected.set(id, !selected.get(id)); // toggle
        //     return {selected};
        // });
    };

    _renderItem = ({item}) => (
        <TaskListItem
            key={item.id}
            id={item.id}
            onPressItem={this._onPressItem}
            title={item.title}
        />
    );

    render() {

        const data = [
            {
                id: '1',
                title: 'Task 1'
            }, {
                id: '2',
                title: 'Task 2'
            }
        ];

        return (
            <FlatList
                key={"foo"}
                data={data}
                extraData={this.state}
                keyExtractor={this._keyExtractor}
                renderItem={this._renderItem}
            />
        );
    }
}

export default TaskList;
