import { Component } from '@angular/core';
import { SearchBarComponent } from '../../components/search-bar/search-bar.component';
import { CardListComponent } from '../../components/card-list/card-list.component';

@Component({
  selector: 'app-home',
  imports: [SearchBarComponent, CardListComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}
