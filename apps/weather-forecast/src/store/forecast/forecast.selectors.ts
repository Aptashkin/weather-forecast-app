import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IForecastState } from './forecast.state';
import { ICityWeather } from '../../app/core/entities/city-weather';

export const forecastState = createFeatureSelector<IForecastState>('forecast');

export const selectMode = createSelector(forecastState, state => state.mode);
export const selectCity = createSelector(forecastState, state => state.city);
export const selectDailyForecast = createSelector(forecastState, state => state.dailyForecast as ICityWeather);
export const selectHourlyForecast = createSelector(forecastState, state => state.hourlyForecast as ICityWeather);
export const selectSearchText = createSelector(forecastState, state => state.searchText);
export const selectHasSearchText = createSelector(forecastState, state => state.searchText !== '' && !state.city);

