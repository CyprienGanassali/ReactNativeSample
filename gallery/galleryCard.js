import React from "react";
import { View } from "react-native";
import { Card, Title, Paragraph } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

// Fonctionnal style
const GalleryCard = props => {
  const picture = props.picture;
  const navigation = useNavigation();
  return (
    <View style={{ margin: 10 }}>
      <Card
        onPress={() => {
          navigation.navigate("PictureScreen", {
            picture: picture
          });
        }}
      >
        <Card.Cover source={{ uri: picture.url }} />
        <Card.Content>
          <Title>{picture.title}</Title>
          <Paragraph numberOfLines={3}>{picture.explanation}</Paragraph>
        </Card.Content>
      </Card>
    </View>
  );
};

export default GalleryCard;
