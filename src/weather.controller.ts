import { Controller, Get, Query } from '@nestjs/common';
import { GeocodeService } from './utils/geocode.service';
import { ForecastService } from './utils/forecast.service';

@Controller('weather')
export class WeatherController {
  constructor(
    private readonly geocodeService: GeocodeService,
    private readonly forecastService: ForecastService,
  ) {}

  @Get()
  async getWeather(@Query('address') address: string) {
    if (!address) {
      return 'Please provide an address';
    }

    try {
      //using geocoding api to fetch latitude, longitude, location
      const { latitude, longitude, location } = await this.geocodeService.geocode(address);

      //using weatherstack api to get address, weather information from latitude, longitude 
      const forecastData = await this.forecastService.forecast(latitude, longitude);

      // console.log(forecastData);

      return {
        location,
        forecastData,
      };
    } catch (error) {
      return error.message;
    }
  }
}
