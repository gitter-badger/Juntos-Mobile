////////////////////////
// Import Modules
////////////////////////

import React, { Component } from 'react';
import {
  View,
  TextInput,
  Text
} from 'react-native';
import PropTypes from "prop-types";

////////////////////////
// Imports Common Files
////////////////////////

// Conditional rendering
import {renderIf} from "./../../common/components";

////////////////////////
// Import Styles
////////////////////////

import styles from "./styles";

////////////////////////
// Constants
////////////////////////

//Properties
const PLACE_HOLDER_TEXT_COLOR_PROPERTY = "#858384"; // Move to commons/styles.js
const ANDROID_UNDERLINE_COLOR_PROPERTY = 'rgba(0,0,0,0)'; // Move to commons/styles.js

////////////////////////
// Component
////////////////////////

class  PrimaryTextInput extends Component {

  ////////////////////////
  // Default Props
  ////////////////////////

  static defaultProps = {
    ...Component.defaultProps,
    valid: true,
    validationMessage: ""
  }

  ////////////////////////
  // Constructor
  ////////////////////////

  constructor(props){

    super(props)
    this.state = {
      multilineCount: 0
    }

  }

  ////////////////////////
  // Methods
  ////////////////////////

  // Renders component
  render(){

    //Configure the style for singleline and multiline
    let textInputWrapStyle = styles.inputWrap;
    let textInputStyle     = styles.input;


    if(this.props.multiline){

      textInputWrapStyle = styles.multilineInputWrapSmall;
      textInputStyle     = styles.multilineInputSmall;

    }

    return (

      <View style={textInputWrapStyle}>
        <TextInput
          {...this.props}
          onChangeText={field =>{
            {/* If multiline is enabled increment the count */}
            if(this.props.multiline){
              this.setState({multilineCount: field.length});
            }
            {/* Pass the field to the parent component */}
            this.props.onChangeText(field);
          }}
          placeholderTextColor={PLACE_HOLDER_TEXT_COLOR_PROPERTY}
          underlineColorAndroid={ANDROID_UNDERLINE_COLOR_PROPERTY} 
          style={textInputStyle} />
          <View style={styles.footer}>
            {/* Render the multilineCounter when multiline is enabled */}
            {renderIf(this.props.multiline, 
            <View>
              <Text style={styles.multilineCounter}>{this.state.multilineCount}/{this.props.maxLength}</Text>
            </View>
            )}
            {/* Render the validation */}
          </View>
          {renderIf(!this.props.valid, <Text style={styles.inputValidationMessage}> {this.props.validationMessage} </Text>)}
      </View>

    )
  }
};

////////////////////////
// Prop type checking
////////////////////////

PrimaryTextInput.propTypes = {
  valid: PropTypes.bool,
  validationMessage: PropTypes.string
}

export default PrimaryTextInput;