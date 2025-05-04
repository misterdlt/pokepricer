import { isPlatformBrowser } from '@angular/common';
import {
  Inject,
  inject,
  Injectable,
  PLATFORM_ID,
  Renderer2,
  signal,
} from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class ThemeServiceService {
  themeColor = signal<string>('#000000');
  darkMode = signal<boolean>(false);

  private documentElement: HTMLElement;
  private isBrowser: boolean;
  private platformId = inject(PLATFORM_ID);

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2
  ) {
    this.documentElement = this.document.documentElement;
    this.isBrowser = isPlatformBrowser(this.platformId);

    if (this.isBrowser) {
      // Check for saved color
      const savedColor = localStorage.getItem('app-primary-color');
      if (savedColor) {
        this.setThemeColor(savedColor);
      }

      // Check for saved dark mode
      const savedDarkMode = localStorage.getItem('app-dark-mode');
      const prefersDark = window.matchMedia(
        '(prefers-color-scheme: dark)'
      ).matches;
      let initialDarkModeState = false;

      if (savedDarkMode !== null) {
        initialDarkModeState = savedDarkMode === 'true';
      } else {
        initialDarkModeState = prefersDark;
      }

      this.setDarkMode(initialDarkModeState);
    }
  }

  setThemeColor(color: string) {
    this.themeColor.set(color);
    if (this.isBrowser) {
      localStorage.setItem('app-primary-color', color);
      this.documentElement.style.setProperty('--primary-color', color); // Update css variable
    }
  }

  setDarkMode(darkMode: boolean) {
    this.darkMode.set(darkMode);
    console.log('darkMode', darkMode);
    if (this.isBrowser) {
      localStorage.setItem('app-dark-mode', darkMode.toString());
      this.renderer.setAttribute(
        this.documentElement,
        'data-theme',
        darkMode ? 'dark' : 'light'
      );
    }
  }

  getThemeColor() {
    return this.themeColor();
  }

  getDarkMode() {
    return this.darkMode();
  }
}
