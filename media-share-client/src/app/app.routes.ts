import { Routes } from '@angular/router';
import { MediaDetailComponent } from './views/media-detail/media-detail.component';
import { MainContentComponent } from './views/main-content/main-content.component';
import { SeasonDetailComponent } from './views/media-detail/season-detail/season-detail.component';
import { EpisodeListComponent } from './views/media-detail/season-detail/episode-list/episode-list.component';

export const routes: Routes = [
  { path: '', component: MainContentComponent },
  {
    path: 'media-detail/:mtype/:mid',
    component: MediaDetailComponent,
  },
];
