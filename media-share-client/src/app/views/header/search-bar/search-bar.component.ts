import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { PersistenceService } from '../../../services/persistence.service';
import { MediasService } from '../../../services/medias.service';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [FormsModule, MatIconModule],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss',
})
export class SearchBarComponent {
  constructor(
    private _persistence: PersistenceService,
    private _medias: MediasService,
  ) {}

  searchKey: string;

  search() {
    this._persistence.searchMedias(this.searchKey).subscribe((medias) => (this._medias.displayedMedias = medias));
  }
}
