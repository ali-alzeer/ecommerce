import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { UserStore } from '../../stores/user.store';
import { LoadingComponent } from '../../components/loading/loading.component';
import { FormSigninComponent } from '../../components/form-signin/form-signin.component';
import { FormSignupComponent } from '../../components/form-signup/form-signup.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faUser, faEdit, faRemove } from '@fortawesome/free-solid-svg-icons';
import { FormChangeDataComponent } from '../../components/form-change-data/form-change-data.component';
import { CommonModule } from '@angular/common';
import { UserChangeImageDTO } from '../../models/userChangeImageDTO.interface';
import { firstValueFrom } from 'rxjs';
import { userImageUrlDTO } from '../../models/userImageUrlDTO.interface';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [
    FontAwesomeModule,
    LoadingComponent,
    FormSigninComponent,
    FormSignupComponent,
    FormChangeDataComponent,
    CommonModule,
  ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss',
})
export class UserComponent {
  Success = false;
  SuccessText = 'Data changed successfully';

  @ViewChild('FileInput')
  FileInput!: ElementRef<HTMLInputElement>;

  userStore = inject(UserStore);

  signin = true;
  changeData = false;

  UI = {
    signinText: "I don't have an account",
    signupText: 'I have an account',
  };

  faUser = faUser;
  faEdit = faEdit;
  faRemove = faRemove;

  GoToSignup() {
    this.signin = false;
  }

  GoToSignin() {
    this.signin = true;
  }

  StartChangingData() {
    this.changeData = true;
  }

  CancelChangingData() {
    this.changeData = false;
  }

  ChooseImage() {
    if (this.FileInput.nativeElement !== undefined) {
      this.FileInput.nativeElement.click();
    }
  }

  async ChangeUserImage(event: Event) {
    let SelectedImage = (event.target as HTMLInputElement).files?.[0];
    if (!SelectedImage?.size || !SelectedImage) {
      this.userStore.SetError('Please upload a valid image');
    } else {
      if (SelectedImage.size > 1048576) {
        this.userStore.SetError('Image size must be less than 1 MB');
      } else {
        if (
          this.userStore.user() !== null &&
          this.userStore.user() !== undefined
        ) {
          try {
            let userImageUrlDTO: userImageUrlDTO = {
              imageUrl: '',
            };
            this.userStore.SetLoadingTrue();
            let imageUrl = await firstValueFrom(
              this.userStore.ChangeUserImageUpload(SelectedImage)
            );

            if (imageUrl && imageUrl.imageUrl !== '') {
              let userChangeImageDTO: UserChangeImageDTO = {
                id: this.userStore.user()?.id!,
                ImageUrl: imageUrl.imageUrl,
              };

              this.userStore.ChangeUserImageSave(userChangeImageDTO);
              this.Success = true;
            }
            this.Success = true;
          } catch (error) {
            console.log(error);
            this.userStore.SetError();
          } finally {
            this.userStore.SetLoadingFalse();
          }
        }
      }
    }
  }

  DeleteUserImage() {
    let DeletionConfirm = confirm('Are you sure about the deletion?');
    if (DeletionConfirm) {
      if (
        this.userStore.user() !== null &&
        this.userStore.user() !== undefined
      ) {
        try {
          this.userStore.SetLoadingTrue();
          this.userStore.DeleteUserImage(this.userStore.user()?.id!);
          this.Success = true;
        } catch (error) {
          console.log(error);
        } finally {
          this.userStore.SetLoadingFalse();
        }
      }
    }
  }

  SignOut() {
    this.userStore.SignOut();
  }
}
