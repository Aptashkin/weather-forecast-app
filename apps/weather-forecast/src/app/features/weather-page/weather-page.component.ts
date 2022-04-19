import { Component } from '@angular/core';
import { WeatherModeEnum } from '../../core/enum/weather-mode.enum';
import { WeatherPageService } from './weather-page.service';

@Component({
	selector: 'weather-page',
	templateUrl: './weather-page.component.html',
})
export class WeatherPageComponent {
	public weatherModeEnum = WeatherModeEnum;
	constructor(public weatherService: WeatherPageService) {}
}
