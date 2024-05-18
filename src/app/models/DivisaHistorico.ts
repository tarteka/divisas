import moment from 'moment';
import 'moment/locale/es';

type Rates = {
  [date: string] : {
    [key: string]: number;
  };
};

export class DivisaHistorico {
    amount: number;
    base: string;
    startDate: string;
    endDate: string;
    rates: Rates;

  constructor(
    amount: number = 1,
    base: string = '',
    startDate: string = '',
    endDate: string = '',
    rates: Rates = {},
  ) {
    this.amount = amount;
    this.base = base;
    this.startDate = startDate;
    this.endDate = endDate;
    this.rates = rates;
  }

 /**
  * Devuelve la fecha formateada al español, en formato largo (por defecto) o en formato corto.
  * Ej.: "13 de mayo de 2024" ó "13/05/2024"
  * @param dateEnglish string
  * @param short boolean
  * @returns
  */
 dateToSpanish(dateEnglish: string, short: boolean = false): string {
  moment.locale('es');
  if (short) return moment(dateEnglish).format('DD-MM-YYYY');
  else return moment(dateEnglish).format('LL');
}

  /**
 * Devuelve un array con las fechas de las tasas de cambio en formato español.
 * @param this
 * @returns Array<string>
 */
getFechas(): Array<string> {
  return Object.keys(this.rates).map(date => this.dateToSpanish(date, true));
}

/**
 * Devuelve un array con los valores de una moneda específica
 * @param this
 * @param moneda
 * @returns Array<number>
 */
getValores(moneda: string): Array<number> {
  return Object.values(this.rates).map(entry => entry[moneda]);
}

}
