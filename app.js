import "react-native-gesture-handler";
import React from "react";
import { StyleSheet, View } from "react-native";
import GalleryScreen from "./gallery/galleryScreen";
import SplashScreen from "./splash/splashScreen";
import PictureScreen from "./picture/pictureScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { withTheme } from "react-native-paper";

const Stack = createStackNavigator();

class App extends React.Component {
  SplashScreen({ navigation }) {
    return (
      <View style={styles.container}>
        <SplashScreen navigation={navigation} />
      </View>
    );
  }

  GalleryScreen({ navigation }) {
    return (
      <View style={styles.container}>
        <GalleryScreen navigation={navigation} />
      </View>
    );
  }

  PictureScreen({ route }) {
    const { picture } = route.params;
    return (
      <View style={styles.container}>
        <PictureScreen picture={picture} />
      </View>
    );
  }

  render() {
    const { colors } = this.props.theme;
    return (
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="SplashScreen"
          screenOptions={{
            headerStyle: {
              backgroundColor: colors.primary
            },
            headerTintColor: "white",
            headerTitleStyle: {
              fontWeight: "bold"
            },
            headerTitleAlign: "center"
          }}
        >
          <Stack.Screen
            name="SplashScreen"
            component={this.SplashScreen}
            options={{
              headerShown: false
            }}
          />
          <Stack.Screen
            name="GalleryScreen"
            component={this.GalleryScreen}
            options={{
              title: "Galerie"
            }}
          />
          <Stack.Screen
            name="PictureScreen"
            component={this.PictureScreen}
            options={{
              headerShown: false
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

export default withTheme(App);

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
