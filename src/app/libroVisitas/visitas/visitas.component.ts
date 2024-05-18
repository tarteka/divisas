import { Component, OnInit } from '@angular/core';
import { VisitasApiService } from '../../services/visitasapi.service';

@Component({
  selector: 'app-visitas',
  templateUrl: './visitas.component.html',
  styleUrl: './visitas.component.css',
  providers: [VisitasApiService],
})
export class VisitasComponent implements OnInit {

  public visitas: any[] = [];

  // aplicar el patrón singleton con private _visitas.....
  constructor(private _visitasApiService: VisitasApiService){}

  ngOnInit(): void {
    this.obtenerVisitas();
  }

  obtenerVisitas(): void {
    this._visitasApiService.getVisitas().subscribe({
      next: data => this.visitas = data.reverse(),
      error: error => console.log(<any>error)
    });
  }
}
