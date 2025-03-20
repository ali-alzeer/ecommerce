import {
  AfterViewInit,
  Component,
  ElementRef,
  inject,
  OnInit,
  QueryList,
  signal,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Product } from '../../models/product.interface';
import { HttpErrorResponse } from '@angular/common/http';
import { LoadingComponent } from '../../components/loading/loading.component';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faAngleDoubleDown,
  faImage,
  faStar,
} from '@fortawesome/free-solid-svg-icons';
import { SliderComponent } from '../../components/slider/slider.component';
import { RatingComponent } from '../../components/rating/rating.component';
import { Rating } from '../../models/rating.interface';
import { CommentComponent } from '../../components/comment/comment.component';
import { UserStore } from '../../stores/user.store';
import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
  ValueChangeEvent,
} from '@angular/forms';
import { CommentAddDTO } from '../../models/commentAddDTO.interface';
import { RatingAddDTO } from '../../models/ratingAddDTO.interface';
import { CartService } from '../../services/cart.service';
import { UtilsService } from '../../services/utils.service';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [
    LoadingComponent,
    CommonModule,
    FontAwesomeModule,
    SliderComponent,
    RatingComponent,
    CommentComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss',
})
export class DetailsComponent implements OnInit {
  userStore = inject(UserStore);

  ratingStars: number[] = [];
  notRatingStars: number[] = [];

  faStar = faStar;
  faImage = faImage;
  faAngleDoubleDown = faAngleDoubleDown;

  productsService = inject(ProductsService);
  router = inject(Router);
  route = inject(ActivatedRoute);
  cartService = inject(CartService);
  utilsService = inject(UtilsService);

  cart = signal<Product[] | null>(null);
  product = signal<Product | null>(null);
  RatingsArray = signal<Rating[]>([]);
  ratingsError = signal(false);
  loading = signal(false);

  showRatings = signal(false);
  showComments = signal(false);

  EnableRating = signal(false);
  EnableComment = signal(false);

  ActiveRating = signal<number>(0);

  CommentErrorMessage = signal('');
  RatingErrorMessage = signal('');

  CommentInput!: FormControl;

  fb = inject(FormBuilder);

  ProductExistsInCart = signal(false);

  ShowRatings() {
    this.showRatings.set(!this.showRatings());
  }

  ShowComments() {
    this.showComments.set(!this.showComments());
  }

  EnableRatingStars() {
    this.EnableRating.set(!this.EnableRating());
    this.RatingErrorMessage.set('');
    this.ActiveRating.set(0);
  }

  EnableCommentInput() {
    this.EnableComment.set(!this.EnableComment());
    this.CommentErrorMessage.set('');
    this.CommentInput?.reset();
  }

  StarHover(StarNumber: number) {
    if (this.ActiveRating() === 0) {
      for (let i = 1; i <= StarNumber; i++) {
        document.getElementById(`star${i}`)!.style.color = '#eab308';
      }
    }
  }

  StarLeave(StarNumber: number) {
    if (this.ActiveRating() === 0) {
      for (let i = 1; i <= StarNumber; i++) {
        document.getElementById(`star${i}`)!.style.color = '#64748b';
      }
    }
  }

  StarClick(StarNumber: number) {
    if (this.ActiveRating() === 0) {
      this.ActiveRating.set(StarNumber);
    }
  }

  //RATINGS
  SubmitRating() {
    if (!this.userStore.isUser()) {
      this.RatingErrorMessage.set('You are not signed in');
    } else {
      let ratingOfTheSameUser = this.RatingsArray().filter(
        (c) => c.createdByUserId === this.userStore.user()?.id!
      );

      if (
        ratingOfTheSameUser !== undefined &&
        ratingOfTheSameUser?.length === 0
      ) {
        if (this.product() !== null && this.product() !== undefined) {
          let RatingData: RatingAddDTO = {
            ratingContent: this.ActiveRating(),
            createdByUserId: this.userStore.user()?.id!,
            productId: this.product()?.id!,
          };

          this.loading.set(true);

          let sub2 = this.productsService
            .AddRatingToProduct(RatingData)
            .subscribe({
              next: (productFromDB: Product) => {
                this.product.set(productFromDB);
                if (this.product() !== null && this.product() !== undefined) {
                  this.ratingStars = [];
                  this.notRatingStars = [];

                  for (let i = 0; i < this.product()?.rating!; i++) {
                    this.ratingStars.push(1);
                  }
                  for (let i = 0; i < 5 - this.product()?.rating!; i++) {
                    this.notRatingStars.push(1);
                  }

                  let nestedSub = this.productsService
                    .GetProductRatingsByProductId(this.product()?.id!)
                    .subscribe({
                      next: (ratingsFromDB: Rating[]) => {
                        this.RatingsArray.set(ratingsFromDB);
                      },
                      error: (error: HttpErrorResponse) => {
                        console.log(error.message);
                        this.ratingsError.set(true);
                        nestedSub.unsubscribe();
                      },
                    });

                  this.ActiveRating.set(0);
                  // this.StarLeave(5);
                }
              },
              error: () => {
                this.RatingErrorMessage.set(
                  'An error occurred, could not submit the rating'
                );
              },
              complete: () => {
                this.loading.set(false);
                sub2.unsubscribe();
              },
            });
        }
      } else {
        this.RatingErrorMessage.set(
          'Only one rating is allowed for each product'
        );
      }
    }
  }

