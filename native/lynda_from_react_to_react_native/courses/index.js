import {AppRegistry} from 'react-native';
import App from './src/components/App';
import {StackNavigator} from 'react-navigation';
import ReactCourses from './src/components/ReactCourses'
import NativeCourses from './src/components/NativeCourses'

const courses = StackNavigator({
    ReactCourses: {screen: ReactCourses},
    NativeCourses: {screen: NativeCourses},
});

AppRegistry.registerComponent('courses', () => courses);
