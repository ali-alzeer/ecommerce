import {
  Component,
  EventEmitter,
  inject,
  OnDestroy,
  OnInit,
  Output,
  Renderer2,
} from '@angular/core';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-purchase',
  standalone: true,
  imports: [],
  templateUrl: './purchase.component.html',
  styleUrl: './purchase.component.scss',
})
export class PurchaseComponent {
  cartService = inject(CartService);

  @Output() RemoveCompletedScreen = new EventEmitter<boolean>();

  RemoveCompleted() {
    this.cartService.Completed.set(false);
    this.RemoveCompletedScreen.emit(true);
  }
}
