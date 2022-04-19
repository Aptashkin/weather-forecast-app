import { IForecastState, initialForecastState } from './forecast.state';
import { EForecastActions, ForecastActions } from './forecast.actions';
import { DailyCityWeather } from '../../app/core/entities/city-weather-daily';
import { HourlyCityWeather } from '../../app/core/entities/city-weather-hourly';

export function getForecastReducers(state: IForecastState, action: ForecastActions): IForecastState {
	return forecastReducers(state, action);
}

const forecastReducers = (state = initialForecastState, action: ForecastActions): IForecastState => {
	switch (action.type) {
		case EForecastActions.ChangeMode: {
			return {
				...state,
				mode: action.mode,
			};
		}
		case EForecastActions.ChangeSearchText: {
			return {
				...state,
				searchText: action.searchText,
			};
		}
		case EForecastActions.SearchCitySuccess: {
			return {
				...state,
				city: action.city,
			};
		}
		case EForecastActions.SearchCityFailed: {
			return {
				...state,
				city: null,
			};
		}
		case EForecastActions.LoadWeatherForecastSuccess: {
			const name = state.city ? state.city.name : '';
			return {
				...state,
				dailyForecast: new DailyCityWeather(name, action.daily),
				hourlyForecast: new HourlyCityWeather(name, action.hourly),
			};
		}

		default:
			return state;
	}
};
