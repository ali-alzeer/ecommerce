import {
  patchState,
  signalStore,
  withComputed,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { computed, inject } from '@angular/core';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import {
  catchError,
  delay,
  firstValueFrom,
  pipe,
  switchMap,
  tap,
  throwError,
} from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Product } from '../models/product.interface';
import { ProductsService } from '../services/products.service';
import { Settings } from '../models/settings';
import { ProductsFilter } from '../models/productsFilter.interface';

export interface ProductsState {
  products: Product[];
  error: string | null;
  isLoading: boolean;
}

export const ProductsStore = signalStore(
  { providedIn: 'root' },
  withState<ProductsState>({
    products: [],
    error: null,
    isLoading: false,
  }),
  withComputed((store) => ({
    productsCount: computed(() => store.products().length),
  })),
  withMethods((store, productsService = inject(ProductsService)) => ({
    loadProducts: rxMethod<void>(
      pipe(
        switchMap(() => {
          return productsService.GetAllProducts().pipe(
            catchError((error: HttpErrorResponse) => {
              patchState(store, { error: error.error.error, isLoading: false });
              return throwError(error);
            }),
            tap((products) => {
              patchState(store, {
                products: products,
                error: null,
                isLoading: false,
              });
            })
          );
        })
      )
    ),

    loadProductsByPage: rxMethod(
      pipe(
        switchMap((filter: ProductsFilter) => {
          return productsService.GetProductsByFilterByPage(filter).pipe(
            catchError((error: HttpErrorResponse) => {
              patchState(store, { error: error.error.error, isLoading: false });
              return throwError(error);
            }),
            tap((products) => {
              patchState(store, {
                products: products,
                error: null,
                isLoading: false,
              });
            })
          );
        })
      )
    ),

    SetLoadingTrue() {
      patchState(store, { isLoading: true });
    },

    SetLoadingFalse() {
      patchState(store, { isLoading: false });
    },

    SetErrorTrue(error: string) {
      patchState(store, { error: error });
    },

    SetErrorFalse() {
      patchState(store, { error: null });
    },

    SetProducts(productsToSet : Product[]){
      patchState(store, {
        products: productsToSet,
        error: null,
      });
    }
  })),
  withHooks({
    onInit(store, settings = new Settings()) {
      patchState(store, { error: null, isLoading: true });
      let filter: ProductsFilter = {
        CategoryId: null,
        MinPrice: null,
        MaxPrice: null,
        MinRating: null,
        MaxRating: null,
        Search: null,
        PageNumber: settings.GetDefaultPageNumber(),
        PageSize: settings.GetDefaultPageSize(),
      };
      store.loadProductsByPage(filter);
    },
  })
);
