import { ApiResponse } from './../../core/models/api-response.model';
import { createAction, props } from '@ngrx/store';
import { TabType } from 'src/app/core/models/app.enum';

export const loadAppsFailure = createAction(
  '[App] Load Apps Failure',
  props<{ error: any }>()
);

export const selectTabType = createAction(
  '[App] Select Tab Type',
  props<{ tabType: TabType }>()
);

export const loadMoreData = createAction(
  '[App] Load More Data'
);

export const loadSearch = createAction(
  '[App] Load Search',
  props<{ search: string }>()
);

export const loadCharacter = createAction(
  '[App] Load Character',
  props<{ page?: number }>()
);

export const loadEpisode = createAction(
  '[App] Load Episode',
  props<{ page?: number }>()
);

export const loadLocation = createAction(
  '[App] Load Location',
  props<{ page?: number }>()
);

export const loadSuccess = createAction(
  '[App] Load Success',
  props<{ data: ApiResponse<any>, loadMore: boolean }>()
);
