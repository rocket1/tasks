import {StyleSheet} from 'react-native';
import {
    LIST_ITEM_HEIGHT, BG_COLOR, LIST_HEADER_BG_COLOR, LIST_HEADER_TEXT_COLOR, PAD_UNIT
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
        marginTop: 1,
        padding: PAD_UNIT,
    },
    taskHeaderTitle: {
        color: LIST_HEADER_TEXT_COLOR,
        fontWeight: 'bold'
    },
    stepList: {}
});
