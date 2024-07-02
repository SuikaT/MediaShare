import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Media } from '../../model/interfaces/Media';
import { MediasService } from '../../services/medias.service';
import { PersistenceService } from '../../services/persistence.service';
import { MovieComponent } from './movie/movie.component';
import { EpisodeListComponent } from './season-detail/episode-list/episode-list.component';
import { SeasonDetailComponent } from './season-detail/season-detail.component';

@Component({
  selector: 'app-media-detail',
  standalone: true,
  templateUrl: './media-detail.component.html',
  styleUrl: './media-detail.component.scss',
  imports: [SeasonDetailComponent, RouterModule, EpisodeListComponent, MovieComponent],
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
