import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { EnvironmentModule } from '@kuoki/environment-angular';

import { AppEnvSource } from './app-env.source';
import { FirebaseOptionsEnvSource } from './firebase-options-env.source';

@NgModule({
  imports: [HttpClientModule, EnvironmentModule.forRoot({ sources: [AppEnvSource, FirebaseOptionsEnvSource] })],
  exports: [EnvironmentModule]
})
export class AppEnvironmentModule {}
