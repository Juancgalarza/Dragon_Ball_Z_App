import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CharactersInterface } from '../interfaces/characters.interface';
import { CharacterInterface } from '../interfaces/character.interface';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  private API:string = environment.baseUrl; 

  private http = inject( HttpClient );

  getCharacters(params: any) {
    return this.http.get< CharactersInterface >(this.API + '/characters/', { params });
  }

  getCharactersById(id: string) {
    return this.http.get< CharacterInterface >(this.API + '/characters/' + id);
  }
}
