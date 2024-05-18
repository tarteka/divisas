import { Component, OnInit } from '@angular/core';
import { ConsultasApiService } from '../services/consultasapi.service';
import moment from 'moment';
import 'moment/locale/es';

import { DivisaHistorico } from '../models/DivisaHistorico';
import { ListaDivisas } from '../models/ListaDivisas';

import { Chart, Tooltip } from 'chart.js/auto';
import { callback } from 'chart.js/dist/helpers/helpers.core';

@Component({
  selector: 'app-evolucion',
  templateUrl: './evolucion.component.html',
  styleUrl: './evolucion.component.css',
  providers: [ConsultasApiService],
})
export class EvolucionComponent implements OnInit{

  // aplicar el patrón singleton con private _consultas.....
  constructor(private _consultasApiService: ConsultasApiService){}

  public monedaOrigen: string = "EUR";
  public monedaDestino: string = "USD";
  public fechaInicio: string = '';
  public fechaFin: string = '';
  public periodo: string = '1mes';

  public listaDivisas: ListaDivisas = new ListaDivisas();
  public historicoDivisa: DivisaHistorico = new DivisaHistorico();
  public arrayFechas :Array<string> = [];
  public arrayValores: Array<number> = [];

  ngOnInit(): void {
    this.calcularRangoFechas();
    this.obtenerListaDivisas();
    this.obtenerHistoricoDivisa();
  }

  onSelected() {
    this.calcularRangoFechas();
    this.obtenerHistoricoDivisa();
  }

  obtenerListaDivisas(): void {
    this._consultasApiService.getCurrencies().subscribe({
      next: (data) => this.listaDivisas = data,
      error: (error) => console.log(<any>error),
    });
  }

  calcularRangoFechas(): void {
    let fecha = moment();

    switch (this.periodo) {
      case '1semana':
        fecha = fecha.subtract(7, 'days');
        break;
      case '1mes':
        fecha = fecha.subtract(1, 'months');
        break;
      case '6meses':
        fecha = fecha.subtract(6, 'months');
        break;
      case '1anyo':
        fecha = fecha.subtract(1, 'years');
        break;
      case '5anyos':
        fecha = fecha.subtract(5, 'years');
        break;
      case 'historico':
        fecha = moment('1999-01-04');
        break;
    }
    this.fechaInicio= fecha.format('YYYY-MM-DD');
  }

  obtenerHistoricoDivisa(): void {
    this._consultasApiService.getPeriodo(this.fechaInicio, this.fechaFin, this.monedaOrigen, [this.monedaDestino]).subscribe({
      next: (data) => {
        this.historicoDivisa.amount = data.amount;
        this.historicoDivisa.base = data.base;
        this.historicoDivisa.startDate = data.start_date;
        this.historicoDivisa.endDate = data.end_date;
        this.historicoDivisa.rates = data.rates;
        this.arrayFechas = this.historicoDivisa.getFechas();
        this.arrayValores = this.historicoDivisa.getValores(this.monedaDestino);
        this.crearGrafico();
      },
      error: (error) => {console.log(<any>error);
      },
    });
  }

  crearGrafico(): void {
    const data = {
      labels: this.arrayFechas,
      datasets: [{
        data: this.arrayValores,
        pointBorderWidth: 2,
      }]
    };

    const footer = () => {
      return this.monedaDestino;
    };

    const options = {
        responsive: true,
        pointHoverBackgroundColor: 'red',
        pointHoverBorderColor: 'red',
        interaction: {
          intersect: false,
        },
        title: {
          display: true,
          text: `Gráfico de ${this.monedaOrigen} a ${this.monedaDestino}`
        },
        plugins: {
          legend: { display: false },
          tooltip: {
            displayColors: false,
            callbacks: {
              footer: footer,
            }
          },
        },
      };


    let chart = Chart.getChart('graficoEvolucion');
    if (chart) chart.destroy();
    new Chart('graficoEvolucion', {type: 'line', data, options});
  }




}
