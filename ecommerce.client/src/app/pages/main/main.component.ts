import { Component, inject, OnInit } from '@angular/core';
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
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [ProductsComponent, FontAwesomeModule, CommonModule],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
})
export class MainComponent{
  faCartShopping = faCartShopping;
  faMobile = faMobile;
  faLaptop = faLaptop;
  faSuitCase = faSuitcase;
  faShirt = faShirt;
  faTv = faTv;
  faAngleDoubleDown = faAngleDoubleDown;
}
