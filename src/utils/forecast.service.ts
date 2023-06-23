import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class ForecastService {
  async forecast(latitude: number, longitude: number): Promise<string> {
    try {
      const url = `https://api.darksky.net/forecast/9d1465c6f3bb7a6c71944bdd8548d026/${latitude},${longitude}`;

      const response = await axios.get(url);

      const { data } = response;

      return `${data.daily.data[0].summary} It is currently ${data.currently.temperature} degrees out. There is a ${data.currently.precipProbability}% chance of rain.`;
    } catch (error) {
      throw new Error('Unable to fetch forecast data');
    }
  }
}
