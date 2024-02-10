import { Injectable } from '@angular/core';
import { MediaTypeEnum } from '../model/enums/MediaTypeEnum';
import { PersistenceService } from './persistence.service';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Media } from '../model/interfaces/Media';

@Injectable({
  providedIn: 'root',
})
export class MediasService {
  mediaList: Media[] = [];

  constructor(private _persistence: PersistenceService) {}

  $mediaListByType: BehaviorSubject<Map<MediaTypeEnum, Media[]>> = new BehaviorSubject(new Map<MediaTypeEnum, Media[]>());

  get mediaListByType(): Map<MediaTypeEnum, Media[]> {
    return this.$mediaListByType.getValue();
  }

  set mediaListByType(mediaListByType: Map<MediaTypeEnum, Media[]>) {
    this.$mediaListByType.next(mediaListByType);
  }

  public retrieveAllMedia(): void {
    this._persistence.getAllMedias().subscribe((response) => {
      if (response) {
        this.mediaList = response;
        //sort in MediaListByType when we all media has been retrieved
        this.filterMediaList();
      }
    });
  }

  private filterMediaList(): void {
    //if media list is empty don't go further
    if (this.mediaList == undefined || this.mediaList.length == 0) return;
    //list of all MediaType
    const mediaTypes = Object.values(MediaTypeEnum).filter((value) => !isNaN(Number(value)));

    mediaTypes.forEach((mediaType) => {
      //filter mediaList by type
      const filteredMediaList = this.mediaList.filter((media) => media.type == mediaType);
      this.mediaListByType.set(Number(mediaType), filteredMediaList);
    });
  }
}
