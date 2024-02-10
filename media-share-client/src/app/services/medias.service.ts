import { Injectable } from '@angular/core';
import { MediaTypeEnum } from '../model/enums/MediaTypeEnum';
import { PersistenceService } from './persistence.service';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Media } from '../model/interfaces/Media';
import { StatesService } from './states.service';

@Injectable({
  providedIn: 'root',
})
export class MediasService {
  constructor(
    private _persistence: PersistenceService,
    private _states: StatesService,
  ) {
    //on section change, update displayed medias
    this._states.$selectedSection.subscribe((section) => {
      if (section)
        section.mediaTypes.forEach((type) => {
          const medias = this.mediaMap.get(type);
          this.displayedMedias.push(...medias);
        });
    });
  }

  $mediaMap: BehaviorSubject<Map<MediaTypeEnum, Media[]>> = new BehaviorSubject(new Map<MediaTypeEnum, Media[]>());

  $displayedMedias: BehaviorSubject<Media[]> = new BehaviorSubject([]);

  public retrieveAllMedia(): void {
    this._persistence.getAllMedias().subscribe((response) => {
      if (response) {
        this.mediaMap = new Map(Object.entries(response).map(([key, value]) => [MediaTypeEnum[key as keyof typeof MediaTypeEnum], value as Media[]]));
      }
    });
  }

  get displayedMedias(): Media[] {
    return this.$displayedMedias.getValue();
  }

  set displayedMedias(displayedMedias: Media[]) {
    this.$displayedMedias.next(displayedMedias);
  }

  get mediaMap(): Map<MediaTypeEnum, Media[]> {
    return this.$mediaMap.getValue();
  }

  set mediaMap(mediaMap: Map<MediaTypeEnum, Media[]>) {
    this.$mediaMap.next(mediaMap);
  }
}
