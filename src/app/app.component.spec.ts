import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';

import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let spectator: Spectator<AppComponent>;
  const createComponent = createComponentFactory(AppComponent);

  beforeEach(() => (spectator = createComponent()));

  it('creates the app', () => {
    expect(spectator.component).toBeInstanceOf(AppComponent);
  });

  it(`has the title 'ofpsm'`, () => {
    expect(spectator.component.title).toEqual('ofpsm');
  });

  it('render the title', () => {
    expect(spectator.query('h1')).toHaveText('Welcome ofpsm');
  });
});
