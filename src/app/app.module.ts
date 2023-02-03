import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppEnvironmentModule } from './environment';
import { AppFirebaseModule } from './firebase';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppEnvironmentModule, AppFirebaseModule],
  bootstrap: [AppComponent]
})
export class AppModule {}
