import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { User } from '../models/user.interface';
import { UserSigninDTO } from '../models/userSigninDTO.interface';
import { BASEURL } from '../../environment/environment';
import { firstValueFrom } from 'rxjs';
import { UserSignupDTO } from '../models/userSignupDTO.interface';
import { UserChangeDataDTO } from '../models/userChangeDataDTO.interface';
import { UserChangeImageDTO } from '../models/userChangeImageDTO.interface';
import { userImageUrlDTO } from '../models/userImageUrlDTO.interface';
import { UserCommentDTO } from '../models/userCommentDTO.interface';
import { UserPreviewDTO } from '../models/userPreviewDTO.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  http = inject(HttpClient);

  SignIn(UserSigninDTO: UserSigninDTO) {
    return this.http.post<User>(`${BASEURL}/api/Auth/signin`, UserSigninDTO);
  }

  SignUp(userSignupDTO: UserSignupDTO) {
    return this.http.post<User>(`${BASEURL}/api/Auth/signup`, userSignupDTO);
  }

  ChangeUserData(UserChangeDataDTO: UserChangeDataDTO) {
    return this.http.post<User>(
      `${BASEURL}/api/Auth/change-user-data`,
      UserChangeDataDTO
    );
  }

  DeleteUserImage(UserId: number) {
    return this.http.delete<User>(
      `${BASEURL}/api/Auth/delete-user-image?Id=${UserId}`
    );
  }

  ChangeUserImageUpload(file: File) {
    let fd = new FormData();
    fd.append('file', file);

    return this.http.post<userImageUrlDTO>(
      `${BASEURL}/api/Auth/change-user-image-upload`,
      fd
    );
  }

  ChangeUserImageSave(userChangeImageDTO: UserChangeImageDTO) {
    return this.http.post<User>(
      `${BASEURL}/api/Auth/change-user-image-save`,
      userChangeImageDTO
    );
  }

  GetUserCommentDTOById(id: number) {
    return this.http.get<UserCommentDTO>(
      `${BASEURL}/api/Auth/user-comment?id=${id}`
    );
  }

  GetUserPreviewDTOByUserId(id: number) {
    return this.http.get<UserPreviewDTO>(
      `${BASEURL}/api/Auth/user-details?id=${id}`
    );
  }

  async LoadUserData(): Promise<User | null> {
    const UserFromStorage = localStorage.getItem('user');
    if (UserFromStorage !== null) {
      const User = JSON.parse(UserFromStorage);

      if (
        User !== undefined &&
        User.token !== undefined &&
        User.id !== undefined &&
        User.userName !== undefined &&
        User.firstName !== undefined &&
        User.lastName !== undefined &&
        User.email !== undefined &&
        User.createdOn !== undefined &&
        User.updatedOn !== undefined &&
        User.lastLoggingIn !== undefined
      ) {
        const headers = new HttpHeaders().set('token', User.token);

        const validToken = await firstValueFrom(
          this.http.get<boolean>(`${BASEURL}/api/Auth/validate-token`, {
            headers: headers,
          })
        ).catch((error: any) => {
          return false;
        });

        if (validToken) {
          return User;
        } else {
          localStorage.removeItem('user');
          return null;
        }
      } else {
        localStorage.removeItem('user');
        return null;
      }
    } else {
      return null;
    }
  }
}
