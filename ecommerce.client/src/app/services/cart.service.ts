import { Injectable, signal } from '@angular/core';
import { Product } from '../models/product.interface';
import { ProductCart } from '../models/cartProduct.interface';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  Completed = signal(false);

  LoadCart() {
    const CartFromStorage = localStorage.getItem('cart');
    if (CartFromStorage !== null) {
      let Cart: ProductCart[] | null = JSON.parse(CartFromStorage);
      return Cart;
    } else {
      return null;
    }
  }

  AddToCart(product: Product) {
    let ProductCartToSave: ProductCart = {
      id: product.id,
      categoryId: product.categoryId,
      comments: product.comments,
      createdByUserId: product.createdByUserId,
      createdOn: product.createdOn,
      description: product.description,
      images: product.images,
      price: product.price,
      rating: product.rating,
      title: product.title,
      quantity: 1,
    };

    let Cart: ProductCart[] | null = this.LoadCart();
    let NewCart: ProductCart[] = [];

    if (Cart !== null) {
      NewCart = [...Cart];
    }

    NewCart.push(ProductCartToSave);
    localStorage.setItem('cart', JSON.stringify(NewCart));
  }

  RemoveFromCart(productId: number) {
    let Cart: ProductCart[] | null = this.LoadCart();
    let NewCart: ProductCart[] = [];

    if (Cart !== null) {
      NewCart = Cart.filter((p) => p.id !== productId);
      localStorage.setItem('cart', JSON.stringify(NewCart));
    }
  }

  CompletePurchase() {
    this.ClearCart();
    this.Completed.set(true);
  }

  ClearCart() {
    localStorage.setItem('cart', JSON.stringify([]));
  }

  IncreaseQuantityForProduct(productId: number) {
    let Cart: ProductCart[] | null = this.LoadCart();
    let NewCart: ProductCart[] = [];

    if (Cart !== null) {
      for (let i = 0; i < Cart.length; i++) {
        if (Cart[i].id === productId) {
          NewCart[i] = {
            id: Cart[i].id,
            categoryId: Cart[i].categoryId,
            comments: Cart[i].comments,
            createdByUserId: Cart[i].createdByUserId,
            createdOn: Cart[i].createdOn,
            description: Cart[i].description,
            images: Cart[i].images,
            price: Cart[i].price,
            rating: Cart[i].rating,
            title: Cart[i].title,
            quantity: Cart[i].quantity + 1,
          };
        } else {
          NewCart[i] = Cart[i];
        }
      }

      localStorage.setItem('cart', JSON.stringify(NewCart));
    }
  }

  DecreaseQuantityForProduct(productId: number) {
    let Cart: ProductCart[] | null = this.LoadCart();
    let NewCart: ProductCart[] = [];

    if (Cart !== null) {
      for (let i = 0; i < Cart.length; i++) {
        if (Cart[i].id === productId) {
          NewCart[i] = {
            id: Cart[i].id,
            categoryId: Cart[i].categoryId,
            comments: Cart[i].comments,
            createdByUserId: Cart[i].createdByUserId,
            createdOn: Cart[i].createdOn,
            description: Cart[i].description,
            images: Cart[i].images,
            price: Cart[i].price,
            rating: Cart[i].rating,
            title: Cart[i].title,
            quantity: Cart[i].quantity - 1,
          };
        } else {
          NewCart[i] = Cart[i];
        }
      }

      localStorage.setItem('cart', JSON.stringify(NewCart));
    }
  }

  CalculateTotal() {
    let cart = this.LoadCart();
    let total = 0;
    if (cart !== null && cart.length > 0) {
      for (let i = 0; i < cart.length; i++) {
        total += cart[i].price * cart[i].quantity;
      }
      return total;
    } else {
      return 0;
    }
  }
}
