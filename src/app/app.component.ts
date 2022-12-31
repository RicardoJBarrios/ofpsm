import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { EnvironmentQuery } from '@kuoki/environment';
import { Observable } from 'rxjs';

import { FirebaseEnv } from './environment/firebase-env.source';

@Component({
  selector: 'ofpsm-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  private readonly env: EnvironmentQuery = inject(EnvironmentQuery);

  readonly title = 'ofpsm';
  readonly firebaseEnv$: Observable<FirebaseEnv | undefined> = this.env.get$('firebase');
}
