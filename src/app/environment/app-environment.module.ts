import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { EnvironmentModule } from '@kuoki/environment-angular';

import { FirebaseEnvSource } from './firebase-env.source';

@NgModule({
  imports: [HttpClientModule, EnvironmentModule.forRoot({ sources: [FirebaseEnvSource] })],
  exports: [EnvironmentModule]
})
export class AppEnvironmentModule {}
