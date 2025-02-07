import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  DoCheck,
  effect,
  ElementRef,
  EventEmitter,
  inject,
  OnDestroy,
  OnInit,
  Output,
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
import { LoadingComponent } from '../loading/loading.component';
import { UserStore } from '../../stores/user.store';
import { UserSignupDTO } from '../../models/userSignupDTO.interface';
import { UserChangeDataDTO } from '../../models/userChangeDataDTO.interface';
import { UtilsService } from '../../services/utils.service';

@Component({
  selector: 'app-form-change-data',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, LoadingComponent],
  templateUrl: './form-change-data.component.html',
  styleUrl: './form-change-data.component.scss',
})
export class FormChangeDataComponent implements OnInit {
  userStore = inject(UserStore);
  utilsService = inject(UtilsService);

  @Output() SuccessValue = new EventEmitter<boolean>();

  UI = {
    Title: 'Changing data',
    FirstName: 'First name',
    LastName: 'Last name',
    UserName: 'User name',
    Email: 'Email',
    Password: 'Password',
    Save: 'Save',
    Reset: 'Reset',
    Show: 'Show',
    Hide: 'Hide',
    SuccessText: 'Data was changed successfully',
  };

  ChangeUserDataForm!: FormGroup;

  constructor(private renderer: Renderer2, private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.ChangeUserDataForm = this.formBuilder.group({
      FirstName: new FormControl('', [
        Validators.required,
        Validators.minLength(1),
      ]),
      LastName: new FormControl('', [
        Validators.required,
        Validators.minLength(1),
      ]),
      UserName: new FormControl('', [
        Validators.required,
        Validators.minLength(1),
      ]),
      Email: new FormControl('', [
        Validators.required,
        Validators.email,
        Validators.minLength(3),
      ]),
      Password2: new FormControl('', [
        Validators.required,
        Validators.minLength(1),
      ]),
    });
  }

  ChangeUserData() {
    if (this.userStore.user() !== null && this.userStore.user() !== undefined) {
      let ConfirmChange = confirm('Are you sure about changing the data?');
      if (ConfirmChange) {
        if (this.ChangeUserDataForm.valid) {
          window.scrollTo({
            behavior: 'smooth',
            top: 0,
          });
          if (
            this.utilsService.CheckForBadWords(
              this.ChangeUserDataForm.controls['FirstName'].value
            ) ||
            this.utilsService.CheckForBadWords(
              this.ChangeUserDataForm.controls['LastName'].value
            ) ||
            this.utilsService.CheckForBadWords(
              this.ChangeUserDataForm.controls['Email'].value
            ) ||
            this.utilsService.CheckForBadWords(
              this.ChangeUserDataForm.controls['Password'].value
            ) ||
            this.utilsService.CheckForBadWords(
              this.ChangeUserDataForm.controls['UserName'].value
            )
          ) {
            this.userStore.SetError('Bad words are not allowed');
          } else {
            this.userStore.SetLoadingTrue();

            try {
              let userDTO: UserChangeDataDTO = {
                id: this.userStore.user()!.id,
                firstName: this.ChangeUserDataForm.controls['FirstName'].value,
                lastName: this.ChangeUserDataForm.controls['LastName'].value,
                userName: this.ChangeUserDataForm.controls['UserName'].value,
                email: this.ChangeUserDataForm.controls['Email'].value,
                password: this.ChangeUserDataForm.controls['Password2'].value,
              };

              this.userStore.ChangeUserData(userDTO);
              this.SuccessValue.emit(true);
              this.ChangeUserDataForm.reset();
            } catch (error) {
              console.log(error);
            } finally {
              this.userStore.SetLoadingFalse();
            }
          }
        }
      }
    }
  }

  Reset() {
    this.ChangeUserDataForm.reset();
  }
}
