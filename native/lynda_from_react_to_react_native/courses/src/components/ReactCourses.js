import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Button
} from 'react-native';

export default class ReactCourses extends Component {

    static navigationOptions = {
        title: 'React Courses'
    }

    render() {
        const {navigate} = this.props.navigation;

        return (
            <View style={styles.container}>
                <Text style={styles.welcom}>
                    Welcome to React Courses
                </Text>
                <Button
                    onPress={() => navigate('NativeCourses')}
                    title='React Native Courses'>
                </Button>
            </View>
        )
    }
}

const styles = {
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5CFFF'
    },
    welcome: {}
};