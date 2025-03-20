import { HttpClient } from '@angular/common/http';
import {
  inject,
  Injectable,
  signal,
} from '@angular/core';
import { AI_REQUEST_HEADERS, AI_REQUEST_URL, AI_REQUEST_BODY, BASEURL} from '../../environment/environment';
import { ProductsFilter } from '../models/productsFilter.interface';

@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  http = inject(HttpClient);

  BadWordsRegexes = signal<RegExp[]>([]);
  BadWordsRegexes2 = signal<string[]>([]);

  public GetBadWordsRegexes() {
    return this.http.get<string[]>(`${BASEURL}/api/Utils/regexes`);
  }

  CheckForBadWords(comment: string): boolean {
    let commentWords = comment.split(' ');
    let matchesAny = false;

    for (let i = 0; i < commentWords.length; i++) {
      matchesAny = this.BadWordsRegexes().some((regex) =>
        regex.test(commentWords[i])
      );
      if (matchesAny) {
        return true;
      }
    }

    return false;
  }

  EscapeRegExp(string: string): string {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  StringToRegex(input: string, flags?: string): RegExp {
    return new RegExp(input, flags);
  }

  CreateFinalAIMessageForAssistance(userInput: string){
    return `You are a chat bot in an E-commerce called "Zed Store" that contains pages (home [this is main section that contains the list of products and the search and filters] , user [this is the sign in / sign up page], cart [this is where products that user add to cart], bot [chat with you]) and all pages are on a header at the top and the store was developed by "Itqan team" and this is the user input for you "${userInput}", do not say anything other than respond with a suitable response for the user and do not use the quotes in the begining and end of your answer`
  }
  CreateFinalAIMessageForSearch(filter: ProductsFilter, json : string){
    return `You are a chat bot in an E-commerce called "Zed Store", the store was developed by "Itqan team" and your job is to choose products that are suitable for this user search "${filter.Search}" and those filters [categoryId = ${filter.CategoryId}, minPrice = ${filter.MinPrice}, maxPrice = ${filter.MaxPrice}, minRating = ${filter.MinRating}, maxRating = ${filter.MaxRating} ] from this json text "${json}", do not say anything other than json format starting with json array [] as a normal text (without markdown styling) and inside it the products you chose according to user search from the json text that I send previously`
  }
  SendMessageToBot(content : string){
    return this.http
    .post(
      AI_REQUEST_URL,
      AI_REQUEST_BODY(content),
      AI_REQUEST_HEADERS,
    )
}
}
