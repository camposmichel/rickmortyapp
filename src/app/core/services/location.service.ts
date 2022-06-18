import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from '../models/api-response.model';
import { ILocation } from '../models/location.model';
import { CommonService } from './common.service';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root',
})
export class LocationService extends CommonService<ILocation> {
  constructor(protected override http: HttpService) {
    super(http, '/location');
  }
  // constructor(private http: HttpService) {}

  // get(): Observable<ApiResponse<ILocation>> {
  //   return this.http.get<ApiResponse<ILocation>>('/location')
  // }

  // getById(id: string): Observable<ILocation> {
  //   return this.http.get<ILocation>(`/location/${id}`)
  // }

  // search(text: string): Observable<ApiResponse<ILocation>> {
  //   return this.http.get<ApiResponse<ILocation>>('/location/', {
  //     params: {
  //       name: text
  //     }
  //   })
  // }
}
