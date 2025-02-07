import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ProductsStore } from '../../stores/products.store';
import { LoadingComponent } from '../loading/loading.component';
import { ProductCardComponent } from '../product-card/product-card.component';
import { FilterComponent } from '../filter/filter.component';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    CommonModule,
    LoadingComponent,
    ProductCardComponent,
    FilterComponent,
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent {
  productsStore = inject(ProductsStore);
}
