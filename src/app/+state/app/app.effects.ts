import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';
import * as AppActions from './app.actions';


@Injectable()
export class AppEffects {

  loadApps$ = createEffect(() => {
    return this.actions$.pipe( 

      ofType(AppActions.loadApps),
      concatMap(() =>
        /** An EMPTY observable only emits completion. Replace with your own observable API request */
        EMPTY.pipe(
          map(data => AppActions.loadAppsSuccess({ data })),
          catchError(error => of(AppActions.loadAppsFailure({ error }))))
      )
    );
  });


  constructor(private actions$: Actions) {}
}
