import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Image, Linking, ListView, Text, View} from 'react-native';
import {getTheme} from 'react-native-material-kit';

const theme = getTheme();

export default class Courses extends Component {

    static defaultProps = {
        title: "courses"
    };

    static propTypes = {
        title: PropTypes.string,
        topBtn: PropTypes.object,
        dataSource: PropTypes.object
    };

    handleClick(link) {
        Linking.canOpenURL(link).then((supported) => {
            if (supported) {
                Linking.openURL(link);
            } else {
                console.log('Dont know how to open URL:', link)
            }
        })
    };

    render() {

        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>{this.props.title}</Text>
                <ListView
                    dataSource={this.props.dataSource}
                    style={styles.list}
                    renderRow={(rowData) =>
                        <View style={[theme.cardStyle, styles.card]}>
                            <Image source={{uri: rowData.image}}
                                   style={theme.cardImageStyle}/>
                            <Text style={[theme.cardTitleStyle, styles.title]}>{rowData.title}</Text>
                            <Text style={[theme.cardContentStyle, styles.content]}>{rowData.description}</Text>
                            <Text style={[theme.cardActionStyle, styles.action]} onPress={() => {
                                this.handleClick(rowData.link)
                            }}>Tap the course</Text>
                        </View>
                    }
                />

            </View>
        )
    }
}

const styles = {
    container: {
        flex: 1,
        flexWrap: 'wrap',
        backgroundColor: '#ffffff',
        paddingTop: 10
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        textAlignVertical: 'center',
        marginTop: 20
    },
    card: {
        marginTop: 10,
    },
    icon: {
        width: 26,
        height: 26
    },
    list: {
        paddingLeft: 5,
        paddingRight: 5,
    },
    title: {
        width: 373,
        left: 0,
        fontSize: 15,
        backgroundColor: 'rgba(245,252,255,0.60)'

    },
    action: {
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: '#e8f2f5',
        borderRadius: 3
    }
};