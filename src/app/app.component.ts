import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'ofpsm-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  readonly title = 'ofpsm';
}
