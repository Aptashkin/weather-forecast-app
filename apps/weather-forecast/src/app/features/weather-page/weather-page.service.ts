import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { ChangeMode, SearchCity } from '../../../store/forecast/forecast.actions';
import { selectCity, selectMode, selectSearchText, selectHasSearchText, selectHourlyForecast, selectDailyForecast } from '../../../store/forecast/forecast.selectors';
import { IAppState } from 'apps/weather-forecast/src/store/app/app.state';
import { WeatherModeEnum } from '../../core/enum/weather-mode.enum';
import { selectModeFromRoute, selectSearchTextFromRoute } from '../../../store/router/router.selectors';

@Injectable()
export class WeatherPageService {
	public mode$ = this.store.pipe(select(selectMode));
	public searchText$ = this.store.pipe(select(selectSearchText));
	public hasSearchText$ = this.store.pipe(select(selectHasSearchText));
	public city$ = this.store.pipe(select(selectCity));
	public hourlyForecast$ = this.store.pipe(select(selectHourlyForecast));
	public dailyForecast$ = this.store.pipe(select(selectDailyForecast));

	public modeFromRoute$ = this.store.pipe(select(selectModeFromRoute));
	public searchTextFromRoute$ = this.store.pipe(select(selectSearchTextFromRoute));

	constructor(private readonly store: Store<IAppState>) {}

	public setMode = (mode: WeatherModeEnum) => this.store.dispatch(new ChangeMode(mode));
	public setSearchText = (text: string) => this.store.dispatch(new SearchCity(text));
}
