// See https://api.nasa.gov/
import axios from 'axios';
import { API_TOKEN } from 'react-native-dotenv';
import { AsyncStorage, YellowBox } from 'react-native';

const STORAGE_KEY = 'STORAGE_KEY';

function getMonth(date) {
  const month = date.getMonth() + 1;
  return month < 10 ? `0${month}` : `${month}`;
}

export async function getLastSevenAstronomyPicturesOfTheDay(startdate) {
  // We remove deprecation warning because we can't use community version with Expo
  YellowBox.ignoreWarnings(['Warning: AsyncStorage']);
  const url = `https://api.nasa.gov/planetary/apod?api_key=${API_TOKEN}`;
  const dates = [];
  const cachedPicturesAsJSON = await AsyncStorage.getItem(STORAGE_KEY);
  const cachedPictures = cachedPicturesAsJSON !== null ? JSON.parse(cachedPicturesAsJSON) : [];
  const filteredCachedPictures = [];
  const remotePictures = [];
  for (let i = 0; i < 7; i += 1) {
    let found;
    const formatedDate = `${startdate.getFullYear()}-${getMonth(
      startdate,
    )}-${startdate.getDate()}`;
    if (cachedPictures.length > 0) {
      found = cachedPictures.find((picture) => picture.date === formatedDate);
    }
    if (found !== undefined) {
      filteredCachedPictures.push(found);
    } else {
      dates.push(formatedDate);
    }
    startdate.setDate(startdate.getDate() - 1);
  }
  for (const date of dates) {
    remotePictures.push(`${url}&date=${date}`);
  }
  if (remotePictures.length === 0) {
    return filteredCachedPictures;
  }
  return axios
    .all(remotePictures.map((completeUrl) => axios.get(completeUrl)))
    .then(
      axios.spread((...responses) => {
        const fetchedPictures = responses.map((response) => response.data);
        const mergedPictures = cachedPictures.concat(fetchedPictures);
        AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(mergedPictures));
        const toDisplayPictures = filteredCachedPictures.concat(
          fetchedPictures,
        );
        return toDisplayPictures;
      }),
    )
    .catch((error) => {
      console.log(error);
      return filteredCachedPictures;
    });
}
