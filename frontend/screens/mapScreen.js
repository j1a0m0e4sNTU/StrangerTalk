import { StyleSheet, View, SafeAreaView, Text, TouchableOpacity } from 'react-native'
import React, { Component } from 'react';
import MapView from 'react-native-maps';
import Geolocation from 'Geolocation';
import { Query } from 'react-apollo';
import { GET_USER_LOCATION } from '../graphql'
import { Marker } from 'react-native-maps';



export default class MapScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            local: {
                longitude: 0,
                latitude: 0
            }
        }
    }

    componentDidMount() {
        this.getLocation()
    }

    getLocation() {
        Geolocation.getCurrentPosition(
            location => {
                this.setState({
                    local: {
                        longitude: location.coords.longitude,
                        latitude: location.coords.latitude,
                    }
                })
                var result =
                    "\n經度：" + location.coords.longitude +
                    "\n緯度：" + location.coords.latitude
            },
            error => {
                alert("獲取位置失败：" + error)
            }
        );
    }

    renderMarker(users) {
        const addMarker = users.map(user => {
            console.log(user)
            return (
                <Marker
                    coordinate={{
                        latitude: user.latitude,
                        longitude: user.longitude
                    }}
                    title={user.name}
                    description={user.description}
                />)
        })
        console.log(addMarker)
        return addMarker
    }

    render() {
        return (
            <Query
                query={GET_USER_LOCATION}
                fetchPolicy={'network-only'}
            >
                {({ loading, error, data }) => {
                    if (loading) return (null);
                    if (error) return `Error! ${error.message}`;
                    const marker = this.renderMarker(data.users)
                    return (
                        <SafeAreaView style={styles.container}>
                            <MapView style={styles.map} region={{
                                latitude: this.state.local.latitude,
                                longitude: this.state.local.longitude,
                                latitudeDelta: 0.01,
                                longitudeDelta: 0.01
                            }}>
                            <Marker
                            pinColor={'green'}
                                coordinate={{
                                    latitude: this.state.local.latitude,
                                    longitude: this.state.local.longitude
                                }}
                            />
                                {marker}
                            </MapView>
                            

                            <TouchableOpacity style={styles.button} onPress={this.getLocation.bind(this)}>
                                <Text style={styles.buttonText}>Where am I ?</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.push('ChatRoomScreen')}>
                                <Text style={styles.buttonText}>GO to ChatRoom</Text>
                            </TouchableOpacity>
                        </SafeAreaView>

                    );
                }}
            </Query>


        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    map: {
        width: 350, height: 500

    },
    button: {
        marginTop: 50,

        width: 100,
        height: 35,
        backgroundColor: '#00AD65',
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: '#00AD65',
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonText: {
        fontFamily: 'Helvetica',
        fontSize: 15,
        color: '#FFFFFF',
        letterSpacing: -0.24,
        textAlign: 'center',
        lineHeight: 20,
    }



})