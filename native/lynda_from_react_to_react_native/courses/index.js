import {AppRegistry} from 'react-native';
import {TabNavigator} from 'react-navigation';
import ReactCourses from './src/components/ReactCourses'
import NativeCourses from './src/components/NativeCourses'

const courses = TabNavigator({
    ReactCourses: {screen: ReactCourses},
    NativeCourses: {screen: NativeCourses},
}, {
    tabBarOptions: {
        activeTintColor: '#ffffff',
        inactiveTintColor: '#80cbc4',
        swipeEnabled: true,
        style: {
            backgroundColor: '#25a69a'
        }
    }
});

AppRegistry.registerComponent('courses', () => courses);
