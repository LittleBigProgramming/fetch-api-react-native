import React from 'react';
import { FlatList, ActivityIndicator, StyleSheet, Text, Image, View  } from 'react-native';

export default class ApiExample extends React.Component {

    constructor(props){
        super(props);
        this.state ={ isLoading: true}
    }

    componentDidMount(){
        return fetch('https://jsonplaceholder.typicode.com/photos')
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    isLoading: false,
                    dataSource: responseJson,
                });
            })
            .catch((error) =>{
                console.error(error);
            });
    }



    render(){
        if(this.state.isLoading){
            return(
                <View style={{flex: 1, padding: 20}}>
                    <ActivityIndicator/>
                </View>
            )
        }

        return(
            <View style={styles.container}>
                <FlatList
                    data={this.state.dataSource}
                    renderItem={({item}) =>
                        <View style={styles.item}>
                            <Image style={styles.image}
                                   source={{uri: item.thumbnailUrl}}
                            />
                            <View style={styles.itemContent}>
                                <Text style={styles.title}>
                                    {item.title}
                                </Text>
                                <Text style={styles.url}>
                                    {item.url}
                                </Text>
                            </View>
                        </View>
                    }
                    keyExtractor={({id}, index) => id.toString()}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop: 75,
        paddingHorizontal: 10
    },
    sectionHeader: {
        paddingTop: 2,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 2,
        fontSize: 14,
        fontWeight: 'bold',
        backgroundColor: 'rgba(247,247,247,1.0)',
    },
    item: {
        display: 'flex',
        alignItems: 'flex-start',
        paddingTop: 15,
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    image: {
        height: 64,
        width: 64,
        marginRight: 10
    },
    itemContent: {
        flex: 1
    },
    title: {
        fontSize: 14,
        fontWeight: 'bold',
        paddingBottom: 5
    },
    url: {
        fontSize: 12,
        fontStyle: 'italic'
    }
})