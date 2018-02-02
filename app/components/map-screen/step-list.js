import React from 'react';
import {FlatList} from 'react-native';
import StepListItem from './step-list-item';

class StepList extends React.Component {

    /**
     *
     * @param item
     * @param index
     * @private
     */
    _keyExtractor = (item, index) => item.id;

    /**
     *
     * @param item
     * @private
     */
    _renderItem = (item) => {
        return <StepListItem index={item.index + 1} {...item.item} onSelectStep={this.props.onSelectStep}/>
    };

    /**
     *
     * @returns {*}
     */
    render() {
        return (
            <FlatList
                data={this.props.steps}
                extraData={this.props}
                keyExtractor={this._keyExtractor}
                renderItem={this._renderItem}
            />
        );
    }
}

export default StepList;
