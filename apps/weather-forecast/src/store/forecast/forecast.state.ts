import { CityInfo } from '@bp/weather-forecast/services';
import { DailyCityWeather } from '../../app/core/entities/city-weather-daily';
import { HourlyCityWeather } from '../../app/core/entities/city-weather-hourly';
import { WeatherModeEnum } from '../../app/core/enum/weather-mode.enum';

export interface IForecastState {
	mode: WeatherModeEnum;
	city: CityInfo | null;
	dailyForecast: DailyCityWeather | null;
	hourlyForecast: HourlyCityWeather | null;
	searchText: string;
}

export const initialForecastState: IForecastState = {
	mode: WeatherModeEnum.Hourly,
	city: null,
	dailyForecast: null,
	hourlyForecast: null,
	searchText: '',
};

export interface IForecastFeatureState {
	forecast: IForecastState;
}
