import React, {Component} from 'react';
import {ListView} from 'react-native';
import data from '../data/courses.json';
import Courses from './Courses';

const ds = new ListView.DataSource({
    rowHasChanged: (r1, r2) => r1 !== r2
});

const dataSource = ds.cloneWithRows(data.filter(course => course.category === 'react'));

export default class NativeCourses extends Component {

    render() {
        return (
            <Courses
                title='React Coures'
                topBtn={{title: 'Native Courses', navLink: 'NativeCourses'}}
                dataSource={dataSource}
                {...this.props}
                styles={styles}
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
    welcome: {}
};