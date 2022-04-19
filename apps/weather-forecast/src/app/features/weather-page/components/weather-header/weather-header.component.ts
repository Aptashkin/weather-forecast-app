import { Component, Input, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { WeatherModeEnum } from 'apps/weather-forecast/src/app/core/enum/weather-mode.enum';
import { debounceTime, Subscription } from 'rxjs';
import { WeatherPageService } from '../../weather-page.service';

@Component({
	selector: 'weather-header',
	templateUrl: './weather-header.component.html',
})
export class WeatherHeaderComponent implements OnDestroy {
	public form: FormGroup;
	public weatherModeEnum = WeatherModeEnum;
	public subs = new Subscription();

	@Input() public set mode(mode: WeatherModeEnum | null) {
		this.form.get('mode')?.patchValue(mode ? mode : WeatherModeEnum.Hourly);
	}
	@Input() public set searchText(text: string | null) {
		if (text) {
			this.form.get('searchText')?.patchValue(text);
		}
	}

	constructor(public weatherService: WeatherPageService, public fb: FormBuilder) {
		this.form = this.fb.group({
			mode: new FormControl(WeatherModeEnum.Hourly),
			searchText: new FormControl(''),
		});

		this.subs.add(
			this.form
				.get('searchText')
				?.valueChanges.pipe(debounceTime(500))
				.subscribe(e => {
					this.weatherService.setSearchText(e);
				})
		);

		this.subs.add(
			this.form.get('mode')?.valueChanges.subscribe(e => {
				this.weatherService.setMode(e);
			})
		);
	}

	public ngOnDestroy() {
		this.subs.unsubscribe();
	}
}
