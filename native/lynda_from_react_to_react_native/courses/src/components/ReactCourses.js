import React, {Component} from 'react';
import {ListView} from 'react-native';
import data from '../data/courses.json';
import Courses from './Courses';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

const ds = new ListView.DataSource({
    rowHasChanged: (r1, r2) => r1 !== r2
});

const dataSource = ds.cloneWithRows(data.filter(course => course.category === 'react'));

export default class NativeCourses extends Component {

    static navigationOptions = {
        tabBarLabel: 'React Cources',
        tabBarIcon: ({tintColor}) => (
            <Icon
                name="react"
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
                title='React Coures'
                dataSource={dataSource}
                {...this.props}
            />
        )
    }
}
