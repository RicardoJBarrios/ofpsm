import { createHttpFactory, HttpMethod, SpectatorHttp } from '@ngneat/spectator/jest';

import { FirebaseEnvSource, FirebaseEnvTypeError } from './firebase-env.source';

const firebaseEnvJson = {
  apiKey: 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
  authDomain: 'aaaaaa-00000.firebaseapp.com',
  databaseURL: 'https://aaaaaa-00000.firebaseio.com',
  projectId: 'aaaaaa-00000',
  storageBucket: 'aaaaaa-00000.appspot.com',
  messagingSenderId: '000000000000',
  appId: '0:000000000000:web:0000000000000000000000',
  measurementId: 'A-AAAAAAAAAA'
};

describe('FirebaseEnvSource', () => {
  let spectator: SpectatorHttp<FirebaseEnvSource>;
  const createService = createHttpFactory(FirebaseEnvSource);

  beforeEach(() => (spectator = createService()));

  it(`returns the FirebaseEnvJson with default 'useEmulators' false`, (done) => {
    spectator.service.load().subscribe({
      next: (value) => {
        expect(value).toEqual({ ...firebaseEnvJson, useEmulators: false });
        done();
      }
    });
    spectator.expectOne('assets/firebase-env.json', HttpMethod.GET).flush(firebaseEnvJson);
  });

  it(`returns the FirebaseEnvJson with custom 'useEmulators'`, (done) => {
    const customFirebaseEnvJson = { ...firebaseEnvJson, useEmulators: true };
    spectator.service.load().subscribe({
      next: (value) => {
        expect(value).toEqual(customFirebaseEnvJson);
        done();
      }
    });
    spectator.expectOne('assets/firebase-env.json', HttpMethod.GET).flush(customFirebaseEnvJson);
  });

  it(`returns FirebaseEnvJsonTypeError if no FirebaseEnvJson`, (done) => {
    spectator.service.load().subscribe({
      error: (value) => {
        expect(value).toEqual(new FirebaseEnvTypeError());
        done();
      }
    });
    spectator.expectOne('assets/firebase-env.json', HttpMethod.GET).flush({});
  });

  it(`returns FirebaseEnvJsonTypeError if bad FirebaseEnvJson`, (done) => {
    spectator.service.load().subscribe({
      error: (value) => {
        expect(value).toEqual(new FirebaseEnvTypeError());
        done();
      }
    });
    spectator.expectOne('assets/firebase-env.json', HttpMethod.GET).flush({ ...firebaseEnvJson, useEmulators: '' });
  });
});
