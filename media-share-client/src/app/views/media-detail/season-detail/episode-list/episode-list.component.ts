import { Component, Input } from '@angular/core';
import { Episode } from '../../../../model/interfaces/Episode';
import { MatIconModule } from '@angular/material/icon';
import { ParseSizePipe } from '../../../../pipes/parse-size.pipe';
import { MatButtonModule } from '@angular/material/button';
import { Season } from '../../../../model/interfaces/Season';
import { Media } from '../../../../model/interfaces/Media';
import { PersistenceService } from '../../../../services/persistence.service';
import { MediasService } from '../../../../services/medias.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { CommonModule } from '@angular/common';
import { EpisodeComponent } from './episode/episode.component';

@Component({
  selector: 'app-episode-list',
  standalone: true,
  templateUrl: './episode-list.component.html',
  styleUrl: './episode-list.component.scss',
  imports: [EpisodeComponent, MatIconModule, MatButtonModule, ParseSizePipe],
})
export class EpisodeListComponent {
  @Input()
  season: Season;

  @Input()
  media: Media;

  downloadEvent$ = new Subject<void>();

  constructor(public _medias: MediasService) {}

  downloadAll() {
    // trigger download on all EpisodeComponent
    this.downloadEvent$.next();
  }
}
