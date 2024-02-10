import { Component, OnInit } from '@angular/core';
import { MediasService } from '../../services/medias.service';
import { CommonModule } from '@angular/common';
import { Section } from '../../model/interfaces/Section';
import { MediaTypeEnum } from '../../model/enums/MediaTypeEnum';
import { Media } from '../../model/interfaces/Media';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit {
  sections: Section[] = [
    { name: 'Animes', mediaTypes: [MediaTypeEnum.ANIME] },
    { name: 'Séries', mediaTypes: [MediaTypeEnum.SHOW] },
    { name: 'Films', mediaTypes: [MediaTypeEnum.MOVIE] },
  ];

  excludedMedias: MediaTypeEnum[] = [];

  constructor(public _medias: MediasService) {}

  ngOnInit() {
    this.sections = this.sections.filter((section) => {
      //check remaining media types after removing the excluded ones
      const remainingMediaTypes = section.mediaTypes.filter((mediaType) => !this.excludedMedias.includes(mediaType));
      //filter out sections who does not have remaining media types
      return remainingMediaTypes.length > 0;
    });

    console.log(this.sections);
  }
}
