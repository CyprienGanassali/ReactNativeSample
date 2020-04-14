// See https://api.nasa.gov/
import axios from "axios";
import { API_TOKEN } from "react-native-dotenv";

function getMonth(date) {
  const month = date.getMonth() + 1;
  return month < 10 ? `0${month}` : `${month}`;
}

export function getLastSevenAstronomyPicturesOfTheDay(startdate) {
  const dates = [];
  for (let i = 0; i < 7; i++) {
    dates.push(
      `${startdate.getFullYear()}-${getMonth(startdate)}-${startdate.getDate()}`
    );
    startdate.setDate(startdate.getDate() - 1);
  }
  const url = `https://api.nasa.gov/planetary/apod?api_key=${API_TOKEN}`;
  const completeUrls = [];
  for (const date of dates) {
    completeUrls.push(`${url}&date=${date}`);
  }
  return axios
    .all(completeUrls.map(completeUrl => axios.get(completeUrl)))
    .then(
      axios.spread((...responses) => responses.map(response => response.data))
    )
    .catch(error => console.error(error));
}
