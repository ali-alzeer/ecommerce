import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
  signal,
} from '@angular/core';
import { Rating } from '../../models/rating.interface';
import { CommonModule } from '@angular/common';
import { faStar, faUser, faX } from '@fortawesome/free-solid-svg-icons';
import { UserService } from '../../services/user.service';
import { UserCommentDTO } from '../../models/userCommentDTO.interface';
import { HttpErrorResponse } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { UserStore } from '../../stores/user.store';
import { Router } from '@angular/router';

@Component({
  selector: 'app-rating',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './rating.component.html',
  styleUrl: './rating.component.scss',
})
export class RatingComponent implements OnInit {
  faUser = faUser;
  faStar = faStar;
  faX = faX;

  userService = inject(UserService);
  userStore = inject(UserStore);
  router = inject(Router);

  @Input({ required: true }) ratingFromParent!: Rating;

  @Output() RatingToDelete = new EventEmitter<number>();

  ratingStars: number[] = [];
  notRatingStars: number[] = [];

  userComment = signal<UserCommentDTO | null>(null);

  userError = signal(false);

  ngOnInit(): void {
    this.userService
      .GetUserCommentDTOById(this.ratingFromParent.createdByUserId)
      .subscribe({
        next: (userFromDB: UserCommentDTO) => {
          this.userComment.set(userFromDB);
        },
        error: (error: HttpErrorResponse) => {
          this.userError.set(true);
        },
      });

    for (let i = 1; i <= this.ratingFromParent.ratingContent; i++) {
      this.ratingStars[i - 1] = i;
    }
    for (let i = 1; i <= 5 - this.ratingFromParent.ratingContent; i++) {
      this.notRatingStars[i - 1] = i;
    }
  }

  DeleteThisRating() {
    let confirmDeletion = confirm('Are you sure about the deletion?');
    if (confirmDeletion) {
      this.RatingToDelete.emit(this.ratingFromParent.id);
    }
  }

  GoToUserPage() {
    if (this.userComment() !== null && this.userComment() !== undefined) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
      if (this.userStore.user()?.id === this.userComment()?.id) {
        this.router.navigateByUrl(`user`);
      } else {
        this.router.navigateByUrl(`user-details/${this.userComment()?.id}`);
      }
    }
  }
}
