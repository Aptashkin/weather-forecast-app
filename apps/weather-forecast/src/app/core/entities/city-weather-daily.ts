import { Temp, WeatherInfo } from '@bp/weather-forecast/services';
import { CityWeather, ICityWeather } from './city-weather';

export class DailyCityWeather extends CityWeather implements ICityWeather {
	private _days = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];
	constructor(name: string, items: WeatherInfo[]) {
		super(name, items);
	}

	public prepareItems(items: WeatherInfo[]): WeatherInfo[] {
		return items.slice(0, 7);
	}

	public getColumns(): string[] {
		return this.items.map(e => {
			return `${this._days[this.getDate(e).getDay()]}`;
		});
	}

	public getValues(): number[] {
		return this.items.map(e => this.prepareTemp((e.temp as Temp).day));
	}
}
