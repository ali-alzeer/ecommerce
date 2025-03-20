import { Component, inject, OnInit, signal } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.interface';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { UserPreviewDTO } from '../../models/userPreviewDTO.interface';
import { LoadingComponent } from '../../components/loading/loading.component';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [LoadingComponent, CommonModule, FontAwesomeModule],
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.scss',
})
export class UserDetailsComponent implements OnInit {
  faUser = faUser;

  userService = inject(UserService);
  router = inject(Router);
  route = inject(ActivatedRoute);

  user = signal<UserPreviewDTO | null>(null);
  loading = signal(false);

  GetUserPreviewDTOFromDB(UserId: number) {
    let sub = this.userService.GetUserPreviewDTOByUserId(UserId).subscribe({
      next: (userFromDB: UserPreviewDTO) => {
        this.user.set(userFromDB);
      },
      error: () => {
        this.router.navigateByUrl('');
      },
      complete: () => {
        this.loading.set(false);
        sub.unsubscribe();
      },
    });
  }

  ngOnInit(): void {
    this.loading.set(true);

    this.route.params.subscribe({
      next: (params: Params) => {
        if (isNaN(Number(params['id'])) || Number(params['id']) <= 0) {
          this.router.navigateByUrl('');
          this.loading.set(false);
        } else {
          this.GetUserPreviewDTOFromDB(Number(params['id']));
        }
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
        this.router.navigateByUrl('');
      },
      complete: () => {
        this.loading.set(false);
      },
    });
  }
}
