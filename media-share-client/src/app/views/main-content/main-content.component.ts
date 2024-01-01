import { Component } from '@angular/core';
import { MediasDisplayComponent } from './medias-display/medias-display.component';

@Component({
  selector: 'app-main-content',
  standalone: true,
  imports: [MediasDisplayComponent],
  templateUrl: './main-content.component.html',
  styleUrl: './main-content.component.scss',
})
export class MainContentComponent {}
