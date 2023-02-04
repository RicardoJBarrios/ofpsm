import { Injector, NgModule } from '@angular/core';
import { FirebaseOptions, initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { EnvironmentQuery } from '@kuoki/environment';

@NgModule({
  imports: [
    provideFirebaseApp((injector: Injector) => {
      const options: FirebaseOptions = injector.get(EnvironmentQuery).get('firebase') as FirebaseOptions;
      return initializeApp(options);
    }),
    provideFirestore(() => getFirestore())
  ],
  exports: []
})
export class AppFirebaseModule {}
