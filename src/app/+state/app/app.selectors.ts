import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromApp from './app.reducer';

export const selectAppState = createFeatureSelector<fromApp.State>(
  fromApp.appFeatureKey
);

export const getLoading = createSelector(
  selectAppState,
  (state: fromApp.State) => state.loading
);

export const getTabType = createSelector(
  selectAppState,
  (state: fromApp.State) => state.tabType
);

export const getCharacterList = createSelector(
  selectAppState,
  (state: fromApp.State) => state.characterResponse?.results || []
);

export const getEpisodeLisst = createSelector(
  selectAppState,
  (state: fromApp.State) => state.episodeResponse?.results || []
);

export const getLocationList = createSelector(
  selectAppState,
  (state: fromApp.State) => state.locationResponse?.results || []
);

export const getItemSelected = createSelector(
  selectAppState,
  (state: fromApp.State) => state.itemSelected
);

export const getHasSearch = createSelector(
  selectAppState,
  (state: fromApp.State) => state.hasSearch
);
