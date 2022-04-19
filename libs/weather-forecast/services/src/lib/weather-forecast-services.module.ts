import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { WeatherForecastApiService } from './services/weather-forecast-api.service';

@NgModule({
	imports: [CommonModule, HttpClientModule],
})
export class WeatherForecastServicesModule {
	public static forRoot(url: string): ModuleWithProviders<WeatherForecastServicesModule> {
		return {
			ngModule: WeatherForecastServicesModule,
			providers: [
				WeatherForecastApiService,
				{
					provide: 'url',
					useValue: url
				}
			]
		}
	}
}
