////////////////////////
// Imports
////////////////////////

import React, { Component } from 'react';
import ImagePicker from 'react-native-image-crop-picker';
import {bindActionCreators, connect} from 'react-redux';
import { 
Text, 
Dimensions,
ScrollView,
Image,
StyleSheet,
TouchableOpacity,
View
} from 'react-native';

//////////////////////////////
// Imports Common Files
///////////////////////////////

// Common styles
import CommonStyles, {COLORS, FONTS} from "../../common/styles.js"

////////////////////////
// Actions
////////////////////////

import {accountLogout} from "./../../actions/account-actions.js";

//////////////////////////////
// Imports Custom Components
///////////////////////////////

import PrimaryButton from "./../../components/PrimaryButton";
import ImageCardView from "./../../components/ImageCardView";
import CardView from "./../../components/CardView";

////////////////////////
// Constants
////////////////////////
const {width, height}                  = Dimensions.get('window');
const imageAddButton                   = require("./../../assets/createProject/addImageIcon.png");
const PREVIEW_PROJECT_BUTTON_STRING    = "Preview Project"

class CreateProjectImages extends Component {

  constructor(props){
    super(props);
    this.state = {
      projectImages:[]
    }

  }


  tabBarOnPress(){
    
  }

  ////////////////////////
  // Callbacks
  ////////////////////////
    //Handles profile image button press
  _onAddImagePress(){

    ImagePicker.openPicker({
      width: 300,
      height: 200,
      cropping: 300
    }).then(image => {
      let source = { uri: image.path };
      // this.setState({
      //   profileImageData: {
      //     uri: image.path,
      //     mime: image.mime
      //   },
      //   profileImage: source,
      //   profileImageValid: PROFILE_IMAGE_TRUE_STATE
      // });
      
      this.setState(function(previousState){
        previousState.projectImages[previousState.projectImages.length] = source;
        return previousState;
      })
    }).catch(error => {
      console.log(error);
    });

  }

  ////////////////////////
  // Screen UI
  ////////////////////////

  render() {
    console.log(this.state);
    return (
     <View style={CommonStyles.container}>
      <ScrollView style={styles.scrollViewWrapper}>
        <View style={styles.imagesWrapper}>
          {this.state.projectImages.map(function(image, key){
           console.log(image);
           return (<ImageCardView key={key} source={image} style={styles.imageCard} />);
          })}
          <CardView style={styles.addImageCardView} onPress={()=> this._onAddImagePress()}>
            <Image style={styles.addImageIcon} source={imageAddButton} />
            <Text style={styles.addImageText}>Add Image</Text>
          </CardView>
        </View>
      </ScrollView>
      <View style={CommonStyles.buttonFixedWrapper}> 
        <PrimaryButton style={CommonStyles.buttonFixedBottom} 
        onPress={() => this._onNexButtonPress()} 
        buttonText={PREVIEW_PROJECT_BUTTON_STRING}/>
      </View>
     </View>
    );
  }
}

////////////////////////
// Screen Styles
////////////////////////

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  tabBarIcon:{
    width: 25,
    height: 25
  },
  imagesWrapper:{
    flexDirection: "row",
    flexWrap: "wrap",
    paddingLeft: 7.5,
    paddingVertical: 15
  },

  ////////////////////////
  // Image Card
  ////////////////////////

  imageCard:{
    marginHorizontal: 5,
    marginVertical: 5
  },

  ////////////////////////
  // Add Image 
  ////////////////////////

  addImageCardView:{
    width: (width-43)/3, 
    height: width/4,
    backgroundColor: COLORS.PRIMARY,
    borderWidth: 1,
    borderColor: "#FFFFFF",
    borderStyle: "dashed",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 5,
    marginHorizontal: 5
  },
  addImageIcon:{
    height: 40,
    width: 40
  },
  addImageText: {
    fontSize: 12,
    color: COLORS.WHITE,
    fontFamily: FONTS.PRIMARY,
  }

});

////////////////////////
// Map to props
////////////////////////

const mapStateToProps = (state) => {
  return {
    isFetching: state.session.isFetching,
    isErrored: state.session.isErrored,
  };
}

const mapDistpatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(accountLogout())
  };
}

export default connect(mapStateToProps, mapDistpatchToProps)(CreateProjectImages);