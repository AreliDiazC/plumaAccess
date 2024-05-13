import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers:[
  provideAnimations(),
  provideToastr({ timeOut : 800, preventDuplicates: true}),
  provideRouter(routes), provideClientHydration(),
  provideHttpClient(withFetch())
]
};
