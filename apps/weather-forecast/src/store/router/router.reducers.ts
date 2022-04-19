import { ActionReducerMap } from '@ngrx/store';
import * as fromRouter from '@ngrx/router-store';
import { IRouterStateUrl, State } from './router.state';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

export const routerReducers: ActionReducerMap<State> = {
	routerReducer: fromRouter.routerReducer,
};

export class CustomSerializer implements fromRouter.RouterStateSerializer<IRouterStateUrl> {
	public serialize(routerState: RouterStateSnapshot): IRouterStateUrl {
		const { url } = routerState;
		const { queryParams } = routerState.root;

		let state: ActivatedRouteSnapshot = routerState.root;
		while (state.firstChild) {
			state = state.firstChild;
		}

		const { params } = state;

		return { url, queryParams, params };
	}
}
