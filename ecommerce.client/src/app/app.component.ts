import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { UtilsService } from './services/utils.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  utilsService = inject(UtilsService);

  ngOnInit(): void {
    this.utilsService.GetBadWordsRegexes().subscribe({
      next: (regexesFromDB: string[]) => {
        this.utilsService.BadWordsRegexes2.set(regexesFromDB);
        this.utilsService.BadWordsRegexes.set(
          regexesFromDB.map((r) => this.utilsService.StringToRegex(r))
        );
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
      },
    });
  }
}
