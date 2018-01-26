import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, View, Text, Button, TouchableOpacity} from 'react-native';

class TaskListItem extends React.PureComponent {

    /**
     *
     * @private
     */
    _onPress = () => {
        this.props.onPressItem(this.props);
    };

    /**
     *
     * @returns {XML}
     */
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

TaskListItem.propTypes = {
    onPressItem: PropTypes.func
};

export default TaskListItem;

