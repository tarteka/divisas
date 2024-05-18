import { Component, Injectable, Input } from '@angular/core';
import moment from 'moment';
import 'moment/locale/es';
import { VisitasApiService } from '../../services/visitasapi.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-visita',
  templateUrl: './visita.component.html',
  styleUrl: './visita.component.css'
})

export class VisitaComponent {
  @Input() visita: any;

  public moment = moment;

  constructor(private _visitasApiService: VisitasApiService, private _router: Router) {}

  editarVisita() {
    let password = prompt('Contraseña:');

    if (password === this._visitasApiService.password) {
      this._router.navigate(['/visitas', this.visita.id]);
    } else {
      alert('Contraseña Incorrecta')
    }
  }
}
