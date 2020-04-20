import React, { useEffect, useState } from "react";
import { View, Image, ScrollView } from "react-native";
import { withTheme, Title, Paragraph } from "react-native-paper";
import { CacheManager } from "react-native-expo-image-cache";

const PictureScreen = props => {
  const { picture } = props;
  const [cachedUrl, setCachedUrl] = useState(null);
  const { colors } = props.theme;

  // See https://modern-javascript.fr/comment-utiliser-une-async-function-dans-un-hook-useeffect-avec-react/
  useEffect(() => {
    async function cacheUrl() {
      setCachedUrl(await CacheManager.get(picture.url).getPath());
    }
    cacheUrl();
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: colors.backgroundColor }}>
      <ScrollView>
        <Image source={{ uri: cachedUrl }} style={{ height: 250 }} />
        <View style={{ margin: 10 }}>
          <Title>{picture.title}</Title>
          <Paragraph>{picture.explanation}</Paragraph>
        </View>
      </ScrollView>
    </View>
  );
};

export default withTheme(PictureScreen);
