import { Injectable } from '@angular/core';
import { Media } from '../model/interfaces/media';
import { MediaTypeEnum } from '../model/enums/MediaTypeEnum';
import { PersistenceService } from './persistence.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class MediasService {
  mediaList: Media[] = [];

  mediaListByType = new Map<MediaTypeEnum, Media[]>();

  constructor(private _persistence: PersistenceService) {}

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
    const mediaTypes = Object.values(MediaTypeEnum).filter(
      (value) => !isNaN(Number(value))
    );

    mediaTypes.forEach((mediaType) => {
      //filter mediaList by type
      const filteredMediaList = this.mediaList.filter(
        (media) => media.type == mediaType
      );
      this.mediaListByType.set(Number(mediaType), filteredMediaList);
    });
  }
}
