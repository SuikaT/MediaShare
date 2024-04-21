import { Component, Input, OnInit } from '@angular/core';
import { Season } from '../../../model/interfaces/Season';
import { ActivatedRoute, Router } from '@angular/router';
import { MediasService } from '../../../services/medias.service';
import { combineLatest } from 'rxjs';
import { MatExpansionModule } from '@angular/material/expansion';
import { EpisodeListComponent } from './episode-list/episode-list.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-season-detail',
  standalone: true,
  templateUrl: './season-detail.component.html',
  styleUrl: './season-detail.component.scss',
  imports: [MatExpansionModule, EpisodeListComponent, MatButtonModule, MatIconModule],
})
export class SeasonDetailComponent {
  @Input()
  season: Season;

  constructor() {}
}
