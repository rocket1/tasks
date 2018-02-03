import {StyleSheet} from 'react-native';
import {
    LIST_ITEM_HEIGHT, BG_COLOR, LIST_HEADER_BG_COLOR, LIST_HEADER_TEXT_COLOR, PAD_UNIT, LIST_HEADER_COLOR_SUCCESS,
    LIST_HEADER_BG_COLOR_SUCCESS
} from '../common/styles-common';

export default styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        alignItems: 'center',
        backgroundColor: BG_COLOR
    },
    map: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: '50%',
    },
    info: {
        position: 'absolute',
        top: '50%',
        left: 0,
        right: 0,
        bottom: 0,
    },
    taskHeader: {
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        backgroundColor: LIST_HEADER_BG_COLOR,
        height: LIST_ITEM_HEIGHT,
        padding: PAD_UNIT,
    },
    taskHeaderSuccess: {
        backgroundColor: LIST_HEADER_BG_COLOR_SUCCESS,
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        height: LIST_ITEM_HEIGHT,
        padding: PAD_UNIT,
    },
    taskHeaderTitleSuccess: {
        color: LIST_HEADER_COLOR_SUCCESS,
        fontWeight: 'bold'
    },
    taskHeaderTitle: {
        color: LIST_HEADER_TEXT_COLOR,
        fontWeight: 'bold'
    },
    stepList: {}
});
