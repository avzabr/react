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
        styles: {}
    };

    static propTypes = {
        title: PropTypes.string,
        topBtn: PropTypes.object,
        dataSource: PropTypes.object,
        styles: PropTypes.object
    };

    render() {

        return (
            <View style={this.props.styles.container}>
                <Text style={this.props.styles.welcome}>{this.props.title}</Text>
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