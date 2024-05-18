import moment from 'moment';
import 'moment/locale/es';

export class Divisa {
  amount: number;
  base: string;
  date: string;
  rates: { [key: string]: number };

  constructor(
    amount: number = 0,
    base: string = '',
    date: string = '',
    rates: { [key: string]: number } = { }
  ) {
    this.amount = amount;
    this.base = base;
    this.date = date;
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
  if (short = false) return moment(dateEnglish).format('DD-MM-YYYY');
  else return moment(dateEnglish).format('LL');
}

  /**
   * Devuelve el valor del cambio de la moneda
   * @param key string
   * @returns
   */
  getRate(key: string): number {
    return this.rates[key];
  }

  /**
   *
   * @returns
   */
  getLabels(): any[] {
    return Object.keys(this.rates);
  }

  /**
   *
   * @returns
   */
  getData(): any[] {
    return Object.values(this.rates);
  }
}
