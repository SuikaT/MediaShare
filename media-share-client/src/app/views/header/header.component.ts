import { Component } from '@angular/core';
import { Section } from '../../model/interfaces/Section';
import { StatesService } from '../../services/states.service';
import { Router } from '@angular/router';
import { MediaTypeEnum } from '../../model/enums/MediaTypeEnum';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  sections: Section[] = [
    { name: 'Animes', mediaType: MediaTypeEnum.ANIME },
    { name: 'Séries', mediaType: MediaTypeEnum.SHOW },
    { name: 'Films', mediaType: MediaTypeEnum.MOVIE },
  ];

  constructor(
    private _states: StatesService,
    private router: Router,
  ) {}

  changeSection(section: Section) {
    this._states.selectedSection = section;
    this.router.navigate(['']);
  }
}
