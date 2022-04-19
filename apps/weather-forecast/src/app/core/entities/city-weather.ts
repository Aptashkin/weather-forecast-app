import { WeatherInfo } from "@bp/weather-forecast/services";

export interface ICityWeather {
	name: string;
	items: WeatherInfo[];
	getColumns(): string[];
	getValues(): number[];
	getCityName(): string;
	getDate(item: WeatherInfo): Date;
	prepareTemp(temp: number): number;
	prepareItems(items: WeatherInfo[]): WeatherInfo[];
}

export abstract class CityWeather implements ICityWeather {
	public name: string;
	public items: WeatherInfo[];

	constructor(name: string, items: WeatherInfo[]) {
		this.name = name;
		this.items = this.prepareItems(items);
	}

	public getCityName = () => this.name;
	public getDate = (item: WeatherInfo): Date => new Date(1000 * item.dt);
	public prepareTemp = (temp: number): number => Math.floor(temp);
	abstract getColumns(): string[];
	abstract getValues(): number[];
	abstract prepareItems(items: WeatherInfo[]): WeatherInfo[];
}
