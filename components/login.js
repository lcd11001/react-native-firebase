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

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            emailText: '' ,
            passText: '',
            placeholder: 'input your email'
        };
        this.login = this.login.bind(this);
    }

    login() {
        const { navigate } = this.props.navigation;
        const self = this;

        firebaseApp
            .auth()
            .signInWithEmailAndPassword(this.state.emailText, this.state.passText)
            .then(function(success) {
                navigate('MainMenu', { user: self.state.emailText });
            })
            .catch(function(error) {
                // Handle Errors here.
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
                    emailText: params.email,
                    passText: params.pass
                });
            }
        }
    }

    render() {
        const { navigate } = this.props.navigation;
        

        return (
            <View style={styles.container}>
                <TextInput
                    style={styles.input}
                    onChangeText={ (text) => this.setState({emailText: text} ) }
                    value = { this.state.emailText }
                    placeholder = { this.state.placeholder }          
                />
                <TextInput
                    style={styles.input}
                    secureTextEntry = {true}
                    onChangeText={ (text) => this.setState({passText: text} ) }
                    value = { this.state.passText }
             
                />

                <View style={styles.buttons}>
                    <TouchableOpacity 
                        style={[styles.buttonLogin, styles.button]}
                        onPress={ () => this.login() }
                    >
                        <Text style={styles.buttonText}>
                            Login
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={[styles.buttonRegister, styles.button]}
                        onPress={ () => navigate('Register') }
                    >
                        <Text style={styles.buttonText}>
                            Register
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
    
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
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

    buttonLogin: {
        backgroundColor: 'green',
    },

    buttonRegister: {
        backgroundColor: 'red',
    },

    buttonText: {
        color: 'white'
    }
});