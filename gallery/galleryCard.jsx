import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { CacheManager } from 'react-native-expo-image-cache';

// Fonctionnal style
const GalleryCard = (props) => {
  const { picture } = props;
  const [cachedUrl, setCachedUrl] = useState(null);
  const navigation = useNavigation();

  // See https://modern-javascript.fr/comment-utiliser-une-async-function-dans-un-hook-useeffect-avec-react/
  useEffect(() => {
    async function cacheUrl() {
      setCachedUrl(await CacheManager.get(picture.url).getPath());
    }
    cacheUrl();
  }, []);

  return (
    <View style={{ margin: 10 }}>
      <Card
        onPress={() => {
          navigation.navigate('PictureScreen', {
            picture,
          });
        }}
      >
        <Card.Cover source={{ uri: cachedUrl }} />
        <Card.Content>
          <Title>{picture.title}</Title>
          <Paragraph numberOfLines={3}>{picture.explanation}</Paragraph>
        </Card.Content>
      </Card>
    </View>
  );
};

export default GalleryCard;
