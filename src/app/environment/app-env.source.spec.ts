import { createHttpFactory, HttpMethod, SpectatorHttp } from '@ngneat/spectator/jest';

import { AppEnvTypeError } from './app-env.model';
import { APP_ENV_PATH, AppEnvSource } from './app-env.source';

const appEnv = {
  name: '',
  production: false
};

describe('AppEnvSource', () => {
  let spectator: SpectatorHttp<AppEnvSource>;
  const createService = createHttpFactory(AppEnvSource);

  beforeEach(() => (spectator = createService()));

  it(`returns the AppEnv`, (done) => {
    spectator.service.load().subscribe({
      next: (value) => {
        expect(value).toEqual(appEnv);
        done();
      }
    });
    spectator.expectOne(APP_ENV_PATH, HttpMethod.GET).flush(appEnv);
  });

  it(`throws AppEnvTypeError if no AppEnv`, (done) => {
    spectator.service.load().subscribe({
      error: (value) => {
        expect(value).toEqual(new AppEnvTypeError());
        done();
      }
    });
    spectator.expectOne(APP_ENV_PATH, HttpMethod.GET).flush({});
  });
});
