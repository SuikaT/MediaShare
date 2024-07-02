import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Media } from '../../../model/interfaces/Media';
import { PersistenceService } from '../../../services/persistence.service';
import { MediasService } from '../../../services/medias.service';
import { BehaviorSubject } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import { MediaFile } from '../../../model/interfaces/MediaFile';

@Component({
  selector: 'app-movie',
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule, MatIconModule, MatButtonModule],
  templateUrl: './movie.component.html',
  styleUrl: './movie.component.scss',
})
export class MovieComponent {
  @Input()
  media: Media;

  downloaded = false;

  progress$ = new BehaviorSubject<number>(0);

  constructor(
    private _medias: MediasService,
    private _persistence: PersistenceService,
  ) {}

  downloadMedia() {
    this._persistence.getMovieFile(this.media).subscribe((event) => {
      if (event.type == 3) {
        const progress = (event.loaded / event.total) * 100;
        console.log(progress);
        this.progress$.next(progress);
      }

      if (event instanceof HttpResponse) {
        const mediaFile: MediaFile = { file: event?.body, fileName: this.media.name };

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
