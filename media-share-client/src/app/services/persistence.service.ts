import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Media } from '../model/interfaces/Media';
import { HttpClient } from '@angular/common/http';
import { apiConfig } from '../../environments/api-config';
import { MediaTypeEnum } from '../model/enums/MediaTypeEnum';

const GET_MEDIAS = '/api/medias';

@Injectable({
  providedIn: 'root',
})
export class PersistenceService {
  SERVER_URL = apiConfig.protocol + '://' + apiConfig.host + ':' + apiConfig.port;

  constructor(private http: HttpClient) {}

  getAllMedias(): Observable<any> {
    return this.http.get<any>(this.SERVER_URL + GET_MEDIAS, {});
  }
}
