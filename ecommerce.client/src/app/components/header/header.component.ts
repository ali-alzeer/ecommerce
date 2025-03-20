import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faHouse,
  faUser,
  faShoppingCart,
  faRobot,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  faHouse = faHouse;
  faUser = faUser;
  faShoppingCart = faShoppingCart;
  faBot = faRobot;

  router = inject(Router);

  GoToHome() {
    this.router.navigateByUrl('/');
    window.scroll({
      top: 0,
      behavior: 'smooth',
    });
  }

  GoToUser() {
    this.router.navigateByUrl('/user');
    window.scroll({
      top: 0,
      behavior: 'smooth',
    });
  }

  GoToCart() {
    this.router.navigateByUrl('/cart');
    window.scroll({
      top: 0,
      behavior: 'smooth',
    });
  }
  
  GoToBot() {
    this.router.navigateByUrl('/bot');
    window.scroll({
      top: 0,
      behavior: 'smooth',
    });
  }
}
