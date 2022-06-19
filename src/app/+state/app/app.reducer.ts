import { TabType } from './../../core/models/app.enum';
import { ILocation } from './../../core/models/location.model';
import { IEpisode } from './../../core/models/episode.model';
import { ICharacter } from './../../core/models/character.model';
import { Action, createReducer, on } from '@ngrx/store';
import * as AppActions from './app.actions';
import { ApiResponse } from 'src/app/core/models/api-response.model';

export const appFeatureKey = 'app';

export interface State {
  loading: boolean;
  hasSearch?: boolean;
  tabType: TabType;
  characterResponse?: ApiResponse<ICharacter>;
  episodeResponse?: ApiResponse<IEpisode>;
  locationResponse?: ApiResponse<ILocation>;
  itemSelected?: ICharacter | IEpisode | ILocation;
}

export const initialState: State = {
  loading: false,
  tabType: TabType.CHARACTER,
};

export const reducer = createReducer(
  initialState,
  on(AppActions.loadAppsFailure, (state, action) => state),
  on(AppActions.loadCharacter, (state, action) => ({
    ...state,
    loading: true,
  })),
  on(AppActions.loadEpisode, (state, action) => ({ ...state, loading: true })),
  on(AppActions.loadLocation, (state, action) => ({ ...state, loading: true })),
  on(
    AppActions.selectTabType,
    (state, action) => (state = { ...state, tabType: action.tabType })
  ),
  on(AppActions.loadSuccess, (state, action) => {
    switch (state.tabType) {
      case TabType.CHARACTER:
        return handleState(state, action, 'characterResponse');
      case TabType.EPISODE:
        return handleState(state, action, 'episodeResponse');
      case TabType.LOCATION:
        return handleState(state, action, 'locationResponse');
      default:
        return handleState(state, action, 'characterResponse');
    }
  }),
  on(
    AppActions.selectItem,
    (state, action) => (state = { ...state, itemSelected: action.data })
  )
);

function handleState(
  state: any,
  action: {
    data: ApiResponse<any>;
    loadMore: boolean;
    hasSearch?: boolean;
  },
  property: string
): State {
  const results = state[property]?.results;
  return {
    ...state,
    loading: false,
    hasSearch: action.hasSearch,
    [property]: action.loadMore
      ? {
          ...action.data,
          results: results?.concat(action.data.results) || [],
        }
      : action.data,
  };
}
