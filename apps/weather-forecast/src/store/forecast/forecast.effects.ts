import { Injectable } from '@angular/core';
import { CityInfo, WeatherForecastApiService } from '@bp/weather-forecast/services';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
	ChangeMode,
	ChangeSearchText,
	EForecastActions,
	LoadWeatherForecastSuccess,
	SearchCity,
	SearchCityFailed,
	SearchCitySuccess,
} from './forecast.actions';
import { forkJoin, map, of, switchMap, tap, withLatestFrom } from 'rxjs';
import { Store } from '@ngrx/store';
import { IForecastState } from './forecast.state';
import { IAppState } from '../app/app.state';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable()
export class ForecastEffects {
	constructor(
		private readonly weatherService: WeatherForecastApiService,
		private readonly actions$: Actions,
		private readonly store: Store<IAppState>,
		private readonly router: Router,
		private readonly activatedRoute: ActivatedRoute
	) {}

	setMode$ = createEffect(
		() =>
			this.actions$.pipe(
				ofType<ChangeMode>(EForecastActions.ChangeMode),
				tap((action) => {
					if (action.mode) {
						this.router.navigate([], {
							relativeTo: this.activatedRoute,
							queryParams: { mode: action.mode },
							queryParamsHandling: 'merge'
						});
					}
				})
			),
		{ dispatch: false }
	)

	setSearchText = createEffect(
		() =>
			this.actions$.pipe(
				ofType<ChangeSearchText>(EForecastActions.ChangeSearchText),
				tap((action) => {
					if (action.searchText) {
						this.router.navigate([], {
							relativeTo: this.activatedRoute,
							queryParams: { search: action.searchText },
							queryParamsHandling: 'merge'
						});
					}
				})
			),
		{ dispatch: false }
	)

	searchCity$ = createEffect(
		() =>
			this.actions$.pipe(
				ofType<SearchCity>(EForecastActions.SearchCity),
				switchMap(action => forkJoin([
					of(action),
					action.searchText ? this.weatherService.getCity(action.searchText) : of([])
				])),
				tap(([action, city]: [SearchCity, CityInfo[]]) => {
					this.store.dispatch(new ChangeSearchText(action.searchText));
					if (city[0]) {
						this.store.dispatch(new SearchCitySuccess(city[0]));
					} else {
						this.store.dispatch(new SearchCityFailed());
					}
				})
			),
		{ dispatch: false }
	);

	loadForecast$ = createEffect(() =>
		this.actions$.pipe(
			ofType(EForecastActions.SearchCitySuccess),
			withLatestFrom(this.store),
			map(([_, store]: [SearchCitySuccess, IAppState]) => store.forecast),
			switchMap((state: IForecastState) =>
				forkJoin([
					this.weatherService.getWeatherHourly(state.city as CityInfo),
					this.weatherService.getWeatherDaily(state.city as CityInfo),
				])
			),
			switchMap(([hourly, daily]) => of(new LoadWeatherForecastSuccess(hourly, daily)))
		)
	);
}
