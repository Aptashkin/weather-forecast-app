export interface CityInfo {
	name: string;
	lat: number;
	lon: number;
}

export interface DailyResp {
	daily: WeatherInfo[];
}

export interface HourlyResp {
	hourly: WeatherInfo[];
}

export interface Temp {
	day: number;
}

export interface WeatherInfo {
	dt: number;
	temp: number | Temp;
}
