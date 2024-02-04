import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Media } from '../model/interfaces/media';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class PersistenceService {
  SERVER_URL = 'localhost:8080';
  GET_MEDIA = '/api/media';

  constructor(private http: HttpClient) {}

  getAllMedias(): Observable<Media[]> {
    return this.http.get<Media[]>(this.SERVER_URL + this.GET_MEDIA);
  }
}
