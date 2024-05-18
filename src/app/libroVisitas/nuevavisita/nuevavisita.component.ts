import { Component, Injectable} from '@angular/core';
import { VisitasApiService } from '../../services/visitasapi.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nuevavisita',
  templateUrl: './nuevavisita.component.html',
  styleUrl: './nuevavisita.component.css',
  providers: [VisitasApiService],
})

@Injectable()
export class NuevavisitaComponent {

  public datos = {
    date: new Date(),
    name: '',
    message: '',
  };

  public error: boolean = false;

  // aplicar el patrón singleton con private _visitas.....
  constructor(private _visitasApiService: VisitasApiService, private _router: Router){}

  onSubmit(): void {
    if (this.datos.name !== '' && this.datos.message !== '' ) {
      this.crearVisita();
    } else {
      this.error = true;
    }
  }

  onFocus(): void {
    console.log('onFocus');

    const div = document.getElementById('error');
    if (div) {
      div.remove();
      this.error = false;
    }
  }

  crearVisita(): void {
    this._visitasApiService.createVisita(this.datos).subscribe({
      next:() => this._router.navigate(['/visitas']),
      error: (error) => console.log(<any>error)
    });
  }
}
