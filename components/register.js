import React, { Component } from 'react';
import {
    Text,
    View,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Alert
} from 'react-native';

import { firebaseApp } from './FirebaseConfig';

export default class Register extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            emailText: '' ,
            passText: '',
            placeholder: 'register your email'
        };

        this.register = this.register.bind(this);
    }

    register() {
        const { navigate } = this.props.navigation;
        const self = this;

        firebaseApp
            .auth()
            .createUserWithEmailAndPassword(this.state.emailText, this.state.passText)
            .then(function(success){
                Alert.alert(
                    'Register Account',
                    'Your account has been registered successful!',
                    [
                        {
                            text: 'OK', 
                            onPress: () => navigate('Login', { email: self.state.emailText, pass: self.state.passText })
                        },
                    ],
                    { cancelable: false }
                )
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

    render() {
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
                        style={[styles.buttonRegister, styles.button]}
                        onPress={ () => this.register() }
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
        padding: 10,
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
        alignItems: 'center',
        justifyContent: 'center',
    },

    buttonRegister: {
        backgroundColor: 'blue',
    },

    buttonText: {
        color: 'white'
    }
});