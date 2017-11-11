// This file will host the routes for requires
// by react-navigation

//////////////////////////////
// Imports
///////////////////////////////
import React, { Component } from 'react';
import { 
  StackNavigator, 
  TabNavigator,
  Image
} from 'react-navigation'

//////////////////////////////
// Imports Screen
///////////////////////////////

// Import Screens
import LandingView    from '../screens/Landing';
import LoginView      from '../screens/LogIn';
import SignUpView     from '../screens/Signup';
import ForgotPassword from '../screens/ForgotPassword';
import Projects       from '../screens/Projects';
import Profile        from '../screens/Profile';
import Messages       from '../screens/Messages';

//////////////////////////////
// Imports Options
///////////////////////////////

// Import header options
import HeaderOptions from '../config/header';
import TabbarOptions from '../config/tabbar';

//////////////////////////////
// Constants
///////////////////////////////

// Strings
const PROJECT_SCREEN_TITLE_STRING         = "Projects";
const PROFILE_SCREEN_TITLE_STRING         = "Profile";
const LOGIN_SCREEN_TITLE_STRING           = "Log In";
const SIGN_UP_SCREEN_TITLE_STRING         = "Sign Up";
const FORGOT_PASSWORD_SCREEN_TITLE_STRING = "Forgot Password";
const MESSAGES_SCREEN_TITLE_STRING        = "Messages";
// Configs
const ROUTE_ROUTE_HEADER_MODE             = "none";

//////////////////////////////
// Routes
///////////////////////////////


// Stack Navigator - Before Sign in or sign up

// Tab Navigator - After sign in or sign up
const Protected = TabNavigator({
  Projects: { 
    screen: Projects,
    navigationOptions: ({navigation}) => ({
      title: PROJECT_SCREEN_TITLE_STRING,
    })
  },
  Messages: {
    screen: Messages,
    navigationOptions: ({navigation}) => ({
      title: MESSAGES_SCREEN_TITLE_STRING,
    }), 
  }
}, TabbarOptions);


// Root Navigator
const RootRoutes = StackNavigator({
  Landing: { 
    screen: LandingView,
    navigationOptions: ({navigation}) => ({
      header: null // hide header only for the landing view
    }),  
  },
  Login:  { 
    screen: LoginView,
    navigationOptions: ({navigation}) => ({
      title: LOGIN_SCREEN_TITLE_STRING,
    }), 
  },
  Signup:{
    screen: SignUpView,
    navigationOptions: ({navigation}) => ({
      title: SIGN_UP_SCREEN_TITLE_STRING,
    }), 
  },
  ForgotPassword:{
    screen: ForgotPassword,
    navigationOptions: ({navigation}) => ({
      title: FORGOT_PASSWORD_SCREEN_TITLE_STRING,
    }), 
  },
  Protected: {
    screen: Protected,
  }
},HeaderOptions);

export default RootRoutes;
