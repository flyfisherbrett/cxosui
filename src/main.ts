import './polyfills.ts';

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { environment } from './environments/environment';
import { AppModule } from './app/';


if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule);

// import { platformBrowser } from '@angular/platform-browser'; <- resources and function call for Ahead-of-Time compilation
// import { AppModuleNgFactory } from './app.module.ngfactory';    consider implementing for performance boost
//                                                                 https://angular.io/docs/ts/latest/guide/ngmodule.html
//                                                                 read 'Static bootstrapping with the Ahead-Of-time (AoT) compiler'
// platformBrowser().bootstrapModuleFactory(AppModuleNgFactory);

