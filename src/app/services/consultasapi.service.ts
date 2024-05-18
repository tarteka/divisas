import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

/**
 * The Frankfurter API tracks foreign exchange references rates published by the European Central Bank.
 * The data refreshes around 16:00 CET every working day.
 * https://www.frankfurter.app/docs/
 */


// @ decorador para patrón singleton
@Injectable()
export class ConsultasApiService {
  public url: string;

  constructor(private _http: HttpClient) {
    this.url = 'https://api.frankfurter.app/';
  }

  /**
   * Gets a list of available currency symbols along with their full names
   * @returns
   */
  getCurrencies(): Observable<any> {
    return this._http.get(this.url + 'currencies');
  }

  /**
   * Rates quote against the Euro by default. You can quote against other currencies using the 'from' parameter.
   * 'to' limits returned rates to specified values.
   * @param from divisa de origen (opcional). Por defecto EUR
   * @param to Array<string> de divisas (opcional). Por defecto todas.
   * @returns
   */
  getLatest(from: string = '', to: Array<string> = []): Observable<any> {
    let divisas: string = '';
    let parametro: string = 'latest';
    if (from != '') parametro = parametro + '?from=' + from;
    if (to.length > 0) {
      divisas = to.join(); // convertir el array en un string separados por comas

      if (from === '') {
        parametro = parametro + '?to=' + divisas;
      } else {
        parametro = parametro + '&to=' + divisas;
      }
    }

    return this._http.get(this.url + parametro);
  }

  /**
   * This endpoint returns a set of historical rates for a given time period.
   * @param startDate fecha inicio
   * @param endDate fecha fin (opcional)
   * @param from divisa de origen (opcional). Por defecto EUR
   * @param to Array<string> de divisas (opcional). Por defecto todas.
   * @returns
   */
  getPeriodo(startDate: string, endDate : string = '', from: string = '', to: Array<string> = []): Observable<any> {
    let divisas: string = '';
    let parametro: string = startDate + '..';
    if (endDate != '') parametro = parametro + endDate;
    if (from != '') parametro = parametro + '?from=' + from;
    if (to.length > 0) {
      divisas = to.join(); // convertir el array en un string separados por comas

      if (from === '') {
        parametro = parametro + '?to=' + divisas;
      } else {
        parametro = parametro + '&to=' + divisas;
      }
    }
    return this._http.get(this.url + parametro);
  }
}
