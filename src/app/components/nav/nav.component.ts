import { Component } from '@angular/core';
import { ButtonComponent } from '../button/button.component';
import { provideIcons } from '@ng-icons/core';
import { ionSettingsSharp } from '@ng-icons/ionicons';

@Component({
  selector: 'app-nav',
  imports: [ButtonComponent],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss',
  viewProviders: [provideIcons({ ionSettingsSharp })],
})
export class NavComponent {
  
}
