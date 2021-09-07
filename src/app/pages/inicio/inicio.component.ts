import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from 'rxjs/operators';
import { Game } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  resultadosDesdeDB: any[] = [];

  constructor(private _db: AngularFirestore) { }

  ngOnInit(): void {
    this._db.collection<Game>('goty').valueChanges()
        .pipe(
          map( (resp: Game[]) => {
            return resp.map(({name, votos}) => ({name,value: votos}))
            
            // Otra manera de transformar la respuesta, seria igual que arriba pero aunque es mas primitivo, se puede apreciar mejor lo que hace
            //
            // return resp.map( juego => {
            //   return {
            //     name: juego.name,
            //     value: juego.votos
            //   }
            // })
          })
        )
        .subscribe( resp => {

          console.log(resp)
          this.resultadosDesdeDB = resp;
        })
  }

}
