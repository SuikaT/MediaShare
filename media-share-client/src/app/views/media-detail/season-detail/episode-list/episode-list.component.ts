import { Component, Input } from '@angular/core';
import { Episode } from '../../../../model/interfaces/Episode';
import { MatIconModule } from '@angular/material/icon';
import { ParseSizePipePipe } from '../../../../pipes/parse-size-pipe.pipe';
import { MatButtonModule } from '@angular/material/button';
import { Season } from '../../../../model/interfaces/Season';
import { Media } from '../../../../model/interfaces/Media';
import { PersistenceService } from '../../../../services/persistence.service';
import { MediasService } from '../../../../services/medias.service';

@Component({
  selector: 'app-episode-list',
  standalone: true,
  templateUrl: './episode-list.component.html',
  styleUrl: './episode-list.component.scss',
  imports: [MatIconModule, MatButtonModule, ParseSizePipePipe],
})
export class EpisodeListComponent {
  @Input()
  season: Season;

  @Input()
  media: Media;

  constructor(public _medias: MediasService) {}

  download(episode: Episode) {
    this._medias.downloadEpisode(this.media, this.season, episode);
  }
}
