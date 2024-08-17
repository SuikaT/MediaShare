import { Injectable } from '@angular/core';
import { MediaTypeEnum } from '../model/enums/MediaTypeEnum';
import { PersistenceService } from './persistence.service';
import { HttpClient, HttpEventType, HttpResponse } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Media } from '../model/interfaces/Media';
import { StatesService } from './states.service';
import { Section } from '../model/interfaces/Section';
import { Episode } from '../model/interfaces/Episode';
import { Season } from '../model/interfaces/Season';
import { MediaFile } from '../model/interfaces/MediaFile';

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

  seasonMedias = [MediaTypeEnum.ANIME, MediaTypeEnum.SHOW];

  $mediaDetail: BehaviorSubject<Media> = new BehaviorSubject(undefined);

  public retrieveAllMedia(): void {
    this._persistence.getAllMedias().subscribe((response) => {
      if (response) {
        this.mediaMap = new Map(Object.entries(response).map(([key, value]) => [MediaTypeEnum[key as keyof typeof MediaTypeEnum], value as Media[]]));
      }
    });
  }

  public updateDisplayedMedias(section: Section): void {
    this._persistence.getMedias(section.mediaType).subscribe((response) => {
      if (response) {
        this.displayedMedias = response;
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

  set mediaDetail(mediaDetail: Media) {
    this.$mediaDetail.next(mediaDetail);
  }

  get mediaDetail(): Media {
    return this.$mediaDetail.getValue();
  }

  isSeasonMedia(mediaType: MediaTypeEnum) {
    return this.seasonMedias.includes(mediaType);
  }

  downloadFile(mediaFile: MediaFile) {
    const type = this.getType(mediaFile.fileName);
    const blob = new Blob([mediaFile.file], { type: type });

    const url = window.URL.createObjectURL(blob);

    const a = document.createElement('a');
    document.body.appendChild(a);
    a.style.display = 'none';
    a.href = url;
    a.download = mediaFile.fileName; // Set your desired file name
    // tiggrer download by virtually clicking the element
    a.click();
    // remove element
    window.URL.revokeObjectURL(url);
  }

  getType(fileName: string) {
    const extension = fileName.slice(-4);
    switch (extension) {
      case 'mp4':
        return 'video/mp4';
      case 'mp3':
        return 'audio/mpeg';
      case 'pdf':
        return 'application/pdf';
      default:
        return 'video/x-matroska'; //mkv as default
    }
  }
}
