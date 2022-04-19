import { Action } from '@ngrx/store';
import { CityInfo, WeatherInfo } from '../../../../../libs/weather-forecast/services/src/lib/models/open-weather';
import { WeatherModeEnum } from '../../app/core/enum/weather-mode.enum';

export enum EForecastActions {
	ChangeMode = '[Forecast] Change Mode',
	ChangeSearchText = '[Forecast] Change Search Text',
	SearchCity = '[Forecast] Search City',
	SearchCitySuccess = '[Forecast] Search City Success',
	SearchCityFailed = '[Forecast] Search City Failed',
	LoadWeatherForecast = '[Forecast] Load Weather Forecast',
	LoadWeatherForecastSuccess = '[Forecast] Load Weather Forecast Success',
}

export class ChangeMode implements Action {
	public readonly type = EForecastActions.ChangeMode;
	constructor(public mode: WeatherModeEnum) {}
}

export class ChangeSearchText implements Action {
	public readonly type = EForecastActions.ChangeSearchText;
	constructor(public searchText: string) {}
}

export class SearchCity implements Action {
	public readonly type = EForecastActions.SearchCity;
	constructor(public searchText: string) {}
}

export class SearchCitySuccess implements Action {
	public readonly type = EForecastActions.SearchCitySuccess;
	constructor(public city: CityInfo) {}
}

export class SearchCityFailed implements Action {
	public readonly type = EForecastActions.SearchCityFailed;
}

export class LoadWeatherForecast implements Action {
	public readonly type = EForecastActions.LoadWeatherForecast;
}

export class LoadWeatherForecastSuccess implements Action {
	public readonly type = EForecastActions.LoadWeatherForecastSuccess;
	constructor(public hourly: WeatherInfo[], public daily: WeatherInfo[]) {}
}

export type ForecastActions =
	| ChangeMode
	| ChangeSearchText
	| SearchCity
	| SearchCitySuccess
	| SearchCityFailed
	| LoadWeatherForecast
	| LoadWeatherForecastSuccess;
