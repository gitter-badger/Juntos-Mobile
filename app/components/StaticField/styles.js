// Styles for StaticField

////////////////////////
// Import Modules
////////////////////////

import {
  StyleSheet,
} from 'react-native'

import {
FONTS,
COLORS,
FONT_WEIGHT
} from "./../../common/styles";


////////////////////////
// Styles
////////////////////////

export default StyleSheet.create({

  title:{
    fontFamily: FONTS.PRIMARY,
    fontWeight: FONT_WEIGHT.LIGHT,
    color: COLORS.LIGHT_GREY,
    paddingHorizontal: 3,
    fontSize: 13,
  },

  text:{
    fontFamily: FONTS.PRIMARY,
    color: COLORS.BLACK,
    paddingVertical: 10,
  },

  placeHolderText:{
    fontFamily: FONTS.PRIMARY,
    color: COLORS.MID_GREY,
    fontSize: 14,
    paddingVertical: 10,
    paddingHorizontal: 5
  },

});



