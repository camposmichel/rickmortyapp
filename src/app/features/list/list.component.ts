import { TabType } from './../../core/models/app.enum';
import { select, Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import * as AppActions from '../../+state/app/app.actions';
import * as AppSelectors from '../../+state/app/app.selectors';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  loading$ = this.store.pipe(select(AppSelectors.getLoading));
  tabTypeSelected$ = this.store.pipe(select(AppSelectors.getTabType));
  items$: {
    [TabType.CHARACTER]: Observable<any>;
    [TabType.EPISODE]: Observable<any>;
    [TabType.LOCATION]: Observable<any>;
  } = {
    [TabType.CHARACTER]: this.store.pipe(select(AppSelectors.getCharacterList)),
    [TabType.EPISODE]: this.store.pipe(select(AppSelectors.getEpisodeLisst)),
    [TabType.LOCATION]: this.store.pipe(select(AppSelectors.getLocationList)),
  };
  tabTypeEnum = TabType;

  constructor(private store: Store) {}

  ngOnInit(): void {}

  loadMore() {
    this.store.dispatch(AppActions.loadMoreData())
  }
}
