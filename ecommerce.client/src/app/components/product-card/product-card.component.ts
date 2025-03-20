import { Component, computed, DoCheck, inject, input, OnInit } from '@angular/core';
import { Product } from '../../models/product.interface';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faStar, faImage } from '@fortawesome/free-solid-svg-icons';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [FontAwesomeModule, CommonModule],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss',
})
export class ProductCardComponent implements OnInit, DoCheck {
  product = input<Product | null>(null);

  ratingStars: number[] = [];
  notRatingStars: number[] = [];

  faStar = faStar;
  faImage = faImage;

  router = inject(Router);

  ngOnInit(): void {
    if (this.product() !== null && this.product() !== undefined) {
      for (let i = 0; i < this.product()?.rating!; i++) {
        this.ratingStars.push(1);
      }
      for (let i = 0; i < 5 - this.product()?.rating!; i++) {
        this.notRatingStars.push(1);
      }
    }
  }

  ngDoCheck(): void {

    this.ratingStars = [];
    this.notRatingStars = [];

    if (this.product() !== null && this.product() !== undefined) {
      for (let i = 0; i < this.product()?.rating!; i++) {
        this.ratingStars.push(1);
      }
      for (let i = 0; i < 5 - this.product()?.rating!; i++) {
        this.notRatingStars.push(1);
      }
    }
  }

  ShowDetails() {
    if (this.product() !== null && this.product() !== undefined) {
      this.router.navigateByUrl(`details/${this.product()?.id}`);
    }
  }
}
