import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import * as AppSelectors from '../../+state/app/app.selectors';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit {
  itemSelected$: Observable<any> = this.store.pipe(select(AppSelectors.getItemSelected));

  constructor(private store: Store) {}

  ngOnInit(): void {}
}
