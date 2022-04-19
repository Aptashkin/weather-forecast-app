import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

const routes: Routes = [
	{
		path: '',
		redirectTo: 'weather',
		pathMatch: 'full',
	},
	{
		path: 'weather',
		loadChildren: (): any => import('./features/weather-page/weather-page.module').then(m => m.WeatherPageModule),
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRouteModule {}
