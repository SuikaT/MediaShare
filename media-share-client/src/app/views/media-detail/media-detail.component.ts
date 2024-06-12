import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Media } from '../../model/interfaces/Media';
import { MediasService } from '../../services/medias.service';
import { SeasonDetailComponent } from './season-detail/season-detail.component';
import { MatButtonModule } from '@angular/material/button';
import { Season } from '../../model/interfaces/Season';
import { EpisodeListComponent } from './season-detail/episode-list/episode-list.component';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { PersistenceService } from '../../services/persistence.service';

@Component({
  selector: 'app-media-detail',
  standalone: true,
  templateUrl: './media-detail.component.html',
  styleUrl: './media-detail.component.scss',
  imports: [SeasonDetailComponent, MatButtonModule, RouterModule, EpisodeListComponent, MatIconModule],
})
export class MediaDetailComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public _medias: MediasService,
    private _persistence: PersistenceService,
  ) {}

  media: Media;
  isSeason = false;

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      // Access parameters
      const id = params['mid'];
      const type = params['mtype'];

      if (id == undefined || type == undefined) this.router.navigate(['']);

      const mediaTarget = this._medias.displayedMedias.find((m) => m.id == id);

      if (!mediaTarget) {
        this._persistence.getMedia(type, id).subscribe((media) => this.initMediaDetail(media));
      } else {
        this.initMediaDetail(mediaTarget);
      }
    });
  }

  private initMediaDetail(media: Media) {
    if (media) {
      this.isSeason = this._medias.isSeasonMedia(media.type);
      this._medias.mediaDetail = media;
      this.media = this._medias.mediaDetail;
    }
  }
}
