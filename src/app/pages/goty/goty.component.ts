import { Component, OnInit } from '@angular/core';
import { GameService } from '../../services/game.service';
import { Game } from '../../interfaces/interfaces';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-goty',
  templateUrl: './goty.component.html',
  styleUrls: ['./goty.component.css']
})
export class GotyComponent implements OnInit {

  juegos: Game[] = [];

  constructor(private _gameService: GameService) { }

  ngOnInit(): void {
    this._gameService.getNominados()
        .subscribe( resp => {
          this.juegos = resp;
        });
  }

  votarJuego(id: string){
    this._gameService.votarJuego(id)
        .subscribe( (resp: any) => {
          Swal.fire('Voto enviado',resp.mensaje,'success');
        },(err) => {
          Swal.fire('Error',err.error.msg,'error')
        });
  }
}
