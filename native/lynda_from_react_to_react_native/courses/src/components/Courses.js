import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
    StyleSheet,
    Text,
    View,
    Button,
    ListView,
    Image
} from 'react-native';

export default class Courses extends Component {

    static defaultProps = {
        title: "courses",
        topBtn: {
            title: 'React Courses',
            navLink: 'ReactCourses'
        },
        styles: {}
    };

    static propTypes = {
        title: PropTypes.string,
        topBtn: PropTypes.object,
        dataSource: PropTypes.object,
        styles: PropTypes.object
    };

    navigationOptions = ({navigation}) => ({
        title: navigation.state.params.title,
    });

    render() {
        const {navigate} = this.props.navigation;

        return (
            <View style={this.props.styles.container}>
                <Button
                    onPress={() => navigate(this.props.topBtn.navLink)}
                    title={this.props.topBtn.title}>
                </Button>
                <ListView
                    dataSource={this.props.dataSource}
                    renderRow={(rowData) =>
                        <View>
                            <Text>{rowData.title}</Text>
                            <Text>{rowData.description}</Text>
                            <Text>{rowData.views}</Text>
                            <Text>{rowData.link}</Text>
                            <Image source={{uri: rowData.image}}
                                   style={{width: 400, height: 200}}/>
                        </View>
                    }
                />

            </View>
        )
    }
}