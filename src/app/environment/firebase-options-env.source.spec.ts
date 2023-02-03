import { createHttpFactory, HttpMethod, SpectatorHttp } from '@ngneat/spectator/jest';

import { FirebaseOptionsEnvTypeError } from './firebase-options-env.model';
import { FIREBASE_OPTIONS_ENV_PATH, FirebaseOptionsEnvSource } from './firebase-options-env.source';

const firebaseOptionsEnv = {
  apiKey: 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
  projectId: 'aaaaaa-00000',
  appId: '0:000000000000:web:0000000000000000000000'
};

describe('FirebaseOptionsEnvSource', () => {
  let spectator: SpectatorHttp<FirebaseOptionsEnvSource>;
  const createService = createHttpFactory(FirebaseOptionsEnvSource);

  beforeEach(() => (spectator = createService()));

  it(`returns the FirebaseOptionsEnv with default 'useEmulators' false`, (done) => {
    spectator.service.load().subscribe({
      next: (value) => {
        expect(value).toEqual({ ...firebaseOptionsEnv, useEmulators: false });
        done();
      }
    });
    spectator.expectOne(FIREBASE_OPTIONS_ENV_PATH, HttpMethod.GET).flush(firebaseOptionsEnv);
  });

  it(`returns the FirebaseOptionsEnv with custom 'useEmulators'`, (done) => {
    const customFirebaseEnvJson = { ...firebaseOptionsEnv, useEmulators: true };
    spectator.service.load().subscribe({
      next: (value) => {
        expect(value).toEqual(customFirebaseEnvJson);
        done();
      }
    });
    spectator.expectOne(FIREBASE_OPTIONS_ENV_PATH, HttpMethod.GET).flush(customFirebaseEnvJson);
  });

  it(`throws FirebaseOptionsEnvTypeError if bad FirebaseOptionsEnv`, (done) => {
    spectator.service.load().subscribe({
      error: (value) => {
        expect(value).toEqual(new FirebaseOptionsEnvTypeError());
        done();
      }
    });
    spectator.expectOne(FIREBASE_OPTIONS_ENV_PATH, HttpMethod.GET).flush({});
  });
});
