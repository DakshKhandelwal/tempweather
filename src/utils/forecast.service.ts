import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class ForecastService {
  async forecast(latitude: number, longitude: number): Promise<string> {
    try {
      const accessKey = "280ecd5919f4f125fdeb0c7e7eb11bae";
      const url = `http://api.weatherstack.com/current?access_key=${accessKey}&query=${latitude},${longitude}`;
      console.log(url);
      const response = await axios.get(url);
      // console.log(response.data);
      return response.data;
      // console.log( `It is currently ${response.data.current.temperature} degrees out. It is ${response.data.current.weather_descriptions[0]} weather.`);

    } catch (error) {
      throw new Error('Unable to fetch forecast data');
    }
  }
}
