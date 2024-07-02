import { Component, Input, OnInit } from '@angular/core';
import { Episode } from '../../../../../model/interfaces/Episode';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Season } from '../../../../../model/interfaces/Season';
import { MediasService } from '../../../../../services/medias.service';
import { ParseSizePipe } from '../../../../../pipes/parse-size.pipe';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Media } from '../../../../../model/interfaces/Media';
import { HttpResponse } from '@angular/common/http';
import { MediaFile } from '../../../../../model/interfaces/MediaFile';
import { PersistenceService } from '../../../../../services/persistence.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-episode',
  standalone: true,
  templateUrl: './episode.component.html',
  styleUrl: './episode.component.scss',
  imports: [MatIconModule, MatButtonModule, ParseSizePipe, MatProgressSpinnerModule, CommonModule],
})
export class EpisodeComponent implements OnInit {
  @Input()
  season: Season;

  @Input()
  media: Media;

  @Input()
  episode: Episode;

  @Input()
  downloadEvent: Subject<void>;

  progress$ = new BehaviorSubject<number>(0);

  downloaded = false;

  constructor(
    private _medias: MediasService,
    private _persistence: PersistenceService,
  ) {}

  ngOnInit(): void {
    //trigger download on downloadEvent emit
    this.downloadEvent.subscribe(() => this.download());
  }

  download() {
    this._persistence.getMediaFile(this.media.type, this.media.id, this.season.id, this.episode.id).subscribe((event) => {
      // progress event
      if (event.type == 3) {
        const progress = (event.loaded / event.total) * 100;
        this.progress$.next(progress);
      }

      if (event instanceof HttpResponse) {
        const mediaFile: MediaFile = { file: event?.body, fileName: this.episode.name };

        this._medias.downloadFile(mediaFile);
        // reset progress spiner
        this.progress$.next(0);
        // signal user that download is done
        this.downloaded = true;
      }
    });
  }

  get progress(): number {
    return this.progress$.getValue();
  }

  set progress(value: number) {
    this.progress$.next(value);
  }
}
