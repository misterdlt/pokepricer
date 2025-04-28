import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import {
  provideClientHydration,
  withEventReplay,
} from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    provideHttpClient(
      withInterceptors([
        (req, next) => {
          // Only add X-API-Key header for Pokemon TCG API calls
          if (req.url.startsWith('https://api.pokemontcg.io/v2/')) {
            req = req.clone({
              headers: req.headers.set('X-Api-Key', import.meta.env['NG_APP_POKEMON_TCG_API_KEY'] ?? ''),
            });
          }
          return next(req);
        },
      ]),
      withFetch()
    ),
  ],
};
