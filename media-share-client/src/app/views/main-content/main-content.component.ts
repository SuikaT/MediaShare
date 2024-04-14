import { Component, Input, OnInit } from '@angular/core';
import { MediasDisplayComponent } from './medias-display/medias-display.component';
import { MediasService } from '../../services/medias.service';
import { Section } from '../../model/interfaces/Section';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { StatesService } from '../../services/states.service';

@Component({
  selector: 'app-main-content',
  standalone: true,
  imports: [MediasDisplayComponent, CommonModule],
  templateUrl: './main-content.component.html',
  styleUrl: './main-content.component.scss',
})
export class MainContentComponent implements OnInit {
  constructor(
    public _medias: MediasService,
    private _states: StatesService,
  ) {}

  ngOnInit(): void {
    this._states.$selectedSection.subscribe((section) => {
      if (section) this._medias.updateDisplayedMedias(section);
    });
  }
}
