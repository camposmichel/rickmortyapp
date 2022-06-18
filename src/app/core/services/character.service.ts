import { CommonService } from './common.service';
import { Observable } from 'rxjs';
import { ICharacter } from './../models/character.model';
import { ApiResponse } from './../models/api-response.model';
import { HttpService } from './http.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CharacterService extends CommonService<ICharacter> {
  constructor(protected override http: HttpService) {
    super(http, '/character');
  }
  // constructor(private http: HttpService) {}

  // get(): Observable<ApiResponse<ICharacter>> {
  //   return this.http.get<ApiResponse<ICharacter>>('/character')
  // }

  // getById(id: string): Observable<ICharacter> {
  //   return this.http.get<ICharacter>(`/character/${id}`)
  // }

  // search(text: string): Observable<ApiResponse<ICharacter>> {
  //   return this.http.get<ApiResponse<ICharacter>>('/character/', {
  //     params: {
  //       name: text
  //     }
  //   })
  // }
}
