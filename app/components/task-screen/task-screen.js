import React from 'react';
import {StyleSheet, View, Text, Button} from 'react-native';

class TaskScreen extends React.Component {

    static navigationOptions = {
        title: 'Tasks',
    };

    render() {

        const {navigate} = this.props.navigation;

        return (
            <View style={styles.container}>
                <Text>This is a list of tasks</Text>
                <Button
                    onPress={() => navigate('Map')}
                    title="Go to Map"
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default TaskScreen;

