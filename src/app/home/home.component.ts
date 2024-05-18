import { Component, OnInit } from '@angular/core';
import { ConsultasApiService } from '../services/consultasapi.service';
import { Divisa } from '../models/Divisa';
import { ListaDivisas } from '../models/ListaDivisas';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  providers: [ConsultasApiService],
})

export class HomeComponent implements OnInit {
  public divisa: Divisa = new Divisa();
  public listaDivisas: ListaDivisas = new ListaDivisas();
  public divisaSeleccionada: string = "EUR";

  // aplicar el patrón singleton con private _consultas.....
  constructor(private _consultasApiService: ConsultasApiService) {}

  ngOnInit(): void {
    this.obtenerListaDivisas();
    this.onSelected();
  }

  onSelected(): void {
    this.obtenerValorDivisa();
  }

  obtenerValorDivisa(): void {
    this._consultasApiService.getLatest(this.divisaSeleccionada).subscribe({
      next: (data) => {
        this.divisa.amount = data.amount;
        this.divisa.base = data.base;
        this.divisa.date = this.divisa.dateToSpanish(data.date);
        this.divisa.rates = data.rates;
      },
      error: (error) => console.log(<any>error),
    });
  }

  obtenerListaDivisas(): void {
    this._consultasApiService.getCurrencies().subscribe({
      next: (data) => this.listaDivisas = data,
      error: (error) => console.log(<any>error),
    });
  }


}
