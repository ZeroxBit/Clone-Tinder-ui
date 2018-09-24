/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {StyleSheet, View, Animated, Dimensions, Image, PanResponder} from 'react-native';

const HEIGHT = Dimensions.get('window').height
const WIDTH = Dimensions.get('window').width

const imgs = [
  {id:"1", uri: require('./img/bestias.jpg')},
  {id:"2", uri: require('./img/goku.jpg')},
  {id:"3", uri: require('./img/mundo.jpg')},
  {id:"4", uri: require('./img/minato.jpg')}
]

export default class App extends Component {

  constructor(){
    super()
    this.position = new Animated.ValueXY()
    this.state = {
      currentIndex : 0
    }
  }


  componentWillMount = () => {
    this.PanResponder = PanResponder.create({

      onStartShouldSetPanResponder:(e , gestureState) => true,
      
      onPanResponderMove:(e,gestureState) =>{
        this.position.setValue({x:gestureState.dx, y:gestureState.dy})
      },
      // onPanResponderRelease:(e,gestureState)=>{
        
      // }
    })
  }
  

  renderImg = () =>{
    return imgs.map( (item, i) =>{
      return (
        <Animated.View key={item.id} style = {{height : HEIGHT - 120, width: WIDTH, padding:10, position:'absolute'}}>
          {...this.PanResponder.panHandlers}
          <Image style= {[{transform:this.position.getTranslateTransform()},{flex:1, height: null, width: null, resizeMode: 'cover', borderRadius: 20}]} source={item.uri}/>
        </Animated.View>
      )
    }).reverse()
  }

  render() {
    return (
      <View style={styles.container}>

        <View style = {{height:60}}>

        </View>
        <View style = {{flex:1}}>
          {this.renderImg()}
        </View>

        <View style = {{height:60}}>

        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

});
