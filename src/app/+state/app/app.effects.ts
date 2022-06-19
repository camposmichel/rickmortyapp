import { ILocation } from './../../core/models/location.model';
import { IEpisode } from './../../core/models/episode.model';
import { ICharacter } from './../../core/models/character.model';
import { ApiResponse } from './../../core/models/api-response.model';
import { TabType } from './../../core/models/app.enum';
import { LocationService } from './../../core/services/location.service';
import { EpisodeService } from './../../core/services/episode.service';
import { CharacterService } from './../../core/services/character.service';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap, withLatestFrom } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';
import * as AppActions from './app.actions';
import * as AppSelectors from './app.selectors';
import { Store } from '@ngrx/store';

@Injectable()
export class AppEffects {
  selectTabType$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AppActions.selectTabType),
      concatMap((action) => {
        switch (action.tabType) {
          case TabType.CHARACTER:
            return of(AppActions.loadCharacter({}));
          case TabType.EPISODE:
            return of(AppActions.loadEpisode({}));
          case TabType.LOCATION:
            return of(AppActions.loadLocation({}));
          default:
            return of(AppActions.loadCharacter({}));
        }
      })
    );
  });

  loadMoreData$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AppActions.loadMoreData),
      withLatestFrom(this.store$),
      concatMap(([action, { app }]: any) => {
        const {
          characterResponse,
          episodeResponse,
          locationResponse,
          tabType,
        } = app;
        switch (tabType) {
          case TabType.CHARACTER:
            return of(
              AppActions.loadCharacter({
                page: characterResponse.info.next.split('page=')[1],
              })
            );
          case TabType.EPISODE:
            return of(
              AppActions.loadEpisode({
                page: episodeResponse.info.next.split('page=')[1],
              })
            );
          case TabType.LOCATION:
            return of(
              AppActions.loadLocation({
                page: locationResponse.info.next.split('page=')[1],
              })
            );

          default:
            return of(
              AppActions.loadCharacter({
                page: characterResponse.info.next.split('page=')[1],
              })
            );
        }
      })
    );
  });

  loadSearch$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AppActions.loadSearch),
      withLatestFrom(this.store$),
      concatMap(([action, { app }]: any) => {
        const { tabType } = app;

        if (!action.search) {
          return of(AppActions.selectTabType({tabType: tabType}))
        }

        let request: Observable<ApiResponse<ICharacter | IEpisode | ILocation>>;
        switch (tabType) {
          case TabType.CHARACTER:
            request = this.characterService.search(action.search);
            break;
          case TabType.EPISODE:
            request = this.episodeService.search(action.search);
            break;
          case TabType.LOCATION:
            request = this.locationService.search(action.search);
            break;
          default:
            request = this.characterService.search(action.search);
            break;
        }
        return request.pipe(
          map((data) =>
            AppActions.loadSuccess({ data, loadMore: false, hasSearch: true })
          ),
          catchError((error) => of(AppActions.loadAppsFailure({ error })))
        );
      })
    );
  });

  loadCharacter$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AppActions.loadCharacter),
      concatMap((action) =>
        this.characterService.get(action.page).pipe(
          map((data) =>
            AppActions.loadSuccess({ data, loadMore: !!action.page })
          ),
          catchError((error) => of(AppActions.loadAppsFailure({ error })))
        )
      )
    );
  });

  loadEpisode$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AppActions.loadEpisode),
      concatMap((action) =>
        this.episodeService.get(action.page).pipe(
          map((data) =>
            AppActions.loadSuccess({ data, loadMore: !!action.page })
          ),
          catchError((error) => of(AppActions.loadAppsFailure({ error })))
        )
      )
    );
  });

  loadLocation$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AppActions.loadLocation),
      concatMap((action) =>
        this.locationService.get(action.page).pipe(
          map((data) =>
            AppActions.loadSuccess({ data, loadMore: !!action.page })
          ),
          catchError((error) => of(AppActions.loadAppsFailure({ error })))
        )
      )
    );
  });

  constructor(
    private store$: Store,
    private actions$: Actions,
    private characterService: CharacterService,
    private episodeService: EpisodeService,
    private locationService: LocationService
  ) {}
}
