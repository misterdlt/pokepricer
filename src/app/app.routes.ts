import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CardDetailsComponent } from './components/card-details/card-details.component';

export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'card/:id', component: CardDetailsComponent},
];
