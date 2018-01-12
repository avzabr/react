import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

export default class App extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>Open up App.js to start working on your app!</Text>
                <Text>Shake your phone to open the developer menu.</Text>
                <View style={styles.container2}>
                    <Text>Open up App.js to start working on your app!</Text>
                    <Text>Shake your phone to open the developer menu.</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 2,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    container2: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#fff',
        alignItems: 'baseline',
        justifyContent: 'flex-end',
    },
});
