import { Module } from '@nestjs/common';
import { WeatherController } from './weather.controller';
import { GeocodeService } from './utils/geocode.service';
import { ForecastService } from './utils/forecast.service';

@Module({
  controllers: [WeatherController],
  providers: [GeocodeService, ForecastService],
})
export class WeatherModule {}