  DeleteRating(ratingId: number) {
    if (!this.userStore.isUser()) {
      this.RatingErrorMessage.set('You are not signed in');
    } else {
      let ratingOfTheSameUser = this.RatingsArray().filter(
        (c) => c.createdByUserId === this.userStore.user()?.id!
      );

      if (
        ratingOfTheSameUser !== undefined &&
        ratingOfTheSameUser?.length > 0
      ) {
        if (this.product() !== null && this.product() !== undefined) {
          this.loading.set(true);

          let sub2 = this.productsService
            .DeleteRating(ratingId, this.product()?.id!)
            .subscribe({
              next: (productFromDB: Product) => {
                this.product.set(productFromDB);
                if (this.product() !== null && this.product() !== undefined) {
                  this.ratingStars = [];
                  this.notRatingStars = [];

                  for (let i = 0; i < this.product()?.rating!; i++) {
                    this.ratingStars.push(1);
                  }
                  for (let i = 0; i < 5 - this.product()?.rating!; i++) {
                    this.notRatingStars.push(1);
                  }

                  let nestedSub = this.productsService
                    .GetProductRatingsByProductId(this.product()?.id!)
                    .subscribe({
                      next: (ratingsFromDB: Rating[]) => {
                        this.RatingsArray.set(ratingsFromDB);
                      },
                      error: (error: HttpErrorResponse) => {
                        console.log(error.message);
                        this.ratingsError.set(true);
                        this.loading.set(false);
                        nestedSub.unsubscribe();
                      },
                    });
                }
              },
              error: () => {
                this.RatingErrorMessage.set(
                  'An error occurred, could not delete the rating'
                );
              },
              complete: () => {
                this.loading.set(false);
                sub2.unsubscribe();
              },
            });
        }
      } else {
        this.RatingErrorMessage.set('No rating to delete');
      }
    }
  }

  //COMMENTS
  SubmitComment() {
    if (!this.userStore.isUser()) {
      this.CommentErrorMessage.set('You are not signed in');
    } else {
      let commentOfTheSameUser = this.product()?.comments?.filter(
        (c) => c.createdByUserId === this.userStore.user()?.id!
      );

      if (
        commentOfTheSameUser !== undefined &&
        commentOfTheSameUser?.length === 0
      ) {
        if (this.product() !== null && this.product() !== undefined) {
          if (this.utilsService.CheckForBadWords(this.CommentInput.value)) {
            this.CommentErrorMessage.set('Bad words are not allowed');
            return;
          }

          let CommentData: CommentAddDTO = {
            commentContent: this.CommentInput.value,
            createdByUserId: this.userStore.user()?.id!,
            productId: this.product()?.id!,
          };

          this.loading.set(true);

          let sub2 = this.productsService
            .AddCommentToProduct(CommentData)
            .subscribe({
              next: (productFromDB: Product) => {
                this.product.set(productFromDB);
                if (this.product() !== null && this.product() !== undefined) {
                  this.ratingStars = [];
                  this.notRatingStars = [];

                  for (let i = 0; i < this.product()?.rating!; i++) {
                    this.ratingStars.push(1);
                  }
                  for (let i = 0; i < 5 - this.product()?.rating!; i++) {
                    this.notRatingStars.push(1);
                  }

                  let nestedSub = this.productsService
                    .GetProductRatingsByProductId(this.product()?.id!)
                    .subscribe({
                      next: (ratingsFromDB: Rating[]) => {
                        this.RatingsArray.set(ratingsFromDB);
                      },
                      error: (error: HttpErrorResponse) => {
                        console.log(error.message);
                        this.ratingsError.set(true);
                        nestedSub.unsubscribe();
                      },
                    });

                  this.CommentInput.reset();
                }
              },
              error: () => {
                this.CommentErrorMessage.set(
                  'An error occurred, could not submit the comment'
                );
              },
              complete: () => {
                this.loading.set(false);
                sub2.unsubscribe();
              },
            });
        }
      } else {
        this.CommentErrorMessage.set(
          'Only one comment is allowed for each product'
        );
      }
    }
  }

