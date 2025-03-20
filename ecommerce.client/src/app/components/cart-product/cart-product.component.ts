import {
  Component,
  EventEmitter,
  inject,
  Input,
  Output,
  signal,
} from '@angular/core';
import {
  faCaretDown,
  faCaretUp,
  faImage,
  faX,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Router } from '@angular/router';
import { ProductCart } from '../../models/cartProduct.interface';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart-product',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './cart-product.component.html',
  styleUrl: './cart-product.component.scss',
})
export class CartProductComponent {
  cartService = inject(CartService);
  router = inject(Router);

  faImage = faImage;
  faCaretUp = faCaretUp;
  faCaretDown = faCaretDown;
  faX = faX;

  @Input({ required: true }) product!: ProductCart;
  @Output() NewTotal = new EventEmitter<number>();

  GoToProductDetails() {
    this.router.navigateByUrl(`details/${this.product.id}`);
  }
  RemoveProductFromCart() {
    let confirmRemoving = confirm('Are you sure about removing the product?');
    if (confirmRemoving) {
      if (this.product !== undefined && this.product !== null) {
        this.cartService.RemoveFromCart(this.product.id);
        this.NewTotal.emit(this.cartService.CalculateTotal());
      }
    }
  }
  DecreaseNumber() {
    if (
      this.product.quantity > 1 &&
      this.product !== undefined &&
      this.product !== null
    ) {
      this.cartService.DecreaseQuantityForProduct(this.product.id);
      this.NewTotal.emit(this.cartService.CalculateTotal());
    }
  }
  IncreaseNumber() {
    if (
      this.product.quantity < 100 &&
      this.product !== undefined &&
      this.product !== null
    ) {
      this.cartService.IncreaseQuantityForProduct(this.product.id);
      this.NewTotal.emit(this.cartService.CalculateTotal());
    }
  }
}
