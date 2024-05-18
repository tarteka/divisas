import { Component, OnInit } from '@angular/core';
import { VisitasApiService } from '../../services/visitasapi.service';
import { ActivatedRoute, Router } from '@angular/router';
import moment from 'moment';
import 'moment/locale/es';

@Component({
  selector: 'app-editar-visita',
  templateUrl: './editar-visita.component.html',
  styleUrl: './editar-visita.component.css',
  providers: [VisitasApiService]
})
export class EditarVisitaComponent implements OnInit {

  public id: number = 0;
  public visita: any = {};
  public error: boolean = false;
  public fecha: string = '';

  constructor(
    private _visitasApiService : VisitasApiService,
    private _route: ActivatedRoute,
    private _router: Router)
  {}

  ngOnInit(): void {
    this._route.params.subscribe((params) => {
      this.id = params["id"],
      this.obtenerVisita();
    });
  }

  onSubmit(): void {
    if (this.visita.name !== '' && this.visita.message !== '' ) {
      this.editarVisita();
    } else {
      this.error = true;
    }
  }

  obtenerVisita(): void {
    this._visitasApiService.getVisita(this.id).subscribe({
      next: data => {
        this.visita = data
        this.fecha = moment(this.visita.date).format('LLL');
      },
      error: error => console.log(<any>error)
    });
  }

  editarVisita(): void {
    this._visitasApiService.updateVisita(this.id, this.visita).subscribe({
      next: () => this._router.navigate(['/visitas']),
      error: (error) => console.log(<any>error)
    });
  }

  eliminarVisita(): void {
    this._visitasApiService.deleteVisita(this.id).subscribe({
      next: () => this._router.navigate(['/visitas']),
      error: (error) => console.log(<any>error)
    })
  }

  cancelar(): void {
    this._router.navigate(['/visitas']);
  }


  onFocus(): void {
    console.log('onFocus');

    const div = document.getElementById('error');
    if (div) {
      div.remove();
      this.error = false;
    }
  }

}
