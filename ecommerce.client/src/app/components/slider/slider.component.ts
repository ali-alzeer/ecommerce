import { Component, Input, signal } from '@angular/core';
import { Image } from '../../models/image.interface';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-slider',
  standalone: true,
  imports: [FontAwesomeModule, RouterLink],
  templateUrl: './slider.component.html',
  styleUrl: './slider.component.scss',
})
export class SliderComponent {
  faArrowLeft = faArrowLeft;
  faArrowRight = faArrowRight;

  @Input({ required: true }) images: Image[] = [];

  currentImageIndex = signal(0);

  PreviousImage() {
    if (this.currentImageIndex() !== 0) {
      this.currentImageIndex.set(this.currentImageIndex() - 1);
    }
  }

  NextImage() {
    if (this.currentImageIndex() !== this.images.length - 1) {
      this.currentImageIndex.set(this.currentImageIndex() + 1);
    }
  }
}
