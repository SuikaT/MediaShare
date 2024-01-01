import { Injectable } from '@angular/core';
import { Media } from '../model/interfaces/media';
import { MediaTypeEnum } from '../model/enums/MediaTypeEnum';

@Injectable({
  providedIn: 'root',
})
export class MediasService {
  mediaList: Media[] = [];

  mediaListByType = new Map<MediaTypeEnum, Media[]>();

  constructor() {
    this.mediaList = [
      { title: 'anime', type: MediaTypeEnum.ANIME, path: '' },
      { title: 'show', type: MediaTypeEnum.SHOW, path: '' },
      { title: 'movie', type: MediaTypeEnum.MOVIE, path: '' },
    ];
    this.retrieveAllMedia();
  }

  private retrieveAllMedia(): void {
    //TODO At startup retrieve all media from path of properties file
    //sort in MediaListByType when we all media has been retrieved
    this.initMediaListByType();
  }

  private initMediaListByType(): void {
    //if media list is empty don't go further
    if (this.mediaList.length == 0) return;
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
