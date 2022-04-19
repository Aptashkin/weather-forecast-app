import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { environment } from '../environments/environment';

import { AppComponent } from './app.component';
import { WeatherForecastServicesModule } from '@bp/weather-forecast/services';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { RouterStateSerializer, StoreRouterConnectingModule } from '@ngrx/router-store';
import { AppRouteModule } from './app.router';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CustomSerializer, routerReducers } from '../store/router/router.reducers';

@NgModule({
	imports: [
		BrowserModule,
		ReactiveFormsModule,
		AppRouteModule,
		BrowserAnimationsModule,
		WeatherForecastServicesModule.forRoot(environment.openWeatherUrl),
		StoreModule.forRoot(routerReducers),
		EffectsModule.forRoot([]),
		StoreRouterConnectingModule.forRoot({ serializer: CustomSerializer }),
		!environment.production ? StoreDevtoolsModule.instrument() : [],
	],
	declarations: [AppComponent],
	providers: [{ provide: RouterStateSerializer, useClass: CustomSerializer }],
	bootstrap: [AppComponent],
	exports: [StoreModule],
})
export class AppModule {}
