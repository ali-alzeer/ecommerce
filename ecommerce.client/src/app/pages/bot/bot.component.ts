import { HttpClient } from '@angular/common/http';
import {
  Component,
  inject,
  OnDestroy,
  OnInit,
  Renderer2,
  signal,
} from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faHandPointDown,
  faPaperPlane,
} from '@fortawesome/free-solid-svg-icons';
import { parse } from 'marked';
import { UtilsService } from '../../services/utils.service';
import { ProductsService } from '../../services/products.service';
import { Product } from '../../models/product.interface';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-bot',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './bot.component.html',
  styleUrl: './bot.component.scss',
})
export class BotComponent implements OnInit, OnDestroy {
  http = inject(HttpClient);
  utilsService = inject(UtilsService);
  renderer = inject(Renderer2);

  faSend = faPaperPlane;
  faDown = faHandPointDown

  response: any;
  loading = signal<boolean>(false);

  EnterClick = () => {};

  subscription = new Subscription()

  ngOnInit(): void {
    document.getElementById('resDiv')!.innerHTML = `<p class="text-gray-400">Response goes here...<p>`;

    this.EnterClick = this.renderer.listen('document', 'keydown', (event) => {
      if (event.key === "Enter") {
        this.SendMessage();
      }
    });
  }

  ngOnDestroy(): void {
    this.EnterClick = () => {};
    this.subscription.unsubscribe();
  }

  SendMessage() {
    if (
      (document.getElementById('userInput') as HTMLInputElement).value === ''
    ) {
      document.getElementById('resDiv')!.innerHTML = 'The prompt is empty!';
    } else {
      if(!this.loading()){
        this.loading.set(true);

        document.getElementById('resDiv')!.innerHTML = 'Getting the response for you, please wait...';
  
        this.subscription =  this.utilsService.SendMessageToBot(this.utilsService.CreateFinalAIMessageForAssistance(
          (document.getElementById('userInput') as HTMLInputElement)
            .value
        ),)
          .subscribe({
            next: (res: any) => {
              this.loading.set(false);
              this.response = parse(
                res?.choices?.[0]?.message?.content ||
                  "I'm sorry, looks like something went wrong, please try again later"
              );
              document.getElementById('resDiv')!.innerHTML = this.response;
            },
            error: (err) => {
              this.loading.set(false);
              console.log(err);
              document.getElementById('resDiv')!.innerHTML =
                "I'm sorry, looks like something went wrong, please try again later";
            },
          });
      }
    }
  }
}
