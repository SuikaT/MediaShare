import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Media } from '../model/interfaces/Media';
import { HttpClient, HttpParams } from '@angular/common/http';
import { apiConfig } from '../../environments/api-config';
import { MediaTypeEnum } from '../model/enums/MediaTypeEnum';

const GET_MEDIAS = '/api/medias';
const GET_MEDIAS_BY_TYPE = '/api/mediasByType';

@Injectable({
  providedIn: 'root',
})
export class PersistenceService {
  SERVER_URL = apiConfig.protocol + '://' + apiConfig.host + ':' + apiConfig.port;

  constructor(private http: HttpClient) {}

  getAllMedias(): Observable<Map<MediaTypeEnum, Media[]>> {
    return this.http.get<any>(this.SERVER_URL + GET_MEDIAS, {});
  }

  getMedias(mediaTypes: MediaTypeEnum, maxAmount: number, index: number): Observable<any> {
    return this.http.get<any>(this.SERVER_URL + GET_MEDIAS_BY_TYPE, { params: { mediaType: mediaTypes, maxAmount: maxAmount, index: index } });
  }
}
