import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class GeocodeService {
  async geocode(address: string): Promise<{ latitude: number; longitude: number; location: string }> {
    try {
      const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?limit=1&access_token=pk.eyJ1IjoidGFsaGFraHdqYTA2IiwiYSI6ImNsZGxmeHoyZDAxYnUzb3RjcWkwcTl6Y2kifQ.fILG1KajQ1DgZgYQwzG3xw`;

      const response = await axios.get(url);

      console.log("Hi this is .data ",response.data);

      if (response.data.features.length === 0) {
        throw new Error('Unable to find location. Try another search.');
      }

      console.log("Hi this is .feature ",response.data.features);

      const geocodeData = {
        latitude: response.data.features[0].center[1],
        longitude: response.data.features[0].center[0],
        location: response.data.features[0].place_name,
      };
      console.log("This is geodata ",geocodeData);
      return geocodeData;
    } catch (error) {
      throw new Error('Unable to fetch geocode data');
    }
  }
}
