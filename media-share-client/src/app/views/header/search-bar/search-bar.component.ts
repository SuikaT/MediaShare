import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { PersistenceService } from '../../../services/persistence.service';
import { MediasService } from '../../../services/medias.service';
import { Router } from '@angular/router';
import { StatesService } from '../../../services/states.service';

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
    private _states: StatesService,
    private router: Router,
  ) {}

  searchKey: string;

  search() {
    this._persistence.searchMedias(this.searchKey).subscribe((medias) => {
      // unset selectedSection to avoid displayedMedias autoRefresh
      this._states.selectedSection = undefined;
      // set displayedMedias with retrieved media
      this._medias.displayedMedias = medias;
      // navigate to default route
      this.router.navigate(['']);
    });
  }
}
