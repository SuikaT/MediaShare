import { Component, OnInit } from '@angular/core';
import { MediasService } from '../../services/medias.service';
import { CommonModule } from '@angular/common';
import { Section } from '../../model/interfaces/Section';
import { MediaTypeEnum } from '../../model/enums/MediaTypeEnum';
import { Media } from '../../model/interfaces/Media';
import { StatesService } from '../../services/states.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit {
  sections: Section[] = [
    { name: 'Animes', mediaType: MediaTypeEnum.ANIME },
    { name: 'Séries', mediaType: MediaTypeEnum.SHOW },
    { name: 'Films', mediaType: MediaTypeEnum.MOVIE },
  ];

  excludedMedias: MediaTypeEnum[] = [];

  constructor(
    private _medias: MediasService,
    private _states: StatesService,
    private router: Router,
  ) {}

  ngOnInit() {}

  changeSection(section: Section) {
    this._states.selectedSection = section;
    this.router.navigate(['']);
  }
}
