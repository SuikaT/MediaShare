import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Media } from '../../model/interfaces/Media';
import { MediasService } from '../../services/medias.service';

@Component({
  selector: 'app-media-detail',
  standalone: true,
  imports: [],
  templateUrl: './media-detail.component.html',
  styleUrl: './media-detail.component.scss',
})
export class MediaDetailComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private _media: MediasService,
  ) {}

  media: Media;

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const id = params['id']; // Access the 'id' parameter

      if (id == undefined) this.router.navigate(['']);

      const mediaTarget = this._media.displayedMedias.find((m) => m.id == id);

      if (!mediaTarget) {
        //TODO CALL BACKEND
      }
    });
  }
}