  DeleteComment(commentId: number) {
    if (!this.userStore.isUser()) {
      this.CommentErrorMessage.set('You are not signed in');
    } else {
      let commentOfTheSameUser = this.product()?.comments?.filter(
        (c) => c.createdByUserId === this.userStore.user()?.id!
      );

      if (
        commentOfTheSameUser !== undefined &&
        commentOfTheSameUser?.length > 0
      ) {
        if (this.product() !== null && this.product() !== undefined) {
          this.loading.set(true);

          let sub2 = this.productsService
            .DeleteComment(commentId, this.product()?.id!)
            .subscribe({
              next: (productFromDB: Product) => {
                this.product.set(productFromDB);
                if (this.product() !== null && this.product() !== undefined) {
                  this.ratingStars = [];
                  this.notRatingStars = [];

                  for (let i = 0; i < this.product()?.rating!; i++) {
                    this.ratingStars.push(1);
                  }
                  for (let i = 0; i < 5 - this.product()?.rating!; i++) {
                    this.notRatingStars.push(1);
                  }

                  let nestedSub = this.productsService
                    .GetProductRatingsByProductId(this.product()?.id!)
                    .subscribe({
                      next: (ratingsFromDB: Rating[]) => {
                        this.RatingsArray.set(ratingsFromDB);
                      },
                      error: (error: HttpErrorResponse) => {
                        console.log(error.message);
                        this.ratingsError.set(true);
                        nestedSub.unsubscribe();
                      },
                    });
                }
              },
              error: () => {
                this.CommentErrorMessage.set(
                  'An error occurred, could not delete the comment'
                );
              },
              complete: () => {
                this.loading.set(false);
                sub2.unsubscribe();
              },
            });
        }
      } else {
        this.CommentErrorMessage.set('No comment to delete');
      }
    }
  }

  GetProductFromDB(ProductId: number) {
    let sub = this.productsService.GetProductById(ProductId).subscribe({
      next: (productFromDB: Product) => {
        this.product.set(productFromDB);
        if (this.product() !== null && this.product() !== undefined) {
          this.ratingStars = [];
          this.notRatingStars = [];

          for (let i = 0; i < this.product()?.rating!; i++) {
            this.ratingStars.push(1);
          }
          for (let i = 0; i < 5 - this.product()?.rating!; i++) {
            this.notRatingStars.push(1);
          }

          this.productsService
            .GetProductRatingsByProductId(ProductId)
            .subscribe({
              next: (ratingsFromDB: Rating[]) => {
                this.RatingsArray.set(ratingsFromDB);
              },
              error: (error: HttpErrorResponse) => {
                console.log(error.message);
                this.ratingsError.set(true);
              },
            });

          if (this.cart() !== null) {
            let productExists = this.cart()?.filter(
              (p) => p.id === this.product()?.id
            );
            if (productExists === undefined || productExists.length === 0) {
              this.ProductExistsInCart.set(false);
            } else {
              this.ProductExistsInCart.set(true);
            }
          } else {
            this.ProductExistsInCart.set(false);
          }
        }
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

  AddToCart() {
    if (this.product() !== null && this.product() !== undefined) {
      this.cartService.AddToCart(this.product()!);
      this.ProductExistsInCart.set(true);
    }
  }

  ngOnInit(): void {
    this.loading.set(true);

    this.route.params.subscribe({
      next: (params: Params) => {
        if (isNaN(Number(params['id'])) || Number(params['id']) <= 0) {
          this.router.navigateByUrl('');
          this.loading.set(false);
        } else {
          this.cart.set(this.cartService.LoadCart());
          this.GetProductFromDB(Number(params['id']));
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

    this.CommentInput = this.fb.control('', {
      validators: [Validators.maxLength(100), Validators.minLength(1)],
    });
  }
}
