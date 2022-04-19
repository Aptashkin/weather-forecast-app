import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { CityInfo, DailyResp, HourlyResp, WeatherInfo } from '../models/open-weather';

@Injectable({ providedIn: 'root' })
export class WeatherForecastApiService {
	private _apiKey = '010721642521f31b0fbc8c3831d45951';
	constructor(private http: HttpClient, @Inject('url') private url: string) {}

	private getCoorUrl = (cityName: string) => `${this.url}/geo/1.0/direct?q=${cityName}&limit=1&appid=${this._apiKey}`;
	private getHourlyUrl = (info: CityInfo) =>
		`${this.url}/data/2.5/onecall?lat=${info.lat}&lon=${info.lon}&exclude=current,minutely,daily,alerts&units=metric&appid=${this._apiKey}`;
	private getDailyUrl = (info: CityInfo) =>
		`${this.url}/data/2.5/onecall?lat=${info.lat}&lon=${info.lon}&exclude=current,minutely,hourly,alerts&units=metric&appid=${this._apiKey}`;

	public getCity = (cityName: string): Observable<CityInfo[]> =>
		this.http.get<CityInfo[]>(this.getCoorUrl(cityName)).pipe(map(resp => getCityInfo(resp)));

	public getWeatherHourly = (info: CityInfo): Observable<WeatherInfo[]> =>
		this.http.get<HourlyResp>(this.getHourlyUrl(info)).pipe(map(resp => getWeatherInfo(resp.hourly)));

	public getWeatherDaily = (info: CityInfo): Observable<WeatherInfo[]> =>
		this.http.get<DailyResp>(this.getDailyUrl(info)).pipe(map(resp => getWeatherInfo(resp.daily)));
}

const getCityInfo = (array: CityInfo[]) => array.map(e => ({ name: e.name, lat: e.lat, lon: e.lon }));
const getWeatherInfo = (array: any[]) => array.map(e => ({ dt: e.dt, temp: e.temp }));
