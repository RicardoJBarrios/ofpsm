import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppEnvironmentModule } from './environment/app-environment.module';
import { NxWelcomeComponent } from './nx-welcome.component';

@NgModule({
  declarations: [AppComponent, NxWelcomeComponent],
  imports: [BrowserModule, AppEnvironmentModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
