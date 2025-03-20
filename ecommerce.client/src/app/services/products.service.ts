import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Product } from '../models/product.interface';
import { BASEURL } from '../../environment/environment';
import { ProductsFilter } from '../models/productsFilter.interface';
import { Category } from '../models/category.interface';
import { Rating } from '../models/rating.interface';
import { CommentAddDTO } from '../models/commentAddDTO.interface';
import { CommentDeleteDTO } from '../models/commentDeleteDTO.interface';
import { RatingAddDTO } from '../models/ratingAddDTO.interface';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  http = inject(HttpClient);

  public DeleteRating(id: number, productId: number) {
    return this.http.delete<Product>(
      `${BASEURL}/api/Products/ratings?id=${id}&&productId=${productId}`
    );
  }

  public AddRatingToProduct(ratingAddDTO: RatingAddDTO) {
    return this.http.post<Product>(
      `${BASEURL}/api/Products/ratings`,
      ratingAddDTO
    );
  }

  public DeleteComment(id: number, productId: number) {
    return this.http.delete<Product>(
      `${BASEURL}/api/Products/comments?id=${id}&&productId=${productId}`
    );
  }

  public AddCommentToProduct(commentAddDTO: CommentAddDTO) {
    return this.http.post<Product>(
      `${BASEURL}/api/Products/comments`,
      commentAddDTO
    );
  }

  public GetProductRatingsByProductId(id: number) {
    return this.http.get<Rating[]>(`${BASEURL}/api/Products/ratings?id=${id}`);
  }

  public GetProductById(id: number) {
    return this.http.get<Product>(`${BASEURL}/api/Products/id?id=${id}`);
  }

  public GetMaxProductsCount() {
    return this.http.get<number>(`${BASEURL}/api/Products/count`);
  }

  public GetAllProducts() {
    return this.http.get<Product[]>(`${BASEURL}/api/Products/all`);
  }

  public GetProductsByFilterByPage(filter: ProductsFilter) {
    let finalurl = `${BASEURL}/api/Products/filter/page?`;

    if (filter.CategoryId != null) {
      finalurl += `CategoryId=${filter.CategoryId}&`;
    }
    if (filter.Search != null) {
      finalurl += `Search=${filter.Search}&`;
    }
    if (filter.MinPrice != null && filter.MaxPrice != null) {
      finalurl += `MinPrice=${filter.MinPrice}&`;
      finalurl += `MaxPrice=${filter.MaxPrice}&`;
    }
    if (filter.MinRating != null && filter.MaxRating != null) {
      finalurl += `MinRating=${filter.MinRating}&`;
      finalurl += `MaxRating=${filter.MaxRating}&`;
    }
    if (filter.PageNumber != null) {
      finalurl += `PageNumber=${filter.PageNumber}`;
    } else {
      finalurl += `PageNumber=1`;
    }
    if (filter.PageSize != null) {
      finalurl += `&PageSize=${filter.PageSize}`;
    } else {
      finalurl += `&PageSize=10`;
    }

    return this.http.get<Product[]>(finalurl);
  }

  public GetDefaultPageNumber() {
    return 10;
  }

  public GetDefaultPageSize() {
    return 10;
  }
}
