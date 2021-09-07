import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators'
import { of } from 'rxjs';

import { environment } from 'src/environments/environment';
import { Game } from '../interfaces/interfaces';

const baseUrl = environment.url;

@Injectable({
  providedIn: 'root'
})
export class GameService {

  private _juegos: Game[] = [];

  constructor(private _http: HttpClient) { }

  getNominados(){
    if (this._juegos.length > 0){
      console.log('Desde cache')
      return of(this._juegos)
    } else {
      console.log('Desde internet')
      return this._http.get<Game[]>(`${baseUrl}/api/goty`)
          .pipe(
            tap( resp => this._juegos = resp )
          );
    }
  }

  votarJuego(id: string){
    return this._http.post(`${baseUrl}/api/goty/${id}`,''); // {} instead of '' ?
        // Estoy manejando el error en la parte del subscribe
        //
        // .pipe(
        //   catchError((err: any) => {
        //     return of(err.error)
        //   })
        // )
  }

}
