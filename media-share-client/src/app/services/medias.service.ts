import { Injectable } from '@angular/core';
import { MediaTypeEnum } from '../model/enums/MediaTypeEnum';
import { PersistenceService } from './persistence.service';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Media } from '../model/interfaces/Media';
import { StatesService } from './states.service';
import { Section } from '../model/interfaces/Section';

@Injectable({
  providedIn: 'root',
})
export class MediasService {
  constructor(
    private _persistence: PersistenceService,
    private _states: StatesService,
  ) {}

  $mediaMap: BehaviorSubject<Map<MediaTypeEnum, Media[]>> = new BehaviorSubject(new Map<MediaTypeEnum, Media[]>());

  $displayedMedias: BehaviorSubject<Media[]> = new BehaviorSubject([]);

  public retrieveAllMedia(): void {
    this._persistence.getAllMedias().subscribe((response) => {
      if (response) {
        this.mediaMap = new Map(Object.entries(response).map(([key, value]) => [MediaTypeEnum[key as keyof typeof MediaTypeEnum], value as Media[]]));
      }
    });
  }

  public updateDisplayedMedias(section: Section): void {
    this._persistence.getMedias(section.mediaType, 60, 0).subscribe((response) => {
      if (response) {
        console.log(response);
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
