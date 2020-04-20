import React from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import GalleryCard from "./galleryCard";
import { getLastSevenAstronomyPicturesOfTheDay } from "../api/apod";

class GalleryScreen extends React.Component {
  constructor(props) {
    super(props);
    this.navigation = props.navigation;
    this.state = { pictures: [], isLoading: false, startDate: new Date() };
  }

  componentDidMount() {
    this._loadPictures();
  }

  _loadPictures() {
    if (this.state.isLoading === false) {
      this.setState({ isLoading: true }, () => {
        getLastSevenAstronomyPicturesOfTheDay(this.state.startDate).then(
          data => {
            const updatedDate = this.state.startDate;
            updatedDate.setDate(updatedDate.getDate() - 7);
            this.setState({
              pictures: [...this.state.pictures, ...data],
              isLoading: false,
              startDate: updatedDate
            });
          }
        );
      });
    }
  }

  _clearAndLoadPictures() {
    this.setState({ pictures: [] }, () => {
      this._loadPictures();
    });
  }

  displayLoading = () => {
    if (this.state.isLoading) {
      return (
        <View style={styles.loading_container}>
          <ActivityIndicator size="large" />
        </View>
      );
    }
  };

  render() {
    return (
      <View style={styles.screen_container}>
        <FlatList
          data={this.state.pictures}
          keyExtractor={item => item.date}
          renderItem={({ item }) => <GalleryCard picture={item} />}
          onEndReachedThreshold={0.5}
          onEndReached={() => this._loadPictures()}
        />
        {this.displayLoading()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  screen_container: {
    flex: 1,
    justifyContent: "center"
  },
  loading_container: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 100,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center"
  }
});

export default GalleryScreen;
