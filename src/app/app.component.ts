import { Component, inject, PLATFORM_ID, OnInit } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NavComponent } from './components/nav/nav.component';
import { FooterComponent } from './components/footer/footer.component';
import { inject as vercelInject } from '@vercel/analytics';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'pokepricer';
  private platformId = inject(PLATFORM_ID);

  constructor() {
    // It's generally recommended to call this in constructor or ngOnInit
    // ngOnInit is often preferred for initialization logic after inputs are set
  }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      vercelInject(); // Call Vercel inject() only in the browser
    }
  }
}
