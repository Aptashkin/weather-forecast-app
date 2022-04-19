import { Component, Input } from '@angular/core';
import { ICityWeather } from 'apps/weather-forecast/src/app/core/entities/city-weather';

@Component({
	selector: 'weather-table',
	templateUrl: 'weather-table.component.html',
})
export class WeatherTableComponent {
	@Input() forecast: ICityWeather | null = null;

	public get cityName(): string {
		return this.forecast ? this.forecast.name : '';
	}
	public get columns(): string[] {
		return this.forecast ? this.forecast.getColumns() : [];
	}
	public get values(): number[] {
		return this.forecast ? this.forecast.getValues() : [];
	}
}
