import { TabType } from 'src/app/core/models/app.enum';
import * as fromApp from './app.reducer';
import { State } from './app.reducer';
import { selectAppState } from './app.selectors';

describe('App Selectors', () => {
  it('should select the feature state', () => {
    const initialState: State = {
      loading: false,
      tabType: TabType.CHARACTER,
    };

    const result = selectAppState({
      [fromApp.appFeatureKey]: {}
    });

    expect(result).toEqual(initialState);
  });
});
