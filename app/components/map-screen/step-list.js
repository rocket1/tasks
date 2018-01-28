import React from 'react';
import {FlatList} from 'react-native';
import StepListItem from './step-list-item';

class StepList extends React.PureComponent {

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
    _renderItem = ({item}) => <StepListItem {...item} onSelectStep={this.props.onSelectStep}/>;

    /**
     *
     * @returns {XML}
     */
    render() {
        return (
            <FlatList
                data={this.props.steps}
                extraData={this.state}
                keyExtractor={this._keyExtractor}
                renderItem={this._renderItem}
            />
        );
    }
}

export default StepList;