import React from 'react';
import {
  View, StyleSheet, Text, Image, Animated,
} from 'react-native';
import { withTheme } from 'react-native-paper';

class SplashScreen extends React.Component {
  constructor(props) {
    super(props);
    this.navigation = props.navigation;
    this.state = { fadeAnim: new Animated.Value(0) };
  }

  componentDidMount() {
    Animated.timing(this.state.fadeAnim, {
      toValue: 1,
      duration: 5000,
    }).start(() => {
      this.navigation.replace('GalleryScreen'); // We remove SplashScreen from stack
    });
  }

  render() {
    const { colors } = this.props.theme;
    return (
      <View style={styles.container}>
        <View style={[styles.top, colors.backgroundColor]} />
        <View style={styles.bottom} />
        <View style={styles.animated_view_container}>
          <Animated.View
            style={[styles.animated_view, { opacity: this.state.fadeAnim }]}
          >
            <Image
              source={require('./images/logo.png')}
              style={styles.logo}
              resizeMode="contain"
            />
            <Text style={styles.title}>Astronomy Picture of the Day</Text>
          </Animated.View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  top: {
    flex: 1,
  },
  bottom: {
    flex: 1,
    backgroundColor: 'white',
  },
  animated_view_container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20, // Based on title font size
  },
  logo: {
    width: 150,
    height: 150,
    alignSelf: 'center',
  },
  title: {
    marginTop: 5,
    fontWeight: 'bold',
    fontSize: 20,
  },
});

export default withTheme(SplashScreen);
