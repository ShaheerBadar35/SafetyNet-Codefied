import axios from 'axios';

// const PLACES_API_KEY: any = 'AIzaSyD05e5hXExS0i3u7_dNfBqqglC-I6pC_nE';
const HERE_PLATFORM_API_KEY: any =
  '8IhfgC0BzeeIJ_I6WUYyCdCL2-0y9HFbspdp8Sv28u8';

const getPlacesSuggestion = (params: any) => {
   // $&
  return axios
    .create({
      baseURL: 'https://geocode.search.hereapi.com/',
      // baseURL: 'https://maps.googleapis.com/',
      timeout: 12000,
    })
    .get(
      // params?.latitude && params?.longitude
      // ?
      `https://discover.search.hereapi.com/v1/discover?q=${params?.location}&at=${params?.latitude},${params?.longitude}&apiKey=${HERE_PLATFORM_API_KEY}`,
      // `v1/geocode?q=${params?.location}&lat=${params?.latitude}&lon=${params?.longitude}&apiKey=${HERE_PLATFORM_API_KEY}`,
      // : `v1/geocode?q=${params?.location}&limit=10&apiKey=${HERE_PLATFORM_API_KEY}`,
    );
  // .get(
  //   `v1/geocode?q=${params?.location}&limit=10&apiKey=${HERE_PLATFORM_API_KEY}`,
  //   // `${ENDPOINTS.PLACES_SUGGESTION}?input=${params?.location}&key=${PLACES_API_KEY}`,
  // );
};

export {getPlacesSuggestion};
