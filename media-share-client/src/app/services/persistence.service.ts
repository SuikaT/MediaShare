import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Media } from '../model/interfaces/Media';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { apiConfig } from '../../environments/api-config';
import { MediaTypeEnum } from '../model/enums/MediaTypeEnum';
import { MediaFile } from '../model/interfaces/MediaFile';
import { first, take } from 'rxjs';

const GET_MEDIAS = '/api/medias';
const GET_MEDIAS_BY_TYPE = '/api/mediasByType';
const GET_MEDIAFILE = '/api/mediaFile/';

@Injectable({
  providedIn: 'root',
})
export class PersistenceService {
  SERVER_URL = apiConfig.protocol + '://' + apiConfig.host + ':' + apiConfig.port;

  constructor(private http: HttpClient) {}

  getAllMedias(): Observable<Map<MediaTypeEnum, Media[]>> {
    return this.http.get<any>(this.SERVER_URL + GET_MEDIAS, {}).pipe(first());
  }

  getMedias(mediaTypes: MediaTypeEnum, maxAmount: number, index: number): Observable<Media[]> {
    return this.http.get<any>(this.SERVER_URL + GET_MEDIAS_BY_TYPE, { params: { mediaType: mediaTypes, maxAmount: maxAmount, index: index } }).pipe(first());
  }

  getEpisode(mediaType: MediaTypeEnum, mediaId: number, seasonId: number, episodeId: number): Observable<HttpResponse<Blob>> {
    const url = this.SERVER_URL + GET_MEDIAFILE + `${mediaType}/${mediaId}/${seasonId}/${episodeId}`;

    return this.http.get(url, { observe: 'response', responseType: 'blob' }).pipe(first());
  }
}
