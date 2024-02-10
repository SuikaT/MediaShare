import { Component, Input, OnInit } from '@angular/core';
import { Media } from '../../../model/interfaces/Media';
import { CommonModule } from '@angular/common';
import { MediasService } from '../../../services/medias.service';
import { MediaTypeEnum } from '../../../model/enums/MediaTypeEnum';
import { StatesService } from '../../../services/states.service';

@Component({
  selector: 'app-medias-display',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './medias-display.component.html',
  styleUrl: './medias-display.component.scss',
})
export class MediasDisplayComponent implements OnInit {
  @Input()
  mediaList: Media[] = [];

  constructor() {}

  ngOnInit(): void {}

  test() {
    console.log(this.mediaList);
  }
}
