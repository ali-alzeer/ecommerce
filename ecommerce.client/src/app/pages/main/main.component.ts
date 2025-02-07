import { Component } from '@angular/core';
import { ProductsComponent } from '../../components/products/products.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faAngleDoubleDown,
  faCaretDown,
  faCartShopping,
  faLaptop,
  faMobile,
  faPhone,
  faShirt,
  faSuitcase,
  faTv,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [ProductsComponent, FontAwesomeModule],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
})
export class MainComponent {
  faCartShopping = faCartShopping;
  faMobile = faMobile;
  faLaptop = faLaptop;
  faSuitCase = faSuitcase;
  faShirt = faShirt;
  faTv = faTv;
  faAngleDoubleDown = faAngleDoubleDown;
}
