import { TabType } from './../../core/models/app.enum';
import { select, Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import * as AppActions from '../../+state/app/app.actions';
import * as AppSelectors from '../../+state/app/app.selectors';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  tabTypeEnum = TabType;
  value: string = '';
  tabTypeSelected$ = this.store.pipe(select(AppSelectors.getTabType));

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(
      AppActions.selectTabType({ tabType: TabType.CHARACTER })
    );
  }

  setTabType(tabType: TabType) {
    this.store.dispatch(AppActions.selectTabType({ tabType }));
  }
}
