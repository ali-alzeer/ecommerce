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
import { catchError, delay, pipe, switchMap, tap, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { UserService } from '../services/user.service';
import { UserSigninDTO } from '../models/userSigninDTO.interface';
import { UserSignupDTO } from '../models/userSignupDTO.interface';
import { User } from '../models/user.interface';
import { UserChangeDataDTO } from '../models/userChangeDataDTO.interface';
import { UserChangeImageDTO } from '../models/userChangeImageDTO.interface';

export interface UserState {
  user: User | null;
  isUser: boolean;
  error: string | null;
  isLoading: boolean;
}

export const UserStore = signalStore(
  { providedIn: 'root' },
  withState<UserState>({
    user: null,
    isUser: false,
    error: null,
    isLoading: false,
  }),
  withMethods((store, userService = inject(UserService)) => ({
    async LoadUserData(): Promise<User | null> {
      return await userService.LoadUserData();
    },

    ChangeUserImageUpload(Image: File) {
      return userService.ChangeUserImageUpload(Image);
    },

    SetError(errorMessage: string = 'An error occured') {
      patchState(store, { error: errorMessage });
    },
    SetErrorNull() {
      patchState(store, { error: null });
    },

    SetLoadingTrue() {
      patchState(store, { isLoading: true });
    },
    SetLoadingFalse() {
      patchState(store, { isLoading: false });
    },
    SignOut() {
      localStorage.removeItem('user');
      patchState(store, { isUser: false, user: null });
    },

    ChangeUserData: rxMethod(
      pipe(
        switchMap((userChangeDataDTO: UserChangeDataDTO) => {
          return userService.ChangeUserData(userChangeDataDTO).pipe(
            catchError((error: HttpErrorResponse) => {
              patchState(store, {
                error: error.error,
                isLoading: false,
              });
              return throwError(error);
            }),
            tap((user) => {
              patchState(store, {
                user: user,
                isUser: true,
                error: null,
                isLoading: false,
              });
              const userInStorage = JSON.stringify(user);
              localStorage.setItem('user', userInStorage);
            })
          );
        })
      )
    ),

    ChangeUserImageSave: rxMethod(
      pipe(
        switchMap((userChangeImageDTO: UserChangeImageDTO) => {
          return userService.ChangeUserImageSave(userChangeImageDTO).pipe(
            catchError((error: HttpErrorResponse) => {
              patchState(store, {
                error: error.error,
                isLoading: false,
              });
              return throwError(error);
            }),
            tap((user) => {
              patchState(store, {
                user: user,
                isUser: true,
                error: null,
                isLoading: false,
              });
              const userInStorage = JSON.stringify(user);
              localStorage.setItem('user', userInStorage);
            })
          );
        })
      )
    ),

    DeleteUserImage: rxMethod(
      pipe(
        switchMap((UserId: number) => {
          return userService.DeleteUserImage(UserId).pipe(
            catchError((error: HttpErrorResponse) => {
              patchState(store, {
                error: error.error,
                isLoading: false,
              });
              return throwError(error);
            }),
            tap((user) => {
              patchState(store, {
                user: user,
                isUser: true,
                error: null,
                isLoading: false,
              });
              const userInStorage = JSON.stringify(user);
              localStorage.setItem('user', userInStorage);
            })
          );
        })
      )
    ),

    SignIn: rxMethod(
      pipe(
        switchMap((userSigninDTO: UserSigninDTO) => {
          return userService.SignIn(userSigninDTO).pipe(
            catchError((error: HttpErrorResponse) => {
              patchState(store, {
                user: null,
                isUser: false,
                error: error.error,
                isLoading: false,
              });
              return throwError(error);
            }),
            tap((user) => {
              patchState(store, {
                user: user,
                isUser: true,
                error: null,
                isLoading: false,
              });
              const userInStorage = JSON.stringify(user);
              localStorage.setItem('user', userInStorage);
            })
          );
        })
      )
    ),

    SignUp: rxMethod(
      pipe(
        switchMap((userSignupDTO: UserSignupDTO) => {
          return userService.SignUp(userSignupDTO).pipe(
            catchError((error: HttpErrorResponse) => {
              patchState(store, {
                user: null,
                isUser: false,
                error: error.error,
                isLoading: false,
              });
              return throwError(error);
            }),
            tap((user) => {
              patchState(store, {
                user: user,
                isUser: true,
                error: null,
                isLoading: false,
              });
              const userInStorage = JSON.stringify(user);
              localStorage.setItem('user', userInStorage);
            })
          );
        })
      )
    ),
  })),
  withHooks({
    onInit(store) {
      store.LoadUserData().then((user) => {
        if (user !== null && user !== undefined) {
          patchState(store, {
            user: user,
            isUser: true,
            error: null,
            isLoading: false,
          });
        }
      });
    },
  })
);
