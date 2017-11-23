////////////////////////
// Import Modules
////////////////////////

// Note: node module imports
import React, { Component } from 'react';
import {
  View,
  TextInput,
  Text,
  Dimensions,
  ScrollView,
  Image
} from 'react-native';
import PropTypes from "prop-types";

////////////////////////
// Import Commmon Files
////////////////////////

import {renderIf} from "./../../common/components";
import {deviceProperties} from "./../../common/device";

////////////////////////
// Import Styles
////////////////////////

import styles from "./styles";

////////////////////////
// Constants
////////////////////////

////////////////////////
// Component
/////////////////////////

class Pager extends Component {


  ////////////////////////
  // Constructor
  ////////////////////////

  constructor(props){

    super(props)
    this.state = {
      // Initial state definitions
      pageIndicators: [],
      lastActiveIndicator: null,
      scrollViewBounced: false
    }
    // Caveat: If the ref callback is set inline the, refs will get called 
    // twice during update. Because a new instance of the function is created
    // with each render, React needs to clear the old ref and set up the new 
    // one. You can avoid this be defining the ref callback as a bound method
    // on the class, but not that it shouldn't matter in most cases.
    // We bind the setPagerIndicator to allow the pageIndicator refs
    // to only be set once. 
    this._setPagerIndicatorRefs = this._setPagerIndicatorRefs.bind(this);
  }

  ////////////////////////
  // Setters & Getters
  ////////////////////////

  // Sets the active page indicator for 
  // the paging scroll view.
  _setActivePageIndicator(page){
    console.log(page);

    // Get the indicator in regards to the page
    let pageIndicator = this.state.pageIndicators[page];
        
    // First indicator is affected by this logic.
    if(pageIndicator != this.state.lastActiveIndicator){
      // Set the current page indicator to active
      pageIndicator.setNativeProps({style: styles.pageIndicatorActive});
  
      // Set the last page indicator to 
      if(this.state.lastActiveIndicator != null)
        this.state.lastActiveIndicator.setNativeProps({style: styles.pageIndicatorInactive});
  
      // Set the last active indicator
      this.state.lastActiveIndicator = pageIndicator;
    }
  }

  // Sets a ref for a page indicator to the pageIndicators state object
  _setPagerIndicatorRefs(ref){
    this.state.pageIndicators[this.state.pageIndicators.length] = ref
  }

  ////////////////////////
  // Lifecycle
  ////////////////////////

  componentDidMount(){

    // Set the intial active page indicator
    this._setActivePageIndicator(0);

  }

  ////////////////////////
  // Callbacks
  ////////////////////////

  // ScrollDidEnd calculate the current page 
  // that the user has scrolled too.
  _onScrollDidEnd(event: Object){
    let currentEvent    = event.nativeEvent;
    let scrollViewWidth = currentEvent.layoutMeasurement.width;
    let currentOffset   = currentEvent.contentOffset.x;
    let currentPage     = Math.ceil(currentOffset/scrollViewWidth);

    // Set the current active indicator if it is within bounds
    if(currentPage < this.props.data.length)
      this._setActivePageIndicator(currentPage);

    // Validate that the onPageChangeEnd prop
    // had been set
    if(this.props.onPageChangeEnd)
      this.props.onPageChangeEnd(currentPage);
  }

  // Handles bouncing the scroll view to indicate
  // to users that they can scroll more projects
  // to the right.
  _bounceScrollView(){
    
    // Set the state of scroll view bounced to true
    this.setState({
      scrollViewBounced: true
    })

    // Show scrollView bounce effect
    this._scrollView.flashScrollIndicators();
    setTimeout(() => {
      this._scrollView.scrollTo({x: 50, y: 0, animated: true});
    }, 1000);
    setTimeout(() => {
      this._scrollView.scrollTo({x: 0, y: 0, animated: true});
    }, 2000);
 

  }

  //Required props
  /* 
  data: type data [
    {
      image: String,
    }
  ]
  */

  render(){

    return (
      <View>
        <View style={styles.pageIndicatorWrapper}>
          {this.props.data.map(data =>
            <View key={data.id + "-pager"} 
              ref={this._setPagerIndicatorRefs}
              style={styles.pageIndicatorInactive}>
            </View>)
          }
        </View>
        <ScrollView 
        ref={ref => this._scrollView = ref}
        scrollEventThrottle={1} 
        onMomentumScrollEnd={event=> this._onScrollDidEnd(event)} 
        pagingEnabled={true} 
        horizontal={true}>
          {this.props.data.map(data =>
              <Image
              key={data.id + "-image"}  
              source={{uri: data.image}} 
              onLoadEnd={()=>{ if (!this.state.scrollViewBounced) this._bounceScrollView()}}
              style={styles.pagerImage}/>
            )
          }
        </ScrollView>
      </View>
    )
  }

}


////////////////////////
// Prop Type Checks
////////////////////////

Pager.propTypes = {
  //Prop validation definitions for custom props
  data: PropTypes.array.isRequired,
  onPageChangeEnd: PropTypes.func.isRequired

}

export default Pager;
