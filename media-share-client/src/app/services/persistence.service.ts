import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Media } from '../model/interfaces/media';
import { HttpClient } from '@angular/common/http';
import { apiConfig } from '../../environments/api-config';

@Injectable({
  providedIn: 'root',
})
export class PersistenceService {
  SERVER_URL =
    apiConfig.protocol + '://' + apiConfig.host + ':' + apiConfig.port;

  GET_MEDIA = '/api/media';

  constructor(private http: HttpClient) {}

  getAllMedias(): Observable<Media[]> {
    return this.http.get<Media[]>(this.SERVER_URL + this.GET_MEDIA, {});
  }
}
