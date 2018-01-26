import React from 'react';
import {StyleSheet, View, Text, Button} from 'react-native';
import TaskList from '../task-list/task-list';

class TaskScreen extends React.Component {

    static navigationOptions = {
        title: 'Taskss',
    };

    render() {

        const {navigate} = this.props.navigation;

        return (
            <View style={styles.container}>
                <Text>This is a list of tasks</Text>
                <TaskList data={[{key: 'a'}, {key: 'b'}]}/>
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

