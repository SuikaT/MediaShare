import { Component } from '@angular/core';
import { Section } from '../../model/interfaces/Section';
import { StatesService } from '../../services/states.service';
import { Router } from '@angular/router';
import { MediaTypeEnum } from '../../model/enums/MediaTypeEnum';
import { SearchBarComponent } from './search-bar/search-bar.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [SearchBarComponent],
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

  toHomePage() {
    this.router.navigate(['']);
  }
}
