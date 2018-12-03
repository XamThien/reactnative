/*
import React, {Component} from 'react';
import {StyleSheet, Text, View, Alert, TouchableHighlight} from 'react-native';
import SocketIOClient from 'socket.io-client';


export default class Example extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userInfo: null,
            error: null,
        };
    }

    componentDidMount() {

    }

    _doConnectSocket() {
        var socketConfig = {path: '/socket'};
        var socket = new SocketIOClient('localhost:3000', socketConfig);

// // Connect!
//         socket.connect();
//
// // An event to be fired on connection to socket
//         socket.on('connect', () => {
//             console.log('Wahey -> connected!');
//         });
//
// // Event called when 'someEvent' it emitted by server
//         socket.on('someEvent', (data) => {
//             console.log('Some event was called, check out this data: ', data);
//         });
//
// // Called when anything is emitted by the server
//         socket.onAny((event) => {
//             console.log(`${event.name} was called with data: `, event.items);
//         });
//
// // Manually join namespace. Ex: namespace is now partyRoom
//         socket.joinNamespace('partyRoom')
//
// // Leave namespace, back to '/'
//         socket.leaveNamespace()
//
// // Emit an event to server
//         socket.emit('helloWorld', {some: 'data'});
//
// //Disconnect from server
//         socket.disconnect();
//
// // Reconnect to a closed socket
//         socket.reconnect();
    }

    render() {
        return (
            <View>
                <TouchableHighlight onPress={() => {
                    this._doConnectSocket();
                }}>
                    <View> <Text> Connect socket </Text> </View>
                </TouchableHighlight>
            </View>
        );
    }


}
*/
