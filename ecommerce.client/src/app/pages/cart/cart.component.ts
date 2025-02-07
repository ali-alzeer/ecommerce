import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { LoadingComponent } from '../../components/loading/loading.component';
import { UserStore } from '../../stores/user.store';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { Product } from '../../models/product.interface';
import {
  faCaretDown,
  faCaretUp,
  faImage,
  faX,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PurchaseComponent } from '../../components/purchase/purchase.component';
import { CartProductComponent } from '../../components/cart-product/cart-product.component';
import { ProductCart } from '../../models/cartProduct.interface';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    LoadingComponent,
    CommonModule,
    FontAwesomeModule,
    CartProductComponent,
    PurchaseComponent,
  ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent implements OnInit {
  faImage = faImage;
  faX = faX;
  faCaretDown = faCaretDown;
  faCaretUp = faCaretUp;

  userStore = inject(UserStore);
  router = inject(Router);
  cartService = inject(CartService);

  loading = signal(false);

  CurrentCart = signal<ProductCart[] | null>(null);

  Total = signal(0);

  Completed = signal(false);

  GoToUserPage() {
    this.router.navigateByUrl('user');
  }

  HandleNewTotal(NewTotal: number) {
    this.CurrentCart.set(this.cartService.LoadCart());
    this.Total.set(this.cartService.CalculateTotal());
  }

  HandleRemoveCompletedScreen(RemoveCompleted: boolean) {
    this.Completed.set(false);
  }

  CompletePurchase() {
    this.cartService.CompletePurchase();
    this.CurrentCart.set(this.cartService.LoadCart());
    this.Total.set(this.cartService.CalculateTotal());
    this.Completed.set(true);
  }

  ClearCart() {
    let confirmRemoving = confirm('Are you sure about clearing the cart?');
    if (confirmRemoving) {
      this.cartService.ClearCart();
      this.CurrentCart.set(this.cartService.LoadCart());
      this.Total.set(this.cartService.CalculateTotal());
    }
  }

  ngOnInit(): void {
    this.CurrentCart.set(this.cartService.LoadCart());
    this.Total.set(this.cartService.CalculateTotal());
  }
}
