import { StackNavigator } from 'react-navigation';

import Login from './login';
import Register from './register';
import MainMenu from './MainMenu'

const RootNavigator = StackNavigator({
    Login: {
        screen: Login,
        navigationOptions: {
            headerTitle: 'Login'
        }
    },

    Register: {
        screen: Register,
        navigationOptions: {
            headerTitle: 'Register'
        }
    },

    MainMenu: {
        screen: MainMenu,
        navigationOptions: {
            headerTitle: 'Main Menu'
        }
    }
});

export default RootNavigator;