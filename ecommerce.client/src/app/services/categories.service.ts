import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Category } from '../models/category.interface';
import { BASEURL } from '../../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  http = inject(HttpClient);

  public GetAllCategories() {
    return this.http.get<Category[]>(`${BASEURL}/api/Categories/all`);
  }
}
