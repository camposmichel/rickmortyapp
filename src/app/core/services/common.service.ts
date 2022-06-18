import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from '../models/api-response.model';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root',
})
export class CommonService<T> {
  constructor(
    protected http: HttpService,
    @Inject(String) private uri: string
  ) {}

  get(): Observable<ApiResponse<T>> {
    return this.http.get<ApiResponse<T>>(this.uri);
  }

  getById(id: string): Observable<T> {
    return this.http.get<T>(`${this.uri}/${id}`);
  }

  search(text: string): Observable<ApiResponse<T>> {
    return this.http.get<ApiResponse<T>>(`${this.uri}/`, {
      params: {
        name: text,
      },
    });
  }
}
