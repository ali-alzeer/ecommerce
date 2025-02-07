import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
  signal,
} from '@angular/core';
import { Comment } from '../../models/comment.interface';
import { UserService } from '../../services/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { UserCommentDTO } from '../../models/userCommentDTO.interface';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faUser, faX } from '@fortawesome/free-solid-svg-icons';
import { UserStore } from '../../stores/user.store';
import { Router } from '@angular/router';

@Component({
  selector: 'app-comment',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.scss',
})
export class CommentComponent implements OnInit {
  faUser = faUser;
  faX = faX;

  userService = inject(UserService);
  userStore = inject(UserStore);
  router = inject(Router);

  @Input({ required: true }) commentFromParent!: Comment;

  @Output() CommentToDelete = new EventEmitter<number>();

  userComment = signal<UserCommentDTO | null>(null);

  userError = signal(false);

  ngOnInit(): void {
    this.userService
      .GetUserCommentDTOById(this.commentFromParent.createdByUserId)
      .subscribe({
        next: (userFromDB: UserCommentDTO) => {
          this.userComment.set(userFromDB);
        },
        error: (error: HttpErrorResponse) => {
          this.userError.set(true);
        },
      });
  }

  DeleteThisComment() {
    let confirmDeletion = confirm('Are you sure about the deletion?');
    if (confirmDeletion) {
      this.CommentToDelete.emit(this.commentFromParent.id);
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
