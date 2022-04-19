import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { getForecastReducers } from '../../../store/forecast/forecast.reducers';
import { EffectsModule } from '@ngrx/effects';
import { ForecastEffects } from '../../../store/forecast/forecast.effects';
import { WeatherPageComponent } from './weather-page.component';
import { WeatherHeaderComponent } from './components/weather-header/weather-header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { WeatherTableComponent } from './components/weather-table/weather-table.component';
import { WeatherPageRoute } from './weather-page.route';
import { WeatherPageService } from './weather-page.service';

const COMPONENTS = [
	WeatherPageComponent,
	WeatherHeaderComponent,
	WeatherTableComponent,
];

@NgModule({
	imports: [
		WeatherPageRoute,
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		StoreModule.forFeature('forecast', getForecastReducers),
		EffectsModule.forFeature([ForecastEffects]),
	],
	declarations: [...COMPONENTS],
	providers: [WeatherPageService]
})
export class WeatherPageModule {}
