import { TabType } from './../../core/models/app.enum';
import { select, Store } from '@ngrx/store';
import { Component, OnDestroy, OnInit } from '@angular/core';
import * as AppActions from '../../+state/app/app.actions';
import * as AppSelectors from '../../+state/app/app.selectors';
import {
  debounceTime,
  distinctUntilChanged,
  Subject,
  Subscription,
} from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  tabTypeEnum = TabType;
  search: string = '';
  tabTypeSelected$ = this.store.pipe(select(AppSelectors.getTabType));
  searching$: Subject<string> = new Subject<string>();
  private subscription!: Subscription;

  constructor(private store: Store) {
    this.subscription = this.searching$
      .pipe(debounceTime(400), distinctUntilChanged())
      .subscribe((text) => this.searchByText(text));
  }

  ngOnInit(): void {
    this.initTab()
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

  initTab() {
    this.setTabType(TabType.CHARACTER)
  }

  setTabType(tabType: TabType) {
    this.store.dispatch(AppActions.selectTabType({ tabType }));
  }

  searchByText(text: string) {
    this.store.dispatch(AppActions.loadSearch({ search: text }));
  }
}
