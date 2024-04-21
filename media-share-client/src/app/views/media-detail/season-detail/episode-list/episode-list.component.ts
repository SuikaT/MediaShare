import { Component, Input } from '@angular/core';
import { Episode } from '../../../../model/interfaces/Episode';
import { MatIconModule } from '@angular/material/icon';
import { ParseSizePipePipe } from "../../../../pipes/parse-size-pipe.pipe";

@Component({
    selector: 'app-episode-list',
    standalone: true,
    templateUrl: './episode-list.component.html',
    styleUrl: './episode-list.component.scss',
    imports: [MatIconModule, ParseSizePipePipe]
})
export class EpisodeListComponent {
  @Input()
  episodeList: Episode[];
}
