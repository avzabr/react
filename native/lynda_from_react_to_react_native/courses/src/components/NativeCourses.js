import React, {Component} from 'react';
import {ListView} from 'react-native';
import data from '../data/courses.json';
import Courses from './Courses';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

const ds = new ListView.DataSource({
    rowHasChanged: (r1, r2) => r1 !== r2
});

const dataSource = ds.cloneWithRows(data.filter(course => course.category === 'native'));

export default class NativeCourses extends Component {
    static navigationOptions = {
        tabBarLabel: 'Native Cources',
        tabBarIcon: ({tintColor}) => (
            <Icon
                name="cellphone"
                size={26}
                style={[{
                    width: 26,
                    height: 26
                }, {
                    color: tintColor
                }]}
            />)
    };

    render() {
        return (
            <Courses
                title='Native Coures'
                dataSource={dataSource}
                icon='settings-cell'
                styles={styles}
                {...this.props}
            />
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
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10
    },
    icon: {
        width: 26,
        height: 26
    }
};