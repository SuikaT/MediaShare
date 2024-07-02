import { Component, Input, OnInit } from '@angular/core';
import { Media } from '../../../model/interfaces/Media';
import { CommonModule } from '@angular/common';
import { MediasService } from '../../../services/medias.service';
import { MediaTypeEnum } from '../../../model/enums/MediaTypeEnum';
import { StatesService } from '../../../services/states.service';
import { PersistenceService } from '../../../services/persistence.service';
import { MediaFile } from '../../../model/interfaces/MediaFile';
import { Router } from '@angular/router';

@Component({
  selector: 'app-medias-display',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './medias-display.component.html',
  styleUrl: './medias-display.component.scss',
})
export class MediasDisplayComponent {
  @Input()
  mediaList: Media[] = [];

  constructor(private router: Router) {}

  navigateToDetails(media: Media) {
    this.router.navigate(['/media-detail', media.type, media?.id]);
  }
}
