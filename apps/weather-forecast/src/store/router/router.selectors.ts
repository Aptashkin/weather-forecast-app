import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromRouter from '@ngrx/router-store';
import { IRouterStateUrl } from './router.state';

export const routerState = createFeatureSelector<fromRouter.RouterReducerState<IRouterStateUrl>>('routerReducer');

export const selectSearchTextFromRoute = createSelector(routerState, route => route.state.queryParams.search);
export const selectModeFromRoute = createSelector(routerState, route => +route.state.queryParams.mode);
