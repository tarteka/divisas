import { Component, OnInit } from '@angular/core';
import { ConsultasApiService } from '../services/consultasapi.service';

import { Divisa } from '../models/Divisa';
import { ListaDivisas } from '../models/ListaDivisas';

@Component({
  selector: 'app-conversor',
  templateUrl: './conversor.component.html',
  styleUrl: './conversor.component.css',
  providers: [ConsultasApiService],
})

export class ConversorComponent implements OnInit {
  public cantidad: number = 1;
  public cantidadTemp: number = this.cantidad;
  public monedaOrigen: string = 'EUR';
  public monedaOrigenTemp: string = this.monedaOrigen;
  public monedaDestino: string = 'USD';
  public monedaDestinoTemp: string = this.monedaDestino;
  public resultado: number = 0;
  public mostrarMensaje: boolean = false;

  public divisa: Divisa = new Divisa();
  public listaDivisas: ListaDivisas = new ListaDivisas();

  // aplicar el patrón singleton con private _consultas.....
  constructor(private _consultasApiService: ConsultasApiService) {}

  ngOnInit(): void {
    this.obtenerListaDivisas();
    this.obtenerValorDivisa();
  }

  onSubmit(): void {
    this.cantidadTemp = this.cantidad;
    this.monedaOrigenTemp = this.monedaOrigen;
    this.monedaDestinoTemp = this.monedaDestino;
    this.obtenerValorDivisa();
    if (this.monedaDestinoTemp === this.monedaOrigenTemp) {
      this.resultado = this.cantidadTemp;
    } else {
      this.resultado = this.calcularConversion(this.cantidadTemp);
    }
    this.mostrarMensaje = true;
  }

  onSelected(): void {
    this.obtenerValorDivisa();
  }

  obtenerValorDivisa(): void {
    this._consultasApiService.getLatest(this.monedaOrigen, [this.monedaDestino]).subscribe({
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
      next: (data) => (this.listaDivisas = data),
      error: (error) => console.log(<any>error),
    });
  }

  calcularConversion(cantidad: number): number {
    return cantidad * this.divisa.rates[this.monedaDestino];
  }
}
