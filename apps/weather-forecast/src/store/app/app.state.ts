import { IForecastState, initialForecastState } from '../forecast/forecast.state';
import { IRouterStateUrl } from '../router/router.state';

export interface IAppState {
	forecast: IForecastState;
	routerState?: IRouterStateUrl;
}

export const initialAppState: IAppState = {
	forecast: initialForecastState,
};
