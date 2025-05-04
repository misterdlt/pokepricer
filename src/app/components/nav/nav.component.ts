import {
  Component,
  Inject,
  Renderer2,
  PLATFORM_ID,
  inject,
} from '@angular/core';
import { ThemeServiceService } from '../../services/theme-service/theme.service';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { ButtonComponent } from '../button/button.component';
import { provideIcons } from '@ng-icons/core';
import { ionSettingsSharp } from '@ng-icons/ionicons';
import { NgIf } from '@angular/common';
@Component({
  selector: 'app-nav',
  imports: [ButtonComponent, NgIf],
  providers: [ThemeServiceService],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss',
  viewProviders: [provideIcons({ ionSettingsSharp })],
})
export class NavComponent {
  themeService = inject(ThemeServiceService);
  private documentElement: HTMLElement;
  private isBrowser: boolean;
  showSettingsMenu = false;

  primaryColor = this.themeService.themeColor;
  darkMode = this.themeService.darkMode;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.documentElement = this.document.documentElement;
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  onColorChange(event: Event): void {
    if (!this.isBrowser) return;
    const newColor = (event.target as HTMLInputElement).value;
    this.themeService.setThemeColor(newColor);
  }

  onDarkModeToggle(event: Event): void {
    if (!this.isBrowser) return;
    const isChecked = (event.target as HTMLInputElement).checked;
    this.themeService.setDarkMode(isChecked);
  }

  toggleSettingsMenu() {
    this.showSettingsMenu = !this.showSettingsMenu;
  }
}
