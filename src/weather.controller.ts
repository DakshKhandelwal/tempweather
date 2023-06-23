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
      const { latitude, longitude, location } = await this.geocodeService.geocode(address);
      const forecastData = await this.forecastService.forecast(latitude, longitude);

      return {
        location,
        forecastData,
      };
    } catch (error) {
      return error.message;
    }
  }
}
