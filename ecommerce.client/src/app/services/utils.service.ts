import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {
  computed,
  DoCheck,
  inject,
  Injectable,
  OnInit,
  signal,
} from '@angular/core';
import { BASEURL } from '../../environment/environment';

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
    // Escape special regex characters
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  StringToRegex(input: string, flags?: string): RegExp {
    // Escape the input string to handle special characters
    // const escapedString = this.EscapeRegExp(input);
    // Create a new RegExp object with the escaped string and optional flags
    return new RegExp(input, flags);
  }
}
