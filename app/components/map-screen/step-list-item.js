import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, View, Text, Button, TouchableOpacity} from 'react-native';
import {LIST_ITEM_BG_COLOR, LIST_ITEM_HEIGHT, PAD_UNIT, TEXT_COLOR_2} from "../common/styles-common";

class StepListItem extends React.PureComponent {

    /**
     *
     * @private
     */
    _onSelectStep = () => {
        // this.props.onSelectTask(this.props.id);
    };

    /**
     *
     * @returns {XML}
     */
    render() {

        return (
            <TouchableOpacity onPress={this._onSelectStep} style={styles.stepListItem}>
                <View>
                    <Text style={styles.title}>
                        {this.props.index}. {this.props.marker.title}
                    </Text>
                </View>
            </TouchableOpacity>
        );
    }
}

StepListItem.propTypes = {
    onSelectTask: PropTypes.func,
    title: PropTypes.string,
    id: PropTypes.string,
    index: PropTypes.number
};

const styles = StyleSheet.create({
    stepListItem: {
        flex: 1,
        backgroundColor: LIST_ITEM_BG_COLOR,
        height: LIST_ITEM_HEIGHT,
        marginTop: 1,
        padding: PAD_UNIT,
        alignItems: 'flex-start',
        justifyContent: 'center'
    },
    title: {
        color: TEXT_COLOR_2,
    }
});

export default StepListItem;

