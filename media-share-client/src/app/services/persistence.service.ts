import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Media } from '../model/interfaces/Media';
import { HttpClient, HttpEvent, HttpParams, HttpResponse } from '@angular/common/http';
import { apiConfig } from '../../environments/api-config';
import { MediaTypeEnum } from '../model/enums/MediaTypeEnum';
import { MediaFile } from '../model/interfaces/MediaFile';
import { first, take } from 'rxjs';

const MEDIAS = '/api/medias';
const MEDIAS_BY_TYPE = '/api/mediasByType';
const MEDIAFILE = '/api/mediaFile/';
const MEDIA = '/api/media';
const SEARCH_MEDIAS = '/api/searchMedias';

@Injectable({
  providedIn: 'root',
})
export class PersistenceService {
  SERVER_URL = apiConfig.protocol + '://' + apiConfig.host + ':' + apiConfig.port;

  constructor(private http: HttpClient) {}

  getAllMedias(): Observable<Map<MediaTypeEnum, Media[]>> {
    return this.http.get<Map<MediaTypeEnum, Media[]>>(this.SERVER_URL + MEDIAS, {}).pipe(first());
  }

  getMedias(mediaTypes: MediaTypeEnum, maxAmount: number, index: number): Observable<Media[]> {
    return this.http.get<Media[]>(this.SERVER_URL + MEDIAS_BY_TYPE, { params: { mediaType: mediaTypes, maxAmount: maxAmount, index: index } }).pipe(first());
  }

  getMedia(mediaType: MediaTypeEnum, mediaId: number): Observable<Media> {
    return this.http.get<Media>(this.SERVER_URL + MEDIA, { params: { mediaType: mediaType, mediaId: mediaId } }).pipe(first());
  }

  getMediaFile(mediaType: MediaTypeEnum, mediaId: number, seasonId: number, episodeId: number): Observable<HttpEvent<Blob>> {
    const url = this.SERVER_URL + MEDIAFILE + `${mediaType}/${mediaId}/${seasonId}/${episodeId}`;

    return this.http.get(url, { reportProgress: true, observe: 'events', responseType: 'blob' });
  }

  getMovieFile(media: Media): Observable<HttpEvent<Blob>> {
    console.log(media);
    const url = this.SERVER_URL + MEDIAFILE + `${media.type}/${media.id}`;

    return this.http.get(url, { reportProgress: true, observe: 'events', responseType: 'blob' });
  }

  searchMedias(searchKey: string): Observable<Media[]> {
    return this.http.get<Media[]>(this.SERVER_URL + SEARCH_MEDIAS, { params: { searchKey: searchKey } }).pipe(first());
  }
}
