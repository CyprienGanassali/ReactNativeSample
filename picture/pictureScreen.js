import React from "react";
import { View, Image, ScrollView } from "react-native";
import { withTheme, Title, Paragraph } from "react-native-paper";

const PictureScreen = props => {
  const picture = props.picture;
  const { colors } = props.theme;
  return (
    <View style={{ flex: 1, backgroundColor: colors.backgroundColor }}>
      <ScrollView>
        <Image source={{ uri: picture.url }} style={{ height: 250 }} />
        <View style={{ margin: 10 }}>
          <Title>{picture.title}</Title>
          <Paragraph>{picture.explanation}</Paragraph>
        </View>
      </ScrollView>
    </View>
  );
};

export default withTheme(PictureScreen);
