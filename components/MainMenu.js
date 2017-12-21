import React, { Component } from 'react';
import {
    Text,
    View,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Alert
} from 'react-native';
import { firebaseApp } from './FirebaseConfig'

export default class MainMenu extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: ''
        }

        this.logout = this.logout.bind(this);
    }

    logout() {
        const { navigate } = this.props.navigation;
        const self = this;

        firebaseApp
            .auth()
            .signOut()
            .then(function() {
                // Sign-out successful.
                navigate('Login', {email: self.state.user, pass: ''});
            })
            .catch(function(error) {
                // An error happened.
                var errorCode = error.code;
                var errorMessage = error.message;
                Alert.alert(
                    'Error',
                    errorMessage,
                    [
                        {
                            text: 'OK', 
                            onPress: () => console.log('OK Pressed')
                        },
                    ],
                    { cancelable: false }
                )
            });
    }

    componentWillMount() {
        console.log('componentWillMount');

        if (this.props.navigation.state) {
            const { params } = this.props.navigation.state;
            console.log('params ' + JSON.stringify(params, null, 2) );
            if (params != undefined) {
                this.setState({
                    user: params.user,
                });
            }
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>
                    Welcome {this.state.user}
                </Text>
                <View style={styles.buttons}>
                    <TouchableOpacity 
                        style={[styles.buttonLogout, styles.button]}
                        onPress={ () => this.logout() }
                    >
                        <Text style={styles.buttonText}>
                            Logout
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        padding: 10
    }, 
    
    text: {
        fontSize: 40,
        padding: 10,
        marginBottom: 20
    },

    buttons: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },

    button: {
        height: 60,
        width: 100,
        padding: 10,
        margin: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },

    buttonLogout: {
        backgroundColor: 'red',
    },

    buttonText: {
        color: 'white'
    }
});