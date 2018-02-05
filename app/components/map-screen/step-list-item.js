import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, View, Text, Button, TouchableOpacity} from 'react-native';
import {
    LIST_ITEM_BG_COLOR, LIST_ITEM_BG_COLOR_DISABLED, LIST_ITEM_HEIGHT, PAD_UNIT,
    TEXT_COLOR_2, TEXT_COLOR_2_DISABLED
} from "../common/styles-common";
import {COMPLETE_STEP_STATE} from "../task/step-state";

class StepListItem extends React.Component {

    /**
     *
     * @private
     */
    _onSelectStep = () => {
        // this.props.onSelectTask(this.props.id);
    };

    /**
     *
     * @returns {*}
     */
    render() {

        const isStepComplete = this.props.stepState === COMPLETE_STEP_STATE;

        const styles = StyleSheet.create({
            stepListItem: {
                flex: 1,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                backgroundColor: isStepComplete ? LIST_ITEM_BG_COLOR_DISABLED : LIST_ITEM_BG_COLOR,
                height: LIST_ITEM_HEIGHT,
                marginTop: 1,
                padding: PAD_UNIT,
            },
            title: {
                flex: 1,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-start'
            },
            titleText: {
                color: isStepComplete ? TEXT_COLOR_2_DISABLED : TEXT_COLOR_2,
            }
        });

        const pinDotStyle = StyleSheet.create({
            pinColorCircle: {
                backgroundColor: this.props.marker.pinColor,
                borderRadius: 8,
                height: 16,
                width: 16,
                marginRight: 8
            }
        });

        const pinDot = <View style={pinDotStyle.pinColorCircle}/>;

        const checkMark = isStepComplete ?
                          <View><Text style={{color: 'green', fontSize: 24}}>&nbsp;&#10003;</Text></View> : null;

        return (
            <TouchableOpacity onPress={this._onSelectStep}>
                <View style={styles.stepListItem}>

                    <View style={styles.title}>
                        {pinDot}
                        <Text style={styles.titleText}>
                            {this.props.marker.title}
                        </Text>
                        {checkMark}
                    </View>

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

export default StepListItem;

