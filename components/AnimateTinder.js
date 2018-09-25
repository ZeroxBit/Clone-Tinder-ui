import React from 'react';
import { Text, View, Dimensions, Image, Animated, PanResponder } from 'react-native';
import {styles} from './Styles'
const HEIGHT = Dimensions.get('window').height
const WIDTH = Dimensions.get('window').width

const Users = [
  { id: "1", uri: require('./img/bestias.jpg') },
  { id: "2", uri: require('./img/goku.jpg') },
  { id: "3", uri: require('./img/minato.jpg') },
  { id: "4", uri: require('./img/mundo.jpg') },
]

export default class App extends React.Component {

  constructor() {
    super()

    this.position = new Animated.ValueXY()
    this.state = {
      currentIndex: 0
    }

    this.rotate = this.position.x.interpolate({
      inputRange: [-WIDTH / 2, 0, WIDTH / 2],
      outputRange: ['-10deg', '0deg', '10deg'],
      extrapolate: 'clamp'
    })

    this.rotateAndTranslate = {
      transform: [{
        rotate: this.rotate
      },
      ...this.position.getTranslateTransform()
      ]
    }

    this.likeOpacity = this.position.x.interpolate({
      inputRange: [-WIDTH / 2, 0, WIDTH / 2],
      outputRange: [0, 0, 1],
      extrapolate: 'clamp'
    })
    this.dislikeOpacity = this.position.x.interpolate({
      inputRange: [-WIDTH / 2, 0, WIDTH / 2],
      outputRange: [1, 0, 0],
      extrapolate: 'clamp'
    })

    this.nextCardOpacity = this.position.x.interpolate({
      inputRange: [-WIDTH / 2, 0, WIDTH / 2],
      outputRange: [1, 0, 1],
      extrapolate: 'clamp'
    })
    this.nextCardScale = this.position.x.interpolate({
      inputRange: [-WIDTH / 2, 0, WIDTH / 2],
      outputRange: [1, 0.8, 1],
      extrapolate: 'clamp'
    })

  }
  componentWillMount() {
    this.PanResponder = PanResponder.create({

      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onPanResponderMove: (evt, gestureState) => {

        this.position.setValue({ x: gestureState.dx, y: gestureState.dy })
      },
      onPanResponderRelease: (evt, gestureState) => {

        if (gestureState.dx > 120) {
          Animated.spring(this.position, {
            toValue: { x: WIDTH + 100, y: gestureState.dy }
          }).start(() => {
            this.setState({ currentIndex: this.state.currentIndex + 1 }, () => {
              this.position.setValue({ x: 0, y: 0 })
            })
          })
        }
        else if (gestureState.dx < -120) {
          Animated.spring(this.position, {
            toValue: { x: -WIDTH - 100, y: gestureState.dy }
          }).start(() => {
            this.setState({ currentIndex: this.state.currentIndex + 1 }, () => {
              this.position.setValue({ x: 0, y: 0 })
            })
          })
        }
        else {
          Animated.spring(this.position, {
            toValue: { x: 0, y: 0 },
            friction: 4
          }).start()
        }
      }
    })
  }

  renderUsers = () => {

    return Users.map((item, i) => {


      if (i < this.state.currentIndex) {
        return null
      }
      else if (i == this.state.currentIndex) {

        return (
          <Animated.View
            {...this.PanResponder.panHandlers}
            key={item.id} style={[this.rotateAndTranslate, { height: HEIGHT - 120, width: WIDTH, padding: 10, position: 'absolute' }]}>
            <Animated.View style={[{ opacity: this.likeOpacity, transform: [styles.rotate]}, styles.animatedLike ]}>
              <Text style={styles.txtLike}>LIKE</Text>

            </Animated.View>

            <Animated.View style={[{ opacity: this.dislikeOpacity, transform: [styles.rotate]}, styles.animatedDisLike] }>
              <Text style={styles.txtDisLike}>NOPE</Text>

            </Animated.View>

            <Image
              style={styles.img}
              source={item.uri} />

          </Animated.View>
        )
      }
      else {
        return (
          <Animated.View

            key={item.id} style={[{
              opacity: this.nextCardOpacity,
              transform: [{ scale: this.nextCardScale }],
              height: HEIGHT - 120, width: WIDTH, padding: 10, position: 'absolute'
            }]}>
            <Animated.View style={[{ opacity: 0, transform: [styles.rotate]},syles.animatedLike]}>
              <Text style={styles.txtLike}>LIKE</Text>

            </Animated.View>

            <Animated.View style={[{ opacity: 0, transform: [styles.rotate]}, styles.animatedDisLike]}>
              <Text style={styles.txtDisLike}>NOPE</Text>

            </Animated.View>

            <Image
              style={styles.img}
              source={item.uri} />

          </Animated.View>
        )
      }
    }).reverse()
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={{ height: 60 }}>

        </View>
        <View style={{ flex: 1 }}>
          {this.renderUsers()}
        </View>
        <View style={{ height: 60 }}>

        </View>
        
      </View>

    );
  }
}