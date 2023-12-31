import { Component, Input } from '@angular/core';
import { Media } from '../../../model/interfaces/media';
import { CommonModule } from '@angular/common';
import { MediasService } from '../../../services/medias.service';

@Component({
  selector: 'app-medias-display',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './medias-display.component.html',
  styleUrl: './medias-display.component.scss',
})
export class MediasDisplayComponent {
  @Input()
  mediaType: Media;

  constructor(public _medias: MediasService) {}
}
