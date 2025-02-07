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
import { UtilsService } from '../../services/utils.service';
import { LoadingComponent } from '../loading/loading.component';

@Component({
  selector: 'app-form-signup',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, LoadingComponent],
  templateUrl: './form-signup.component.html',
  styleUrl: './form-signup.component.scss',
})
export class FormSignupComponent implements OnInit, DoCheck, OnDestroy {
  userStore = inject(UserStore);
  userService = inject(UserService);
  utilsService = inject(UtilsService);

  @ViewChild('Password', { static: true }) Password!: ElementRef;
  @ViewChild('SignupButton', { static: true })
  SignupButton!: ElementRef<HTMLButtonElement>;

  UI = {
    Title: 'Sign up',
    FirstName: 'First name',
    LastName: 'Last name',
    Username: 'Username',
    Email: 'Email',
    Password: 'Password',
    Save: 'Sign up',
    Reset: 'Reset',
    Show: 'Show',
    Hide: 'Hide',
    Signup: 'Sign up failed',
    Forgot: 'Forgot account data',
    code: 'Code',
    validateCode: 'Validate code',
  };
  ShowPasswordText!: string;

  SignupForm!: FormGroup;
  EnterClick!: () => void;

  constructor(
    private renderer: Renderer2,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.SignupForm = this.formBuilder.group({
      FirstName: new FormControl('', [
        Validators.required,
        Validators.minLength(1),
      ]),
      LastName: new FormControl('', [
        Validators.required,
        Validators.minLength(1),
      ]),
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
        this.SignupButton.nativeElement.click();
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
  Signup() {
    if (this.SignupForm.valid) {
      window.scrollTo({
        behavior: 'smooth',
        top: 0,
      });

      if (
        this.utilsService.CheckForBadWords(
          this.SignupForm.controls['FirstName'].value
        ) ||
        this.utilsService.CheckForBadWords(
          this.SignupForm.controls['LastName'].value
        ) ||
        this.utilsService.CheckForBadWords(
          this.SignupForm.controls['Email'].value
        ) ||
        this.utilsService.CheckForBadWords(
          this.SignupForm.controls['Password'].value
        ) ||
        this.utilsService.CheckForBadWords(
          this.SignupForm.controls['Username'].value
        )
      ) {
        this.userStore.SetError('Bad words are not allowed');
      } else {
        try {
          this.userStore.SetLoadingTrue();
          this.userStore.SignUp(this.SignupForm.getRawValue());
        } catch {
          this.userStore.SetError();
        } finally {
          this.userStore.SetLoadingFalse();
        }
      }
    }
  }

  Reset() {
    this.SignupForm.reset();
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
