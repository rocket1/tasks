import React from 'react';
import {StyleSheet, View, Text, Button, TouchableOpacity} from 'react-native';

class TaskListItem extends React.PureComponent {

    _onPress = () => {
        this.props.onPressItem(this.props.key);
    };

    render() {

        return (
            <TouchableOpacity onPress={this._onPress}>
                <View>
                    <Text>
                        {this.props.title}
                    </Text>
                </View>
            </TouchableOpacity>
        );
    }
}

export default TaskListItem;

