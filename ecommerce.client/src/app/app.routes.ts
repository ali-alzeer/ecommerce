import { Routes } from '@angular/router';
import { MainComponent } from './pages/main/main.component';
import { DetailsComponent } from './pages/details/details.component';
import { detailsGuard } from './guards/details.guard';
import { UserComponent } from './pages/user/user.component';
import { UserDetailsComponent } from './pages/user-details/user-details.component';
import { CartComponent } from './pages/cart/cart.component';
import { BotComponent } from './pages/bot/bot.component';

export const routes: Routes = [
  { path: '', component: MainComponent },
  {
    path: 'details/:id',
    component: DetailsComponent,
    canActivate: [detailsGuard],
  },
  { path: 'user', component: UserComponent },
  {
    path: 'user-details/:id',
    component: UserDetailsComponent,
    canActivate: [detailsGuard],
  },
  { path: 'cart', component: CartComponent },
  { path: 'bot', component: BotComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];
