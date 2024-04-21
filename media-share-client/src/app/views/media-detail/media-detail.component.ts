import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Media } from '../../model/interfaces/Media';
import { MediasService } from '../../services/medias.service';
import { SeasonDetailComponent } from './season-detail/season-detail.component';
import { MatButtonModule } from '@angular/material/button';
import { Season } from '../../model/interfaces/Season';
import { EpisodeListComponent } from './season-detail/episode-list/episode-list.component';

@Component({
  selector: 'app-media-detail',
  standalone: true,
  templateUrl: './media-detail.component.html',
  styleUrl: './media-detail.component.scss',
  imports: [SeasonDetailComponent, MatButtonModule, RouterModule, EpisodeListComponent],
})
export class MediaDetailComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private _media: MediasService,
  ) {}

  media: Media;
  isSeason = false;

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const id = params['mid']; // Access the 'id' parameter

      if (id == undefined) this.router.navigate(['']);

      const mediaTarget = this._media.displayedMedias.find((m) => m.id == id);

      console.log(mediaTarget);
      if (!mediaTarget) {
        //TODO CALL BACKEND
        this.router.navigate(['']);
      } else {
        this.isSeason = this._media.isSeasonMedia(mediaTarget.type);
        this._media.mediaDetail = mediaTarget;
        this.media = this._media.mediaDetail;
      }
    });
  }
}
