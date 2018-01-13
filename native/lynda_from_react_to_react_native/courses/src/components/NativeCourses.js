import React, {Component} from 'react';
import {ListView} from 'react-native';
import data from '../data/courses.json';
import Courses from './Courses';

const ds = new ListView.DataSource({
    rowHasChanged: (r1, r2) => r1 !== r2
});

const dataSource = ds.cloneWithRows(data.filter(course => course.category === 'native'));

export default class NativeCourses extends Component {

    render() {
        return (
            <Courses
                title='Native Coures'
                topBtn={{title: 'React Courses', navLink: 'ReactCourses'}}
                dataSource={dataSource}
                {...this.props}
            />
        )
    }
}