import { CommonService } from './common.service';
import { IEpisode } from './../models/episode.model';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from '../models/api-response.model';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root',
})
export class EpisodeService extends CommonService<IEpisode> {
  constructor(protected override http: HttpService) {
    super(http, '/episode');
  }

  // constructor(private http: HttpService) {}

  // get(): Observable<ApiResponse<IEpisode>> {
  //   return this.http.get<ApiResponse<IEpisode>>('/episode')
  // }

  // getById(id: string): Observable<IEpisode> {
  //   return this.http.get<IEpisode>(`/episode/${id}`)
  // }

  // search(text: string): Observable<ApiResponse<IEpisode>> {
  //   return this.http.get<ApiResponse<IEpisode>>('/episode/', {
  //     params: {
  //       name: text
  //     }
  //   })
  // }
}
