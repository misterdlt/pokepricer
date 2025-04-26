import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { config } from './app/app.config.server';
import { Routes } from '@angular/router';

const bootstrap = () => bootstrapApplication(AppComponent, config);

export default bootstrap;

export async function getPrerenderParams(route: Routes[number]): Promise<any> {
  // Skip prerendering for the parameterized card route
  if (route.path === 'card/:id') {
    return {
      // Returning an empty array tells Angular not to prerender any specific instances of this route.
      // Alternatively, return `false` to skip this route entirely during prerendering.
      params: { id: [] }
    };
  }

  // Return default behavior for other routes (if any)
  return {};
}
