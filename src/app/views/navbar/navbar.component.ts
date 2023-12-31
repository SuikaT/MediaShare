import { Component, OnInit } from '@angular/core';
import { MediaTypeEnum } from '../../model/enums/MediaTypeEnum';
import { MediasService } from '../../services/medias.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit {
  sections: string[] = [];

  constructor(public _medias: MediasService) {}

  ngOnInit() {
    this.sections = Array.from(this._medias.mediaListByType.keys()).map(
      (m) => MediaTypeEnum[m]
    );
  }
}
