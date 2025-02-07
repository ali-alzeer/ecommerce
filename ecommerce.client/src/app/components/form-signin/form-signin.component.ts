import {
  ChangeDetectionStrategy,
  Component,
  DoCheck,
  effect,
  ElementRef,
  inject,
  OnDestroy,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { firstValueFrom } from 'rxjs';
import { UserStore } from '../../stores/user.store';
import { UserService } from '../../services/user.service';
import { LoadingComponent } from '../loading/loading.component';
import { UtilsService } from '../../services/utils.service';

@Component({
  selector: 'app-form-signin',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, LoadingComponent],
  templateUrl: './form-signin.component.html',
  styleUrl: './form-signin.component.scss',
})
export class FormSigninComponent implements OnInit, DoCheck, OnDestroy {
  userStore = inject(UserStore);
  userService = inject(UserService);

  @ViewChild('Password', { static: true }) Password!: ElementRef;
  @ViewChild('SigninButton', { static: true })
  SigninButton!: ElementRef<HTMLButtonElement>;

  UI = {
    Title: 'Sign in',
    Username: 'Username',
    Email: 'Email',
    Password: 'Password',
    Save: 'Sign in',
    Reset: 'Reset',
    Show: 'Show',
    Hide: 'Hide',
    Signin: 'Sign in failed',
    Forgot: 'Forgot account data',
    code: 'Code',
    validateCode: 'Validate code',
  };
  ShowPasswordText!: string;

  SigninForm!: FormGroup;
  EnterClick!: () => void;

  constructor(
    private renderer: Renderer2,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.SigninForm = this.formBuilder.group({
      Username: new FormControl('', [
        Validators.required,
        Validators.minLength(1),
      ]),
      Email: new FormControl('', [
        Validators.required,
        Validators.email,
        Validators.minLength(3),
      ]),
      Password: new FormControl('', [
        Validators.required,
        Validators.minLength(1),
      ]),
    });
    this.Password.nativeElement.type = 'password';

    this.EnterClick = this.renderer.listen(document, 'keydown', (event) => {
      if (event.key === 'Enter') {
        this.SigninButton.nativeElement.click();
      }
    });
  }

  ngDoCheck(): void {
    if (this.Password.nativeElement.type === 'password') {
      this.ShowPasswordText = this.UI.Show;
    } else if (this.Password.nativeElement.type === 'text') {
      this.ShowPasswordText = this.UI.Hide;
    }
  }
  Signin() {
    console.log(this.SigninForm.getRawValue());
    if (this.SigninForm.valid) {
      window.scrollTo({
        behavior: 'smooth',
        top: 0,
      });

      try {
        this.userStore.SetLoadingTrue();
        this.userStore.SignIn(this.SigninForm.getRawValue());
      } catch {
        this.userStore.SetError('sign in failed');
      } finally {
        this.userStore.SetLoadingFalse();
      }
    }
  }

  Reset() {
    this.SigninForm.reset();
    this.userStore.SetErrorNull();
  }

  ShowPassword() {
    if (this.Password.nativeElement.type === 'password') {
      this.Password.nativeElement.type = 'text';
      this.ShowPasswordText = this.UI.Hide;
    } else if (this.Password.nativeElement.type === 'text') {
      this.Password.nativeElement.type = 'password';
      this.ShowPasswordText = this.UI.Show;
    }
  }

  ngOnDestroy(): void {
    this.EnterClick();
  }
}
