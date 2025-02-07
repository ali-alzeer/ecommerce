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
import { Category } from '../models/category.interface';
import { CategoriesService } from '../services/categories.service';

export interface CategoriesState {
  categories: Category[];
  error: string | null;
  isLoading: boolean;
}

export const CategoriesStore = signalStore(
  { providedIn: 'root' },
  withState<CategoriesState>({
    categories: [],
    error: null,
    isLoading: false,
  }),
  withComputed((store) => ({
    categoriesCount: computed(() => store.categories().length),
  })),
  withMethods((store, categoriesService = inject(CategoriesService)) => ({
    loadCategories: rxMethod<void>(
      pipe(
        switchMap(() => {
          return categoriesService.GetAllCategories().pipe(
            catchError((error: HttpErrorResponse) => {
              patchState(store, { error: error.error.error, isLoading: false });
              return throwError(error);
            }),
            tap((categories) => {
              patchState(store, {
                categories: categories,
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
  })),
  withHooks({
    onInit(store) {
      patchState(store, { error: null, isLoading: true });
      store.loadCategories();
    },
  })
);
