import { Component, Input } from '@angular/core';
import { Media } from '../../../model/interfaces/media';

@Component({
  selector: 'app-medias-display',
  standalone: true,
  imports: [],
  templateUrl: './medias-display.component.html',
  styleUrl: './medias-display.component.scss',
})
export class MediasDisplayComponent {
  @Input()
  mediaType: Media;

  constructor() {}
}
