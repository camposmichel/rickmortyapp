import { ILocation } from './../../core/models/location.model';
import { IEpisode } from './../../core/models/episode.model';
import { ICharacter } from './../../core/models/character.model';
import { TabType } from './../../core/models/app.enum';
import { select, Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import * as AppActions from '../../+state/app/app.actions';
import * as AppSelectors from '../../+state/app/app.selectors';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  loading$ = this.store.pipe(select(AppSelectors.getLoading));
  hasSearch$ = this.store.pipe(select(AppSelectors.getHasSearch));
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

  constructor(private store: Store, private router: Router) {}

  ngOnInit(): void {}

  loadMore() {
    this.store.dispatch(AppActions.loadMoreData());
  }

  selectItem(item: ICharacter | IEpisode | ILocation) {
    this.store.dispatch(AppActions.selectItem({ data: item }));
    this.router.navigate(['/details'])
  }
}
