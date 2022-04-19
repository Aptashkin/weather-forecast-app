import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { WeatherPageComponent } from './weather-page.component';

const routes: Routes = [
	{
		path: '',
		component: WeatherPageComponent,
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class WeatherPageRoute {}
