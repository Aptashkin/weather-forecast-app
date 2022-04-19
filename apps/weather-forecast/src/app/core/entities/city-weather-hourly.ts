import { WeatherInfo } from '@bp/weather-forecast/services';
import { CityWeather, ICityWeather } from './city-weather';

export class HourlyCityWeather extends CityWeather implements ICityWeather {
	constructor(name: string, items: WeatherInfo[]) {
		super(name, items);
	}

	public prepareItems(items: WeatherInfo[]): WeatherInfo[] {
		return items.filter((e, i) => i % 3 === 0).slice(0, 8);
	}

	public getColumns(): string[] {
		return this.items.map(e => {
			return `${this.getDate(e).getHours()}:00`;
		});
	}

	public getValues(): number[] {
		return this.items.map(e => this.prepareTemp(e.temp as number));
	}
}
